document.addEventListener('DOMContentLoaded', () => {
    
    // ======= 1. Highlight active navigation tab =======
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPage = window.location.pathname.split('/').pop(); // Get current page filename

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active'); // Adds 'active' class defined in CSS
        }
    });

    // ======= 2. Homepage greeting animation =======
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

    // ======= 3. Smooth Scroll on Navigation =======
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // Adjusting for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // ======= 4. Profile Card Hover Animations =======
    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = "scale(1.05)";
            card.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.25)";
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = "scale(1)";
            card.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
        });
    });

    // ======= 5. Popup Modal (Mahogany Image Showcase) =======
    const images = document.querySelectorAll('.intro img'); // Select all images in intro section
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalClose = document.createElement('span');
    
    modal.classList.add('modal');
    modalContent.classList.add('modal-content');
    modalClose.classList.add('modal-close');
    modalClose.innerHTML = '&times;'; // Close button

    modal.appendChild(modalContent);
    modalContent.appendChild(modalClose);
    document.body.appendChild(modal);

    images.forEach(image => {
        image.addEventListener('click', () => {
            modal.style.display = "block";
            const modalImage = document.createElement('img');
            modalImage.src = image.src;
            modalContent.appendChild(modalImage);
        });
    });

    // Close the modal when clicking the close button
    modalClose.addEventListener('click', () => {
        modal.style.display = "none";
        modalContent.innerHTML = ''; // Clear the image when closed
        modalContent.appendChild(modalClose); // Keep the close button intact
    });

    // Close the modal if clicked outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            modalContent.innerHTML = '';
            modalContent.appendChild(modalClose); 
        }
    });

    // ======= 6. Scroll Animations (Fade In on Scroll) =======
    const fadeElements = document.querySelectorAll('.fade-in');
    const checkVisibility = () => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight - 100) {
                el.classList.add('visible');
            }
        });
    };

    // Trigger on page load and on scroll
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);

});
