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
    name: '3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: '4',
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

/* Music COntrols Timing */
const currentTime = document.querySelector('#current-time');
const durationTime = document.querySelector('#duration-time');

/* Music Controls */
const prevBtn = document.querySelector('#prev-btn');
const playPauseBtn = document.querySelector('#play-pause-btn');
const nextBtn = document.querySelector('#next-btn');

/* Track if sonf is playing or not */
let isPlaying = false;
let currentSongIndex = generateRandomNumberUpto(songs.length - 1);

/* Helper function to generate a random number upto n */
function generateRandomNumberUpto(n) {
  return Math.floor(Math.random() * n);
}

/* Helper funmction to format seconds to minutes:seconds */
async function formatTimeInSeconds(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds <= 9 ? `0${seconds}` : seconds}`;
}

/* Helper function to load a song with index */
async function loadSongWithIndex(index) {
  // Get the song details
  const songDetails = songs[index];

  // Set the song details
  music.setAttribute('src', `/audio/${songDetails.name}.mp3`);
  musicImage.setAttribute('src', `/images/${songDetails.name}.jpg`);
  musicTitle.textContent = songDetails.displayName;
  musicAuthor.textContent = songDetails.artist;
}

/* Helper function to play song */
async function playSong() {
  isPlaying = true;
  playPauseBtn.setAttribute('src', './images/pauseBtn.svg');
  playPauseBtn.setAttribute('title', 'Pause track');
  music.play();
}

/* Helper function to pause song */
async function pauseSong() {
  isPlaying = false;
  playPauseBtn.setAttribute('src', './images/playBtn.svg');
  playPauseBtn.setAttribute('title', 'Play track');
  music.pause();
}

/* Helper function to play next song */
async function nextSong() {
  currentSongIndex++;
  await pauseSong();

  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }

  await loadSongWithIndex(currentSongIndex);
  await playSong();
}

/* Helper function to play previous song */
async function prevSong() {
  currentSongIndex--;
  await pauseSong();

  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }

  await loadSongWithIndex(currentSongIndex);
  await playSong();
}

/* Helper function to seek the song */
async function seekSong(e) {
  // total wdth of progress-bar-container
  const totalProgressContainerWidth = e.target.offsetWidth;

  // get in pixels the position of the mouse
  const { offsetX: clickedByXPixel } = e;

  // set the new audio time on audio
  music.currentTime =
    (clickedByXPixel / totalProgressContainerWidth) * music.duration;
}

/* Helper function to update the progress bar */
async function updateProgressBar(e) {
  if (isPlaying) {
    currentTime.textContent = await formatTimeInSeconds(music.currentTime);
    durationTime.textContent = await formatTimeInSeconds(music.duration);
  }
}

// On load load a random song from playlist
loadSongWithIndex(currentSongIndex);

// listen to click on play/pause button
playPauseBtn.addEventListener('click', () =>
  !isPlaying ? playSong() : pauseSong()
);

// listen to click on next button
nextBtn.addEventListener('click', nextSong);

// listen to click on previous button
prevBtn.addEventListener('click', prevSong);

// listen to song end and play next song directly
music.addEventListener('ended', nextSong);

progressBarContainer.addEventListener('click', seekSong);

music.addEventListener('timeupdate', updateProgressBar);
