document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const storedTheme = localStorage.getItem('theme');

    // Appliquer le thème stocké (ou le thème clair par défaut)
    body.dataset.theme = storedTheme ? storedTheme : 'light';
    updateThemeIcon();

    themeToggle.addEventListener('click', () => {
        body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', body.dataset.theme);
        updateThemeIcon();
    });

    function updateThemeIcon() {
        themeToggle.innerHTML = body.dataset.theme === 'dark'
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    }

    // Gestion du menu hamburger pour mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        const expanded = hamburger.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
        hamburger.setAttribute('aria-expanded', expanded);
    });

    // Animations GSAP sur chargement
    gsap.from('.nav-links li', {
        opacity: 0,
        y: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power1.out"
    });

    gsap.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "bounce.out"
    });

    gsap.timeline({ defaults: { ease: "power1.out" } })
        .from('.hero-profile', { x: -100, opacity: 0, duration: 1 })
        .from('.hero-text', { x: 100, opacity: 0, duration: 1 }, "-=0.5");

    // Animation de survol pour l'image de profil
    const profilePic = document.querySelector('.hero-profile img');
    if (profilePic) {
        profilePic.addEventListener('mouseenter', () => {
            gsap.to(profilePic, { scale: 1.05, duration: 0.3, ease: "power1.out" });
        });
        profilePic.addEventListener('mouseleave', () => {
            gsap.to(profilePic, { scale: 1, duration: 0.3, ease: "power1.out" });
        });
    }

    // Animation de survol pour chaque carte de projet
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { scale: 1.03, duration: 0.3, ease: "power1.out" });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { scale: 1, duration: 0.3, ease: "power1.out" });
        });
    });

    // Animation des titres de section et du footer
    gsap.from('.section-title', {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2
    });

    gsap.from('footer', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1,
        ease: "power2.out"
    });

    // Intersection Observer pour les éléments à révéler en scroll
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Animations continues pour fluidifier l'interface
    gsap.to('.hero-profile img', {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to('.hero-text', {
        scale: 1.01,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});
