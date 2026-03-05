document.addEventListener('DOMContentLoaded', () => {

    // ======= 1. Highlight active navigation tab =======
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // ======= 2. Homepage hero animation =======
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

    // ======= 3. Smooth scroll for anchor links =======
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
            }
        });
    });

    // ======= 4. Profiles Flip Cards =======
    document.querySelectorAll('.profile-card').forEach(card => {
        const inner = card.querySelector('.profile-card-inner');

        // Desktop hover handled via CSS
        card.addEventListener('mouseenter', () => inner.style.transform = "rotateY(180deg)");
        card.addEventListener('mouseleave', () => inner.style.transform = "rotateY(0deg)");

        // Mobile click toggle
        card.addEventListener('click', () => {
            const isFlipped = inner.style.transform === "rotateY(180deg)";
            inner.style.transform = isFlipped ? "rotateY(0deg)" : "rotateY(180deg)";
        });
    });

    // ======= 5. Image Modal =======
    const images = document.querySelectorAll('.intro img');
    if (images.length > 0) {
        const modal = document.createElement('div');
        const modalContent = document.createElement('div');
        const modalClose = document.createElement('span');

        modal.classList.add('modal');
        modalContent.classList.add('modal-content');
        modalClose.classList.add('modal-close');
        modalClose.innerHTML = '&times;';
        modalContent.appendChild(modalClose);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        images.forEach(img => img.addEventListener('click', () => {
            let modalImg = modalContent.querySelector('img');
            if (!modalImg) {
                modalImg = document.createElement('img');
                modalContent.appendChild(modalImg);
            }
            modalImg.src = img.src;
            modal.style.display = "flex";
        }));

        const closeModal = () => {
            modal.style.display = "none";
        };

        modalClose.addEventListener('click', closeModal);
        window.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    }

    // ======= 6. Fade-in Scroll Animations =======
    const fadeElements = document.querySelectorAll('.fade-in');
    const checkVisibility = () => fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 100) el.classList.add('visible');
    });
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);

    // ======= NEW: 7. Glassmorphism Header on Scroll =======
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('glass-active');
        } else {
            header.classList.remove('glass-active');
        }
    });

    // ======= NEW: 8. ScrollReveal Animations =======
    // Check if ScrollReveal library is loaded
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.service-card', {
            delay: 200,
            origin: 'bottom',
            distance: '50px',
            interval: 200, // Staggers the cards
            reset: true // Animation repeats if you scroll up and down
        });

        ScrollReveal().reveal('.reveal-section', {
            delay: 300,
            origin: 'bottom',
            distance: '40px',
            duration: 1000
        });

        ScrollReveal().reveal('.profile-card', {
            delay: 100,
            origin: 'left',
            distance: '30px',
            interval: 150
        });
    }

    // ======= 9. Mobile Navigation Toggle =======
    const navbar = document.querySelector('.navbar ul');
    if (navbar) {
        const toggleBtn = document.createElement('button');
        toggleBtn.classList.add('nav-toggle');
        toggleBtn.innerHTML = '&#9776;';
        toggleBtn.style.fontSize = '1.8rem';
        toggleBtn.style.background = 'transparent';
        toggleBtn.style.border = 'none';
        toggleBtn.style.color = '#fff';
        toggleBtn.style.cursor = 'pointer';
        toggleBtn.style.marginLeft = '10px';
        
        // Append to header section or wherever the button should be
        // Ideally append this to a specific container, but keeping original logic:
        // Note: In the original code, it appends to header directly. 
        // With the new CSS layout, we might need to adjust where this button appears.
        // For now, we keep it as is to avoid breaking logic.
        header.appendChild(toggleBtn); 

        toggleBtn.addEventListener('click', () => {
            navbar.classList.toggle('nav-open');
        });
    }

});