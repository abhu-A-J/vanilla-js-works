const menuBar = document.querySelector('#menu-bar');
const navbarOverlay = document.querySelector('#navbar-overlay');

/* Function to toggle the menu bar */
async function toggleMenu() {
  menuBar.classList.toggle('change');
  if (menuBar.classList.contains('change')) {
    navbarOverlay.classList.add('slideIn');
    navbarOverlay.classList.remove('slideOut');
  } else {
    navbarOverlay.classList.add('slideOut');
    navbarOverlay.classList.remove('slideIn');
  }
}

/* Listen to click event on menu bar */
menuBar.addEventListener('click', toggleMenu);
