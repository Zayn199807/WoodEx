// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // ======= 1. Highlight active navigation tab =======
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPage = window.location.pathname.split('/').pop(); // get file name

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active'); // Adds 'active' class defined in CSS
        }
    });

    // ======= 2. Optional: Homepage greeting animation =======
    const mainTitle = document.querySelector('main h2');
    if (mainTitle) {
        mainTitle.style.opacity = 0;
        mainTitle.style.transform = "translateY(-20px)";
        setTimeout(() => {
            mainTitle.style.transition = "all 1s ease";
            mainTitle.style.opacity = 1;
            mainTitle.style.transform = "translateY(0)";
        }, 200);
    }

});
