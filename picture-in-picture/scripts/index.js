// DOM Elements
const startBtn = document.querySelector('#startBtn');
const startPipBtn = document.querySelector('#startPipBtn');
const cancelPipBtn = document.querySelector('#cancelPipBtn');

const video = document.querySelector('#video');

// function to change controls
async function changeControls(type) {
  switch (type) {
    case 'requestScreenShare': {
      // hide start btn
      startBtn.hidden = true;
      startBtn.disabled = false;

      // show the start pip btn
      startPipBtn.hidden = false;

      // show the video
      video.hidden = false;

      // hide the cancel pip btn
      cancelPipBtn.hidden = true;
      break;
    }

    case 'startPip': {
      // hide the start pip btn
      startPipBtn.hidden = true;
      startPipBtn.disabled = false;

      // hide the video
      video.hidden = true;

      // show the cancel pip btn
      cancelPipBtn.hidden = false;

      break;
    }

    case 'cancelPip': {
      // hide the cancel pip btn
      cancelPipBtn.hidden = true;
      cancelPipBtn.disabled = false;

      // show the start btn
      startBtn.hidden = false;

      // hide others
      video.hidden = true;
      startPipBtn.hidden = true;

      break;
    }
  }
}
// function to handle the request for screen share
async function requestScreenShare() {
  try {
    startBtn.disabled = true;
    const mediaCaptureStream = await navigator.mediaDevices.getDisplayMedia();
    if (mediaCaptureStream) {
      video.srcObject = mediaCaptureStream;
      await changeControls('requestScreenShare');
    }
  } catch (err) {
    console.error('Error:', err);
    startBtn.disabled = true;
  }
}

// function to start Picture in Picture Mode
async function startPipMode() {
  try {
    const result = await video.requestPictureInPicture();
    startPipBtn.disabled = true;
    if (result) {
      await changeControls('startPip');
    }
  } catch (err) {
    console.error('Error starting PIP Mode', err);
    startPipBtn.disabled = true;
  }
}

// function to cancel Picture in Picture Mode
async function cancelPipMode() {
  try {
    await document.exitPictureInPicture();
    cancelPipBtn.disbaled = true;
    await changeControls('cancelPip');
  } catch (err) {
    console.error('Error cancelling PIP Mode', err);
    cancelPipBtn.disbaled = true;
  }
}

startBtn.addEventListener('click', requestScreenShare);
startPipBtn.addEventListener('click', startPipMode);
cancelPipBtn.addEventListener('click', cancelPipMode);

video.addEventListener('leavepictureinpicture', () => {
  changeControls('cancelPip');
});
