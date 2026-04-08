
function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.classList.add('light-theme');
  } else {
    document.documentElement.classList.remove('light-theme');
  }
}
const currentTheme = localStorage.getItem('theme') || 'dark';
applyTheme(currentTheme);
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.textContent = currentTheme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
    
    toggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.classList.contains('light-theme');
      const newTheme = isLight ? 'dark' : 'light';
      
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
      toggleBtn.textContent = newTheme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
    });
  }
});
