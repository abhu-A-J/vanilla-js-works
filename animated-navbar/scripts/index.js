const menuBar = document.querySelector('#menu-bar');
const navbarOverlay = document.querySelector('#navbar-overlay');
const navbarItems = document.querySelectorAll('.navbar-items');

/* Function to toggle the menu bar */
async function toggleMenu() {
  menuBar.classList.toggle('change');

  // if change class is applied to menu-bar slide in the overlay
  if (menuBar.classList.contains('change')) {
    const startTrigger = 0.2;
    navbarOverlay.classList.add('slideIn');
    navbarOverlay.classList.remove('slideOut');

    navbarItems.forEach((item, index) => {
      const animationString = `slideIn 0.5s linear ${
        startTrigger * (index + 1)
      }s both`;
      item.style.animation = animationString;
    });
  } // if change class is not applied slide out the overlay
  else {
    const startTrigger = 0.5;
    navbarOverlay.classList.add('slideOut');
    navbarOverlay.classList.remove('slideIn');

    navbarItems.forEach((item, index) => {
      const animationString = `slideOut 0.5s linear ${
        startTrigger - 0.1 * index
      }s both`;
      item.style.animation = animationString;
    });
  }
}

/* Listen to click event on menu bar */
menuBar.addEventListener('click', toggleMenu);
