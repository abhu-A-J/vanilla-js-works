const loadingSpinner = document.querySelector('#loading-spinner');
const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote-text');
const qouteAuthor = document.querySelector('#quote-author');
const tweetQuoteBtn = document.querySelector('#tweet-btn');
const showNewQuoteBtn = document.querySelector('#new-quote-btn');

/* Store the list of quotes from API */
let quotesList = [];

/* Store the number of failed API hits */
let failedRetries = 0;

/* Function to generate a random number upto n */
function generateRandomNumber(n) {
  return Math.floor(Math.random() * n);
}

/* Show Loading Spinner */
function shouldShowLoadingSpinner(state) {
  loadingSpinner.hidden = !state;
  quoteContainer.hidden = state;
}

/* Hide the loading spinner */
function hideLoadingSpinner() {
  loadingSpinner.hidden = true;
  quoteContainer.hidden = false;
}

/* Function to tweet the quote */
function tweetTheQuote() {
  const BASE_URL = 'https://twitter.com/intent/tweet?text';
  const quoteAuthor = qouteAuthor.textContent || 'Anonymous';
  const quoteTextMsg = quoteText.textContent;
  const tweetUrl = `${BASE_URL}=${quoteTextMsg} - ${quoteAuthor}`;
  window.open(tweetUrl, '_blank');
}

/* Function to get another quote */
async function getNewQuote() {
  const randomNumber = generateRandomNumber(quotesList.length);
  const quote = quotesList[randomNumber];
  quoteText.textContent = quote.text;
  qouteAuthor.textContent = quote.author || 'Anonymous';
}

/* Get list of qoutes from the API */
async function getQoutes() {
  try {
    shouldShowLoadingSpinner(true);
    const BASE_URL = 'https://type.fit/api/quotes';
    const response = await fetch(BASE_URL);
    quotesList = await response.json();
    await getNewQuote();
    shouldShowLoadingSpinner(false);

    /* Simulate the failure of the API call */
    // throw Error('Failed to fetch qoutes');
  } catch (error) {
    console.error('Error Fetching quotes', error);
    failedRetries++;
    if (failedRetries <= 3) {
      await getQoutes();
    } else {
      alert(
        'Failed to fetch qoutes. SOmething seems wronmg with the API, try refreshing the page'
      );
    }
  }
}

/* Initializer for the application */
function initilize() {
  /* Event Listeners */
  tweetQuoteBtn.addEventListener('click', tweetTheQuote);
  showNewQuoteBtn.addEventListener('click', getNewQuote);
  failedRetries = 0;
  getQoutes();
}

initilize();
