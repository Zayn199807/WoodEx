document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // 1. GSAP REGISTRATION & SETUP
    // =================================================================
    // Added ScrollToPlugin for smooth scrolling functionality
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // =================================================================
    // 2. HERO TIMELINE (Making H1 Look Premium)
    // =================================================================
    // This sequence focuses on the Typography first for maximum impact
    const masterTL = gsap.timeline({ defaults: { ease: "power4.out" } });

    masterTL
        // 1. H1 slides up from below with a slight skew for style
        .from(".hero-content h1", { 
            y: 100, 
            opacity: 0, 
            duration: 1.2, 
            skewY: 2 
        })
        // 2. Trigger the CSS underline animation
        .call(() => {
            const h1 = document.querySelector(".hero-content h1");
            if(h1) h1.classList.add("animate-underline");
        }, null, "-=0.2")
        // 3. Paragraph fades in
        .from(".hero-content p", { 
            opacity: 0, 
            y: 30, 
            duration: 0.8 
        }, "-=0.8")
        // 4. Button pops in with a bounce
        .from(".btn-hero", { 
            scale: 0.8, 
            opacity: 0, 
            duration: 0.5, 
            ease: "back.out(1.7)" 
        }, "-=0.4")
        // 5. Logo and Nav fade in last
        .from(".header-logo", { 
            opacity: 0, 
            y: -30, 
            duration: 0.8 
        }, "-=1")
        .from(".page-title", { 
            opacity: 0, 
            y: -30, 
            duration: 0.6 
        }, "-=0.6")
        .from(".navbar a", { 
            opacity: 0, 
            y: -20, 
            stagger: 0.1, 
            duration: 0.5 
        }, "-=0.4");

    // =================================================================
    // 3. SCROLL TRIGGER ANIMATIONS (Elements animate on scroll)
    // =================================================================
    
    // Reveal generic sections (About, Services containers)
    gsap.utils.toArray('.reveal-section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });

    // Service Cards Stagger (Pop up one by one)
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
            },
            opacity: 0,
            y: 60,
            duration: 0.8,
            delay: i * 0.1 // Stagger effect
        });
    });

    // Profile Cards Stagger (Scale in)
    gsap.utils.toArray('.profile-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
            },
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            delay: i * 0.15
        });
    });

    // =================================================================
    // 4. CORE FUNCTIONALITY (Navigation, Modals, Etc)
    // =================================================================

    // --- Highlight Active Navigation Tab ---
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                // Use GSAP for ultra-smooth scroll
                gsap.to(window, { 
                    duration: 1, 
                    scrollTo: { y: target, offsetY: 80 }, 
                    ease: "power2.inOut" 
                });
            }
        });
    });

    // --- Profiles Flip Cards (Mobile Support) ---
    document.querySelectorAll('.profile-card').forEach(card => {
        const inner = card.querySelector('.profile-card-inner');

        // Desktop hover handled via CSS, but we add listeners for robustness
        card.addEventListener('mouseenter', () => inner.style.transform = "rotateY(180deg)");
        card.addEventListener('mouseleave', () => inner.style.transform = "rotateY(0deg)");

        // Mobile click toggle
        card.addEventListener('click', (e) => {
            // Prevent mouseenter conflict on touch devices
            if(window.innerWidth <= 768) {
                const isFlipped = inner.style.transform === "rotateY(180deg)";
                inner.style.transform = isFlipped ? "rotateY(0deg)" : "rotateY(180deg)";
            }
        });
    });

    // --- Image Modal ---
    const images = document.querySelectorAll('.intro img, .gallery img');
    if (images.length > 0) {
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

        images.forEach(img => img.addEventListener('click', () => {
            let modalImg = modalContent.querySelector('img');
            if (!modalImg) {
                modalImg = document.createElement('img');
                modalContent.appendChild(modalImg);
            }
            modalImg.src = img.src;
            modal.style.display = "flex";
        }));

        const closeModal = () => modal.style.display = "none";
        modalClose.addEventListener('click', closeModal);
        window.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    }

    // --- Glassmorphism Header on Scroll ---
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('glass-active');
        } else {
            header.classList.remove('glass-active');
        }
    });

    // =================================================================
    // 5. MOBILE NAVIGATION TOGGLE
    // =================================================================
    const navbar = document.querySelector('.navbar ul');
    if (navbar) {
        const toggleBtn = document.createElement('button');
        toggleBtn.classList.add('nav-toggle');
        toggleBtn.innerHTML = '&#9776;';
        
        // Premium Styling for Toggle
        toggleBtn.style.cssText = `
            display: none; 
            font-size: 1.8rem; 
            background: transparent; 
            border: none; 
            color: #D4AF37; 
            cursor: pointer; 
            position: absolute;
            right: 20px;
            top: 25px;
            z-index: 1001;
        `;
        
        header.appendChild(toggleBtn); 

        toggleBtn.addEventListener('click', () => {
            navbar.classList.toggle('nav-open');
            // Toggle icon between hamburger and X
            if (navbar.classList.contains('nav-open')) {
                toggleBtn.innerHTML = '&times;';
            } else {
                toggleBtn.innerHTML = '&#9776;';
            }
        });
    }
    
    // Handle resize events
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            if(navbar) navbar.classList.remove('nav-open');
            const toggleBtn = document.querySelector('.nav-toggle');
            if(toggleBtn) toggleBtn.innerHTML = '&#9776;';
        }
    });

    // ======= TYPING ANIMATION FOR IT PAGE =======
const typingElement = document.querySelector('.typing-text');
if (typingElement && document.body.classList.contains('woodex-it')) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    let i = 0;
    
    // Prevent GSAP from hiding it if it was in a timeline
    gsap.set(typingElement, { opacity: 1 }); 
    
    function typeWriter() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50); // Speed of typing
        }
    }
    // Start typing after a delay
    setTimeout(typeWriter, 800);
}

});
