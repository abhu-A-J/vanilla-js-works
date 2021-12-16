// DOM Elements
const imgContainer = document.querySelector('.img-container');

// API key for Unsplash API
const API_KEY = '';

// Total Images to be loaded at once
const COUNT = 10;

// Unsplash API URL
const UNSPLASH_API_URL = `https://api.unsplash.com/photos/random?count=${COUNT}&client_id=${API_KEY}`;

// Store the images
let imagesArray = [];
// Count to total images loaded
let totalImagesLoaded = 0;

// Boolean flag to enable fetching more images on scroll if all images are loaded successfully
let readyToLoadMoreImages = false;

// Function to track if all images have loaded
async function imageLoaded() {
  totalImagesLoaded++;

  if (totalImagesLoaded >= imagesArray.length) {
    readyToLoadMoreImages = true;

    // reset count back to 0;
    totalImagesLoaded = 0;
  }
}

// Function to display images on the page
async function displayImages() {
  const documentFragment = document.createDocumentFragment();
  for (const image of imagesArray) {
    // create the anchor element
    const item = document.createElement('a');
    item.setAttribute('target', '_blank');
    item.setAttribute('href', image.links.html);

    // create the image element
    const img = document.createElement('img');
    img.setAttribute('src', image.urls.regular);
    img.setAttribute('title', image.alt_description || '');
    img.setAttribute('alt', image.alt_description || '');

    // add image inside the anchor element
    item.appendChild(img);

    // Add event listener for load on image
    img.addEventListener('load', imageLoaded);

    // all all images to fragment while in loop
    imgContainer.appendChild(item);
  }
  // finally append the frgment to the images container
  imgContainer.appendChild(documentFragment);
}

// Function to get images from Unsplash API
async function getImages() {
  try {
    const response = await fetch(UNSPLASH_API_URL);
    imagesArray = await response.json();
    await displayImages();
  } catch (err) {
    console.error('Error fetching unsplash API', err);
  }
}

window.addEventListener('scroll', (e) => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    readyToLoadMoreImages
  ) {
    readyToLoadMoreImages = false;
    getImages();
  }
});

getImages();
