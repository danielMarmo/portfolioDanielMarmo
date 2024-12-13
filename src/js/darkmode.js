document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

    if (isDarkMode) {
        body.classList.add('darkmode--activated');
        darkModeToggle.textContent = '🌙';
        gsap.to(body, { backgroundColor: "#121212", color: "#ffffff", duration: 0 });
    } else {
        darkModeToggle.textContent = '🌞';
        gsap.to(body, { backgroundColor: "#ffffff", color: "#000000", duration: 0 });
    }

    darkModeToggle.addEventListener('click', () => {
        const isDarkModeActive = body.classList.toggle('darkmode--activated');

        if (isDarkModeActive) {
            gsap.to(body, { backgroundColor: "#121212", color: "#ffffff", duration: 0.5 });
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.textContent = '🌙';
        } else {
            gsap.to(body, { backgroundColor: "#ffffff", color: "#000000", duration: 0.5 });
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.textContent = '🌞';
        }
    });
});
