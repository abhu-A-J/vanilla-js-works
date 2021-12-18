// List of songs ( credit to Jacinto from zero to mastery)
const songs = [
  {
    name: '1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: '2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: '2',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: '2',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
];

/* Get the DOM Elements */
const music = document.querySelector('#music');

/* Music Details */
const musicImage = document.querySelector('#music-image');
const musicTitle = document.querySelector('#music-title');
const musicAuthor = document.querySelector('#music-author');

/* Music Progress */
const progressBarContainer = document.querySelector('#progress-bar-container');
const progressBar = document.querySelector('#progress-bar');

/* Music Controls */
const prevBtn = document.querySelector('#prev-btn');
const playPauseBtn = document.querySelector('#play-pause-btn');
const nextBtn = document.querySelector('#next-btn');

/* Track if sonf is playing or not */
let isPlaying = false;

/* Helper function to generate a random number upto n */
function generateRandomNumberUpto(n) {
  return Math.floor(Math.random() * n);
}

/* Helper function to play song */
async function playSong() {
  isPlaying = true;
  playPauseBtn.setAttribute('src', './images/pauseBtn.svg');
  music.play();
}

/* Helper function to pause song */
async function pauseSong() {
  isPlaying = false;
  playPauseBtn.setAttribute('src', './images/playBtn.svg');
  music.pause();
}

/* Helper function to play next song */
async function nextSong() {}

/* Helper function to play previous song */
async function prevSong() {}

// On load
playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
