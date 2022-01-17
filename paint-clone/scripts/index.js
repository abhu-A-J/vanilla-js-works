const activeToolEl = document.getElementById('active-tool');

/* Brush Elements */
const brushColorBtn = document.getElementById('brush-color');
const brushIcon = document.getElementById('brush');
const brushSize = document.getElementById('brush-size');
const brushSlider = document.getElementById('brush-slider');

/* Bucket */
const bucketColorBtn = document.getElementById('bucket-color');

/* Eraser Elemenet */
const eraser = document.getElementById('eraser');

/* Clear Canvas */
const clearCanvasBtn = document.getElementById('clear-canvas');

/* Storage */
const saveStorageBtn = document.getElementById('save-storage');
const loadStorageBtn = document.getElementById('load-storage');
const clearStorageBtn = document.getElementById('clear-storage');

/* Download */
const downloadBtn = document.getElementById('download');

const { body } = document;

/* Variables to store info on the current tool */
let currentSize = 10;
let bucketColor = '#FFFFFF';
let currentColor = '#A51DAB';
let isEraser = false;
let isMouseDown = false;
let drawnArray = [];

/* Create the canvas elemnet */
const canvas = document.createElement('canvas');
canvas.setAttribute('id', 'canvas');

const context = canvas.getContext('2d');

/* Helper function create canvas */
function createCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 50;

  context.fillStyle = bucketColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  body.appendChild(canvas);

  // the moment the canmvas is created we set the current tool to brush
  switchBackToBrush();
}

/* Helper function to change brush size */
function displayBrushSize() {
  if (brushSlider.value < 10) {
    brushSize.textContent = `0${brushSlider.value}`;
  } else {
    brushSize.textContent = brushSlider.value;
  }
}

/* Helper function to switch back to brush tool */
function switchBackToBrush() {
  isEraser = false;

  brushIcon.style.color = 'black';
  eraser.style.color = 'white';
  activeToolEl.textContent = 'Brush';

  currentColor = `#${brushColorBtn.value}`;

  currentSize = 10;

  brushSlider.value = currentSize;

  displayBrushSize();
}

/* Helper function to get mouse position relative to canvas */
function getMousePosition(event) {
  // get the position for the canvas
  const { left, top } = canvas.getBoundingClientRect();

  // get where in viewport the cliked happened
  const { clientX, clientY } = event;

  // send back relative value of click in terms of canvas
  return {
    x: clientX - left,
    y: clientY - top,
  };
}

/* Helper function to store drawing paths */
function storeDrawingPaths(x, y, size, color, isEraser) {
  const line = { x, y, size, color, isEraser };
  drawnArray.push(line);
}

/* Helper fuynction tomrestore canvas based on stored drawing paths */
function restoreCanvas() {
  for (let i = 1; i < drawnArray.length; i++) {
    context.beginPath();

    context.moveTo(drawnArray[i - 1].x, drawnArray[i - 1].y);

    context.lineWidth = drawnArray[i].size;

    context.lineCap = 'round';

    if (drawnArray[i].isEraser) {
      context.strokeStyle = bucketColor;
    } else {
      context.strokeStyle = drawnArray[i].color;
    }

    context.lineTo(drawnArray[i].x, drawnArray[i].y);
    context.stroke();
  }
}

/* Listen to clear canvas button */
clearCanvasBtn.addEventListener('click', () => {
  createCanvas();
  drawnArray = [];
  activeToolEl.textContent = 'Canvas Cleared';
  setTimeout(() => {
    switchBackToBrush();
  }, 1000);
});

/* Listen to brush icon click */
brushIcon.addEventListener('click', switchBackToBrush);

/* Listen to eraser btn click */
eraser.addEventListener('click', () => {
  // set the eraser to true
  isEraser = true;

  // change properties for brush and eraser icon
  brushIcon.style.color = 'white';
  eraser.style.color = 'black';
  activeToolEl.textContent = 'Eraser';

  // eraser is brush with same color as background
  currentColor = bucketColor;
  currentSize = 50;
});

/* Listen to brush color change */
brushColorBtn.addEventListener('change', (e) => {
  // set isEraser to false
  isEraser = false;

  // set the current color
  currentColor = `#${e.target.value}`;
});

/* Listen to brush size change */
brushSlider.addEventListener('change', (e) => {
  currentSize = e.target.value;
  displayBrushSize();
});

/* Listen to background (bucket) color change */
bucketColorBtn.addEventListener('change', (e) => {
  // format the bucket color to add hex in front of it
  bucketColor = `#${e.target.value}`;
  // recreate canvas
  createCanvas();

  // restore canvas
  restoreCanvas();
});

/* Listen to mouse move event */
canvas.addEventListener('mousemove', (e) => {
  if (isMouseDown) {
    const { x, y } = getMousePosition(e);

    context.lineTo(x, y);
    context.stroke();

    // store the path
    storeDrawingPaths(x, y, currentSize, currentColor, isEraser);
  } else {
    storeDrawingPaths(undefined);
  }
});

/* Listen to mouse press event */
canvas.addEventListener('mousedown', (e) => {
  // set the global variable
  isMouseDown = true;
  const { x, y } = getMousePosition(e);

  context.lineWidth = currentSize;
  context.lineCap = 'round';
  context.strokeStyle = currentColor;

  context.moveTo(x, y);

  context.beginPath();
});

/* Listen to mouse release event */
canvas.addEventListener('mouseup', (e) => {
  // set the global variable
  isMouseDown = false;
});

// on load create canvas
createCanvas();
