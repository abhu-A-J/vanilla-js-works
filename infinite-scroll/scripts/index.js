// DOM Elements
const imgContainer = document.querySelector('.img-container');

// API key for Unsplash API
const API_KEY = '';

// Total Images to be loaded at once
const COUNT = 30;

// Unsplash API URL
const UNSPLASH_API_URL = `https://api.unsplash.com/photos/random?count=${COUNT}&client_id=${API_KEY}`;

// Store the images
let imagesArray = [];

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

getImages();
