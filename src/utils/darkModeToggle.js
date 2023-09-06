export function initializeDarkModeToggle() {
    const toggleButton = document.getElementById('toggleDarkMode');
  
    if (toggleButton) {
      toggleButton.addEventListener('click', function () {
        document.documentElement.classList.toggle('dark');
      });
    }
  }
  