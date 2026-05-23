// Navigation component

document.addEventListener('DOMContentLoaded', () => {
  loadComponent('header-component', 'html/components/header.html')
    .then(() => {
      highlightActiveLink();
    });
});


function highlightActiveLink() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    const href = item.getAttribute('href');

    if (href && (currentPath.endsWith(href) || (currentPath === '/' && href ===
      'index.html'))) {
      item.classList.add('active');
    }
  })
}