console.log("hello its working");

// initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName('songItem'));
let durations = document.querySelectorAll(".durations");
let TimeLeft = document.querySelector('.timeLeft');

let songs = [
    { songName: "Let me Love you", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Dancin", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Kerosin", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Faded", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Suroor", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Bonafide", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Patola", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Rap god", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Song of the dead", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Shape of you", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
];

songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

// Play/Pause Button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        document.querySelector('.songInfoName').innerText = songs[songIndex].songName;
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add("fa-circle-pause");
    } else {
        audioElement.pause();
        gif.style.opacity = 0;
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add("fa-circle-play");
    }
});

// Update Progress Bar and Time Left
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100) || 0;
    myProgressBar.value = progress;

    if (!isNaN(audioElement.duration)) {
        let totalMinutes = Math.floor(audioElement.duration / 60);
        let totalSeconds = Math.floor(audioElement.duration % 60);
        let currentMinutes = Math.floor(audioElement.currentTime / 60);
        let currentSeconds = Math.floor(audioElement.currentTime % 60);

        let timeLeftMinutes = totalMinutes - currentMinutes;
        let timeLeftSeconds = totalSeconds - currentSeconds;
        if (timeLeftSeconds < 0) {
            timeLeftMinutes -= 1;
            timeLeftSeconds += 60;
        }

        TimeLeft.innerText = `${timeLeftMinutes}:${timeLeftSeconds.toString().padStart(2, '0')}`;
    }
});

// Change Song Time with Progress Bar
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Next and Previous Buttons
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    document.querySelector('.songInfoName').innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add("fa-circle-pause");
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    document.querySelector('.songInfoName').innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add("fa-circle-pause");
});

// Display Song Durations
durations.forEach((ele, i) => {
    const audio = new Audio(songs[i].filePath);
    audio.addEventListener('loadedmetadata', () => {
        ele.innerText = '0' + Math.floor(audio.duration / 60) + ':' + Math.floor(audio.duration % 60).toString().padStart(2, '0');
    });
});
