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
}

// on load create canvas
createCanvas();
