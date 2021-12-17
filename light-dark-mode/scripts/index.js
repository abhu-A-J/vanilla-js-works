const themeToggle = document.querySelector('#theme-toggle');

/* Helper function to set theme attribue on root element */
async function setThemeAttribute(theme = 'light') {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.checked = theme === 'dark';
}

/* Function to set the theme */
async function toggleTheme(e) {
  const { checked } = e.target;

  if (checked) {
    setThemeAttribute('dark');
  } else {
    setThemeAttribute('light');
  }
}

/* Listen to the change event of the checkbox */
themeToggle.addEventListener('change', toggleTheme);

const currentTheme = localStorage.getItem('theme') || 'light';
setThemeAttribute(currentTheme);
