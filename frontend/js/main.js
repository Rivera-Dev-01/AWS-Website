// js/main.js
/**
 * Dynamic Template Loader
 * Loads reusable HTML components into designated placeholders
 */

function loadComponent(elementId, filePath) {
    return fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch component: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const container = document.getElementById(elementId);
            if (container) {
                container.innerHTML = data;
            }
            return data;
        })
        .catch(error => console.error(`Error loading component [${elementId}] from ${filePath}:`,
            error));

}

/* function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            
            // After loading the header, automatically highlight the active link
            if (elementId === 'header-placeholder') {
                const currentPath = window.location.pathname;
                const navItems = document.querySelectorAll('.nav-item');
                navItems.forEach(item => {
                    if (item.getAttribute('href').includes(currentPath) && currentPath !== '/') {
                        item.classList.add('active');
                    }
                });
            }
        })
        .catch(error => console.error(`Error loading ${filePath}:`, error));
}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-placeholder', 'html/components/header.html');
    // loadComponent('footer-placeholder', 'html/components/footer.html');
});
*/