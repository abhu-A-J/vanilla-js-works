const menuBar = document.querySelector('#menu-bar');

/* Function to toggle the menu bar */
async function toggleMenu() {
  menuBar.classList.toggle('change');
}

/* Listen to click event on menu bar */
menuBar.addEventListener('click', toggleMenu);
