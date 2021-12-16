// Get the DOM Elements
const button = document.querySelector('button');
const audioElem = document.querySelector('#audio');

const VOICES_RSS_KEY = 'API KEY';

// function to set disbaled state for button
function shouldDisableBtn(state) {
  button.disabled = state;
}

// function that use voices rss to perform text to speech conversion
async function tellJoke(joke) {
  const URL = `http://api.voicerss.org/?key=${VOICES_RSS_KEY}&hl=en-us&src=${joke}`;
  try {
    VoiceRSS.speech({
      key: VOICES_RSS_KEY,
      src: joke,
      hl: 'en-us',
      v: 'Linda',
      r: 0,
      c: 'mp3',
      f: '44khz_16bit_stereo',
      ssml: false,
    });

    audioElem.addEventListener('ended', () => {
      shouldDisableBtn(false);
    });
  } catch (err) {
    shouldDisableBtn(false);
    console.error('Error fetching joke', err);
  }
}

// function to fetch a joke from API
async function getJoke() {
  const URL =
    'https://v2.jokeapi.dev/joke/Programming,Dark?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart';

  shouldDisableBtn(true);
  try {
    const response = await fetch(URL);
    const data = await response.json();

    let jokeToHear = '';
    if (data.setup && data.delivery) {
      jokeToHear = `${data.setup}...${data.delivery}`;
      await tellJoke(jokeToHear);
    }
  } catch (err) {
    shouldDisableBtn(false);
    console.error('Error fetching joke', err);
  }
}

button.addEventListener('click', getJoke);
