const songData=[
    {id:1,name:'Nee Partha Vizhigal',artist:'Anirudh',image:"./images/Anirudh.jpg",genre:"Folk",source:"./songs/Neepartha.mp3",},
    
    {id:2,name:'innu Konjam Neram',artist:'AR Rahaman',image:"./images/ARRahaman.jpg",genre:"Folk",source:"./songs/innu Konjam Neram.mp3",},

    {id:3,name:'Oh Raaya',artist:'AR Rahaman',image:"./images/ARRahaman.jpg",genre:"Soul",source:"./songs/Oh Raaya.mp3",},
    
    {id:4,name:'Kadalrasa',artist:'Yuvan',image:"./images/yuavn.jpg",genre:"Rock",source:"./songs/Kadalrasa.mp3",},
    
    {id:5,name:'Vadipulla',artist:'Adhi',image:"./images/Hiphop.jpg",genre:"Hiphop",source:"./songs/vadipulla.mp3",}
]

//toggleButton
function toggleTheme(){
    const darkmodebtn=document.getElementById('darkBtn');
    document.body.classList.toggle('darkMode',darkmodebtn.checked)
}

//genre selection 
const genre = document.getElementById('genreSelection');

const genres = songData.map(song => song.genre.toLowerCase());


const uniqueGenre = new Set(genres);


uniqueGenre.forEach(genreName => {
    const option = document.createElement('option');
    option.value = genreName;  
    option.textContent = genreName.charAt(0).toUpperCase() + genreName.slice(1);  
    genre.appendChild(option);
});

const songList=document.getElementById('displaySongs');

function showSongs(){
     const selectedGenre=genre.value;
     const filteredSongs= selectedGenre=== 'all' ? songData:songData.filter((song)=>song.genre.toLowerCase()===selectedGenre);
     songList.innerHTML='';
     filteredSongs.forEach((song)=>{
        const songsButton=document.createElement('button');
        songsButton.classList.add('songs-Button');
        songsButton.textContent=song.name;
        songsButton.onclick=()=>seletedSong(song);
        songList.appendChild(songsButton);
     })
}

genre.addEventListener('change',showSongs);

function seletedSong(song){
  const songimage=document.querySelector('#songCard-1 img');
  songimage.src=song.image;
  songimage.alt=`${song.name} by  ${song.artist}`
  
  const songTitleElement=document.getElementById('songTitle');
  songTitleElement.textContent=song.name;
  const artistNameElement=document.getElementById('artistName');
  artistNameElement.textContent=song.artist;

  const audiotrack=document.getElementById('audioTrack');
  audiotrack.src=song.source;
  audiotrack.play();
  
}
//default song
function defaultSong(){
    const defaultSongs=songData[0];

    const songImage=document.querySelector('#songCard-1 img');
    songImage.src=defaultSongs.image;
    songImage.alt=`${defaultSongs.name} by ${defaultSongs.artist}`

    const songName1=document.getElementById('songTitle');
    songName1.textContent=defaultSongs.name;
    const artistName1=document.getElementById('artistName');
    artistName1.textContent=defaultSongs.artist;

    const defaultAudio=document.getElementById('audioTrack');
    defaultAudio.src=defaultSongs.source;
    
}
window.onload=defaultSong;


showSongs();

//going to next songs
let currentIndex = 0;

function nextSong() {
    const selectedGenre1 = genre.value;
    const filteredSongs1 = selectedGenre1 === 'all' 
        ? songData 
        : songData.filter(song => song.genre.toLowerCase() === selectedGenre1); // Corrected here

    if (filteredSongs1.length === 0) return;

    currentIndex = (currentIndex + 1) % filteredSongs1.length;

    const nextSong = filteredSongs1[currentIndex];
    seletedSong(nextSong);
}

const nextButton = document.getElementById('nextBtn');
nextButton.addEventListener('click', nextSong);

function previousSong() {
    const selectedGenre1 = genre.value;
    const filteredSongs1 = selectedGenre1 === 'all' 
        ? songData 
        : songData.filter(song => song.genre.toLowerCase() === selectedGenre1); // Ensure correct filter condition

    if (filteredSongs1.length === 0) return;

    currentIndex = (currentIndex - 1 + filteredSongs1.length) % filteredSongs1.length;

    const prevSong = filteredSongs1[currentIndex];
    seletedSong(prevSong);
}

const prevButton = document.getElementById('preBtn');
prevButton.addEventListener('click', previousSong);



//create playList

const createPlayListButton=document.getElementById('createButton');
createPlayListButton.addEventListener('click',function(){
const playlistName=document.getElementById('newPlaylist').value.trim();

if(playlistName){
    const newPlaylistButton=document.createElement('button');
    newPlaylistButton.textContent=playlistName;
    newPlaylistButton.classList.add('playlist-button');

    const allPlaylist=document.getElementById('allPlaylist');
    allPlaylist.appendChild(newPlaylistButton);
    document.getElementById('newPlaylist').value='';
}
})
//current Playlist
const playLists = {}; // Consistent naming

document.getElementById('addplaybtn').addEventListener('click', () => {
    const selectedPlaylistButton = document.querySelector('.playlist-button.selected');

    if (!selectedPlaylistButton) {
        alert('Select Playlist');
        return;
    }
    const selectedPlaylistName = selectedPlaylistButton.textContent;
    const currentSongTitle = document.getElementById('songTitle').textContent;

    const currentSong = songData.find(song => song.name === currentSongTitle);

    // Add song to playlist
    if (!playLists[selectedPlaylistName]) {
        playLists[selectedPlaylistName] = [];
    }

    if (!playLists[selectedPlaylistName].some(song => song.id === currentSong.id)) {
        playLists[selectedPlaylistName].push(currentSong);

        // Update current playlist UI
        const currentPlaylistDiv = document.getElementById("currentPlaylist");
        const songButton = document.createElement("button");
        songButton.textContent = currentSong.name;
        songButton.classList.add('songs-Button');
        songButton.onclick = () => seletedSong(currentSong);

        currentPlaylistDiv.appendChild(songButton);
    }
});

// Playlist Section
document.getElementById('allPlaylist').addEventListener('click', function (event) {
    if (event.target && event.target.classList.contains('playlist-button')) {
        // Deselecting
        document.querySelectorAll('.playlist-button').forEach(button => {
            button.classList.remove('selected');
        });

        event.target.classList.add('selected');

        const selectedPlaylistName = event.target.textContent;
        const currentPlaylistDiv = document.getElementById("currentPlaylist");
        currentPlaylistDiv.innerHTML = '';

        if (playLists[selectedPlaylistName]) {
            playLists[selectedPlaylistName].forEach(song => {
                const songContainer = document.createElement("div"); // Container for song and remove button
                songContainer.classList.add("song-container");

                const songButton = document.createElement("button");
                songButton.textContent = song.name;
                songButton.classList.add("songs-Button");
                songButton.onclick = () => seletedSong(song);

                const removeButton = document.createElement("button");
                removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
                removeButton.classList.add("remove-Button");
                removeButton.onclick = () => {
                    // Remove song from playlist data
                    playLists[selectedPlaylistName] = playLists[selectedPlaylistName].filter(s => s.id !== song.id);

                    // Remove song from UI
                    songContainer.remove();

                    alert(`Removed song: ${song.name} from playlist: ${selectedPlaylistName}`);
                };

                songContainer.appendChild(songButton);
                songContainer.appendChild(removeButton);

                currentPlaylistDiv.appendChild(songContainer);
            });
        }
    }
});

// song Search 



const searchSongDetails=document.getElementById('SearchSongs');

songData.forEach((song)=>{
    const createOption=document.createElement('option');
    createOption.value=song.name;
    searchSongDetails.appendChild(createOption)
})

const searchInput=document.getElementById('searchSong');

searchInput.addEventListener('change',()=>{
    const searchQuery=searchInput.value.toLowerCase();
    const foundSong=songData.find((song)=>song.name.toLowerCase()===searchQuery);
    seletedSong(foundSong);
})

// Populate datalist with available playlists
document.getElementById('searchPlaylistInput').addEventListener('click', () => {
    const searchPlaylistElement = document.getElementById('searchPlaylist');
    searchPlaylistElement.innerHTML = ''; // Clear existing options

    const allPlaylistButtons = document.querySelectorAll('.playlist-button');
    allPlaylistButtons.forEach(button => {
        const option = document.createElement('option');
        option.value = button.textContent;
        searchPlaylistElement.appendChild(option);
    });
});
document.getElementById('searchPlaylistInput').addEventListener('change', () => {
    const selectedPlaylistName = document.getElementById('searchPlaylistInput').value.trim();
    const allPlaylistButtons = document.querySelectorAll('.playlist-button');
    let playlistExists = false;

    allPlaylistButtons.forEach(button => {
        if (button.textContent === selectedPlaylistName) {
            playlistExists = true;
            button.click(); // Trigger click to select and display playlist
        }
    });

    if (!playlistExists) {
        alert(`Playlist "${selectedPlaylistName}" does not exist.`);
    }
});

