// DOM Elements
const startBtn = document.querySelector('#startBtn');
const startPipBtn = document.querySelector('#startPipBtn');
const cancelPipBtn = document.querySelector('#cancelPipBtn');

const video = document.querySelector('#video');

// function to handle the request for screen share
async function requestScreenShare() {
  try {
    startBtn.disabled = true;

    const mediaCaptureStream = await navigator.mediaDevices.getDisplayMedia();
    if (mediaCaptureStream) {
      video.srcObject = mediaCaptureStream;
      video.hidden = false;
      if (!startBtn.hidden) {
        startBtn.hidden = true;
        startPipBtn.hidden = false;
      }
      startBtn.disabled = false;
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

// function to start Picture in Picture Mode
async function startPipMode() {
  try {
    const result = await video.requestPictureInPicture();
    startPipBtn.disbaled = true;
    if (result) {
      video.hidden = true;
      startPipBtn.hidden = true;
      cancelPipBtn.hidden = false;
      startPipBtn.disbaled = false;
    }
  } catch (err) {
    console.error('Error starting PIP Mode', err);
  }
}

// function to cancel Picture in Picture Mode

async function cancelPipMode() {
  try {
    await document.exitPictureInPicture();
    cancelPipBtn.disbaled = true;

    video.hidden = true;
    startBtn.hidden = false;
    startPipBtn.hidden = true;
    cancelPipBtn.hidden = true;
    cancelPipBtn.disbaled = false;
  } catch (err) {
    console.error('Error cancelling PIP Mode', err);
  }
}

startBtn.addEventListener('click', requestScreenShare);
startPipBtn.addEventListener('click', startPipMode);
cancelPipBtn.addEventListener('click', cancelPipMode);

video.addEventListener('leavepictureinpicture', () => {
  cancelPipBtn.disbaled = true;
  video.hidden = true;
  startBtn.hidden = false;
  startPipBtn.hidden = true;
  cancelPipBtn.hidden = true;
  cancelPipBtn.disbaled = false;
});
