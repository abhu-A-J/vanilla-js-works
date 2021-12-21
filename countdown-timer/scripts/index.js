/* Input Container Elements */
const inputFormContainer = document.querySelector('#input-form');
const countdownTitleInputEl = document.querySelector('#countdown-title');
const countdownDateInputEl = document.querySelector('#countdown-date');

/* Countdown timer container elements */
const countdownContainer = document.querySelector('#countdown-container');
const countdownTimeTextElements = document.querySelectorAll('.countdown-text');
const resetButton = document.querySelector('#reset-countdown');

/* Completed Container */
const completedContainer = document.querySelector('#completed-container');
const completedMessage = document.querySelector('#completed-message');
const startNewCountdown = document.querySelector('#start-new-countdown');

/* Variables to store data */
let countdownTitle = '';
let countdownDate = '';
let timerId = '';

/* COnversion factors from ms to days, hours, minutes, seconds */
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

/* Helper Function to hide container elements */
async function shouldHideContainerElem(containerEl, state) {
  containerEl.hidden = state;
}

/* Helper function to format time */
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

/* Update the countdown timer */
async function updateCountdown() {
  timerId = setInterval(() => {
    // Hide the input form

    const targetTime = new Date(countdownDate).getTime();
    const currentTime = new Date().getTime();

    const timeDifference = targetTime - currentTime; // in ms

    // timer is over
    if (timeDifference <= 0) {
      // show the completed container and hide others
      shouldHideContainerElem(completedContainer, false);
      shouldHideContainerElem(countdownContainer, true);
      shouldHideContainerElem(inputFormContainer, true);

      // add the custom message and title for countdown
      const [date] = new Date(countdownDate).toISOString().split('T');
      // add the title
      completedContainer.querySelector('h1').textContent = countdownTitle;
      // add the message
      completedMessage.textContent = `Timer completed on ${date}`;

      // clear the timer
      clearInterval(timerId);
      return;
    }

    // Set the tile of the countdown timer
    countdownContainer.querySelector('h1').textContent = countdownTitle;
    shouldHideContainerElem(countdownContainer, false);
    shouldHideContainerElem(completedContainer, true);
    shouldHideContainerElem(inputFormContainer, true);

    const days = Math.floor(timeDifference / DAY);
    const hours = Math.floor((timeDifference % DAY) / HOUR);
    const minutes = Math.floor((timeDifference % HOUR) / MINUTE);
    const seconds = Math.floor((timeDifference % MINUTE) / SECOND);

    const [daysEl, hoursEl, minutesEl, secondsEl] = countdownTimeTextElements;

    daysEl.textContent = `${formatTime(days)}`;
    hoursEl.textContent = `${formatTime(hours)}`;
    minutesEl.textContent = `${formatTime(minutes)}`;
    secondsEl.textContent = `${formatTime(seconds)}`;
  }, 1000);
}

// Reset the countdown timer
async function resetCountdown() {
  // Show the input form container and hide others
  shouldHideContainerElem(inputFormContainer, false);
  shouldHideContainerElem(countdownContainer, true);
  shouldHideContainerElem(completedContainer, true);

  // reset form fields
  countdownTitleInputEl.value = '';
  countdownDateInputEl.value = '';

  // reset global variables
  countdownDate = '';
  countdownTitle = '';

  clearInterval(timerId);

  localStorage.removeItem('timer-details');
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

  // set the timer details on local stoarge
  const timerDetails = {
    title: countdownTitle,
    date: countdownDate,
  };

  localStorage.setItem('timer-details', JSON.stringify(timerDetails));
  await updateCountdown();
}

// Run the code on load
inputFormContainer.addEventListener('submit', startCountdown);
resetButton.addEventListener('click', resetCountdown);
startNewCountdown.addEventListener('click', resetCountdown);

// Set the date input to have a min limiot for today's date ( ISO Format)
const today = new Date().toISOString();
countdownDateInputEl.setAttribute('min', today.split('T')[0]);

const isPreviousTimer = JSON.parse(
  localStorage.getItem('timer-details') || '{}'
);

if (isPreviousTimer && isPreviousTimer.title && isPreviousTimer.date) {
  countdownTitle = isPreviousTimer.title;
  countdownDate = isPreviousTimer.date;
  updateCountdown();
} else {
  resetCountdown();
}
