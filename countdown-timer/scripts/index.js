/* Input Container Elements */
const inputFormContainer = document.querySelector('#input-form');
const countdownTitleInputEl = document.querySelector('#countdown-title');
const countdownDateInputEl = document.querySelector('#countdown-date');

/* Countdown timer container elements */
const countdownContainer = document.querySelector('#countdown-container');
const countdownTimeElements = document.querySelectorAll('.countdown-time');

/* Variables to store data */
let countdownTitle = '';
let countdownDate = '';

/* COnversion factors from ms to days, hours, minutes, seconds */
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

/* Helper Function to hide container elements */
async function shouldHideContainerElem(containerEl, state) {
  containerEl.hidden = state;
}

/* Update the countdown timer */
async function updateCountdown() {
  // Hide the input form
  shouldHideContainerElem(inputFormContainer, true);

  // Set the tile of the countdown timer
  countdownContainer.querySelector('h1').textContent = countdownTitle;
  shouldHideContainerElem(countdownContainer, false);

  const targetTime = new Date(countdownDate).getTime();
  const currenTime = new Date().getTime();

  const timeDifference = targetTime - currenTime; // in ms

  const days = Math.floor(timeDifference / DAY);
  const hours = Math.floor((timeDifference % DAY) / HOUR);
  const minutes = Math.floor((timeDifference % HOUR) / MINUTE);
  const seconds = Math.floor((timeDifference % MINUTE) / SECOND);

  console.log({ days, hours, minutes, seconds });
}

// Start the countdown timer
async function startCountdown(e) {
  e.preventDefault();
  countdownTitle = countdownTitleInputEl.value;
  countdownDate = countdownDateInputEl.value;

  // check if title or date is empty
  if (!countdownTitle || !countdownDate) {
    alert('Please enter a title and date');
    return;
  }

  await updateCountdown();
}

// Run the code on load
inputFormContainer.addEventListener('submit', startCountdown);
// Set the date input to have a min limiot for today's date ( ISO Format)
const today = new Date().toISOString();
countdownDateInputEl.setAttribute('min', today.split('T')[0]);
