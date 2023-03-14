// Query Selectors
let cover = document.querySelector(".cover");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");

let prevBtn = document.querySelector(".prev");
let playBtn = document.querySelector(".play");
let nextBtn = document.querySelector(".next");

let loopBtn = document.querySelector(".loop");
let shuffleBtn = document.querySelector(".shuffle");

let seekSlider = document.querySelector(".seek-slider");
let volumeSlider = document.querySelector(".volume-slider");

let currSong = document.createElement("audio");
let currTime = document.querySelector(".current-time");
let totalTime = document.querySelector(".total-time");

let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

// music details
const musicList = [
  {
    img: "images/Brisa.jpg",
    name: "Brisa",
    artist: "Foudeqush",
    music: "music/Brisa.mp3",
  },
  {
    img: "images/Cookie.jpg",
    name: "Cookie",
    artist: "New Jeans",
    music: "music/Cookie.mp3",
  },
  {
    img: "images/Shivers.jpg",
    name: "Shivers",
    artist: "Ed Sheeran",
    music: "music/Shivers.mp3",
  },
];

// load track progress
loadSong(trackIndex);
function loadSong(trackIndex) {
  clearInterval(updateTimer);
  reset();

  currSong.src = musicList[trackIndex].music;
  currSong.load();

  cover.src = musicList[trackIndex].img;
  trackName.textContent = musicList[trackIndex].name;
  trackArtist.textContent = musicList[trackIndex].artist;

  updateTimer = setInterval(setUpdate, 1000);

  currSong.addEventListener("ended", nextSong);
}

// controls
function reset() {
  currTime.textContent = "00:00";
  totalTime.textContent = "00:00";
  seekSlider.value = 0;
}
function shuffleTrack() {
  isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
  isRandom = true;
  shuffleBtn.classList.add("shuffleActive");
}
function pauseRandom() {
  isRandom = false;
  shuffleBtn.classList.remove("shuffleActive");
}

// song looping functionalities
// checking to see if loop is checked or not before going next song
// async function checkLoop() {
//   let loopChecked = new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve(nextSong);
//     }, 1000);
//   });
//   currSong = await loopChecked;
// }
function enableLoop() {
  loopBtn.classList.add("loopActive");
  currSong.loop = true;
}
function disableLoop() {
  loopBtn.classList.remove("loopActive");
  currSong.loop = false;
}
function toggleLoop() {
  var isLooping = loopBtn.classList.contains("loopActive");
  isLooping ? disableLoop() : enableLoop();
}

// toggle play
function togglePlay(){
    isPlaying ? pauseSong() : playSong();
}
function playSong() {
  currSong.play();
  isPlaying = true;
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}
function pauseSong() {
  currSong.pause();
  isPlaying = false;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

// previous Song
function prevSong(){
  if(trackIndex > 0){
    trackIndex -= 1;
}else{
    trackIndex = musicList.length -1;
}
loadSong(trackIndex);
playSong();
}

// next Song
function nextSong(){
  if(trackIndex < musicList.length - 1 && isRandom === false){
      trackIndex += 1;
  }else if(trackIndex < musicList.length - 1 && isRandom === true){
      let randomIndex = Number.parseInt(Math.random() * musicList.length);
      trackIndex = randomIndex;
  }else{
      trackIndex = 0;
  }
  loadSong(trackIndex);
  playSong();
}

// time slider
function seekTo(){
  let seekto = currSong.duration * (seekSlider.value / 100);
  currSong.currentTime = seekto;
}

// time update
function setUpdate(){
  let seekPosition = 0;
  if(!isNaN(currSong.duration)){
      seekPosition = currSong.currentTime * (100 / currSong.duration);
      seekSlider.value = seekPosition;

      let currentMinutes = Math.floor(currSong.currentTime / 60);
      let currentSeconds = Math.floor(currSong.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(currSong.duration / 60);
      let durationSeconds = Math.floor(currSong.duration - durationMinutes * 60);

      if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
      if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
      if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

      currTime.textContent = currentMinutes + ":" + currentSeconds;
      totalTime.textContent = durationMinutes + ":" + durationSeconds;
  }
}

// Volume
function setVolume(){
  currSong.volume = volumeSlider.value / 100;
}