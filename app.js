const searchClickHandler=()=>{
    const searchedSong= document.getElementById('input-song').value;
    fetch(`https://api.lyrics.ovh/suggest/${searchedSong}`)
    .then(res=>res.json())
    .then(data=>{
        document.getElementById('songs-container').innerHTML="";
        displayData(data.data);
    })

}

const displayData=(songs)=>{
    songs.forEach(song => {
        const mainDiv=document.getElementById('songs-container');
        const songDiv= document.createElement('div');
        songDiv.className='single-result row align-items-center my-3 p-3';
        const insideDiv=`
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.title}','${song.artist.name}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songDiv.innerHTML=insideDiv;
        mainDiv.appendChild(songDiv);
        
    });
}

const getLyrics=(title,artistName)=>{
    document.getElementById('lyrics-section').style.display='block';
    document.getElementById('main-section').style.display='none';

    fetch(`https://api.lyrics.ovh/v1/${artistName}/${title}`)
    .then(res=>res.json())
    .then(data=>{
        document.getElementById('lyrics-section').innerText=data.lyrics;
    })
}