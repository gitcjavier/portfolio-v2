export function initThemeToggle() {
  // Get theme toggle buttons and icons
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  const mobileSunIcon = document.getElementById('mobile-sun-icon');
  const mobileMoonIcon = document.getElementById('mobile-moon-icon');
  
  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  // Apply initial theme
  applyTheme(currentTheme);
  
  // Add event listeners to both toggle buttons
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
  }
  
  function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }
  
  function applyTheme(theme) {
    const html = document.documentElement;
    
    if (theme === 'dark') {
      html.classList.add('dark');
      updateIcons(true);
    } else {
      html.classList.remove('dark');
      updateIcons(false);
    }
  }
  
  function updateIcons(isDark) {
    if (isDark) {
      // Show moon icons (dark mode is active)
      if (sunIcon && moonIcon) {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      }
      if (mobileSunIcon && mobileMoonIcon) {
        mobileSunIcon.classList.add('hidden');
        mobileMoonIcon.classList.remove('hidden');
      }
    } else {
      // Show sun icons (light mode is active)
      if (sunIcon && moonIcon) {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
      }
      if (mobileSunIcon && mobileMoonIcon) {
        mobileSunIcon.classList.remove('hidden');
        mobileMoonIcon.classList.add('hidden');
      }
    }
  }
  
  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}