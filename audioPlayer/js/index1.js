const playerContainer = document.querySelector('.player-container');
const musicTitle = document.querySelector('.music-title');
const playBtn = document.querySelector('.playBtn');
const previous = document.querySelector('.previous');
const next = document.querySelector('.next');
const progress = document.querySelector('.player-progress');
const progressvalue = document.querySelector('.progressvalue');
const image = document.querySelector('.music-image img')
const audio = document.getElementById('audio');
const timer = document.querySelector('.timer');
const songstitle = ['Star Boy', 'Grenade', 'Cup of life'];
const rangeProgress = document.querySelector('.rangeSlider');
const rangeContainer = document.querySelector('.progressRange');
let songIndex = 0;

loadInitialSong(songstitle[songIndex], songIndex);

function loadInitialSong(song, index) {
    musicTitle.innerText = song;
    image.src = `img/img${index + 1}.jpg`;
    audio.src = `audio/music${index + 1}.mp3`;
}

function playMusic() {
    playerContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseMusic() {
    playerContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
    clearInterval(update);
}

function nextSong() {
    songIndex++;
    if (songIndex > songstitle.length - 1) {
        songIndex = 0;
    }
    loadInitialSong(songstitle[songIndex], songIndex);
    playMusic();
}
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songstitle.length - 1;
    }
    loadInitialSong(songstitle[songIndex], songIndex);
    playMusic();
}



function updateProgress(e) {

    const { duration, currentTime } = e.srcElement;
    if(!(isNaN(duration))){
    const progressPercent = (currentTime / duration) * 100;
    // progressvalue.style.width = `${progressPercent}%`;
   
    rangeProgress.value = progressPercent
}
    let mins = Math.floor(currentTime / 60);
    let secs = Math.floor(currentTime % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }
    if (mins < 10) {
        mins = '0' + String(mins);
    }
    timer.innerHTML = mins + ':' + secs;

}
function setProgress(e) {
    const windowWidth = this.clientWidth;
    const currentOffset = e.offsetX
    const duration = audio.duration;
    audio.currentTime = (currentOffset / windowWidth) * duration;
}

playBtn.addEventListener('click', () => {
    const isPlaying = playerContainer.classList.contains('play');
    if (isPlaying) {
        pauseMusic();
    }
    else {
        playMusic();
    }
});

next.addEventListener('click', () => {
    nextSong();
})

previous.addEventListener('click', () => {
    prevSong();
})

audio.addEventListener('timeupdate', updateProgress);


 rangeProgress.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong)