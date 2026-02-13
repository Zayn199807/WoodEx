document.addEventListener('DOMContentLoaded', () => {
    
    // ======= 1. Highlight active navigation tab =======
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
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

    // ======= 3. Smooth Scroll =======
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById(link.getAttribute('href').substring(1));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
            }
        });
    });

    // ======= 4. Profiles Flip Cards =======
    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach(card => {
        const inner = card.querySelector('.profile-card-inner');

        // Desktop: hover flip handled via CSS
        card.addEventListener('mouseenter', () => {
            inner.style.transform = "rotateY(180deg)";
        });
        card.addEventListener('mouseleave', () => {
            inner.style.transform = "rotateY(0deg)";
        });

        // Mobile / click toggle
        card.addEventListener('click', () => {
            const isFlipped = inner.style.transform === "rotateY(180deg)";
            inner.style.transform = isFlipped ? "rotateY(0deg)" : "rotateY(180deg)";
        });
    });

    // ======= 5. Image Modal =======
    const images = document.querySelectorAll('.intro img');
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalClose = document.createElement('span');

    modal.classList.add('modal');
    modalContent.classList.add('modal-content');
    modalClose.classList.add('modal-close');
    modalClose.innerHTML = '&times;';
    modal.appendChild(modalContent);
    modalContent.appendChild(modalClose);
    document.body.appendChild(modal);

    images.forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = "flex";
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            modalContent.appendChild(modalImg);
        });
    });

    modalClose.addEventListener('click', () => {
        modal.style.display = "none";
        modalContent.innerHTML = '';
        modalContent.appendChild(modalClose);
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            modalContent.innerHTML = '';
            modalContent.appendChild(modalClose);
        }
    });

    // ======= 6. Fade-in Scroll Animations =======
    const fadeElements = document.querySelectorAll('.fade-in');
    const checkVisibility = () => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight - 100) {
                el.classList.add('visible');
            }
        });
    };
     checkVisibility();
     window.addEventListener('scroll', checkVisibility);

});
