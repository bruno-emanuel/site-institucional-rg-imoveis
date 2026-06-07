document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Lucide Icons ---
    const initIcons = () => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    };
    initIcons();

    // --- Sticky Header & Active Links ---
    const nav = document.querySelector('nav');
    const sections = document.querySelectorAll('section[id]');
    
    const handleScroll = () => {
        // Sticky Header
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Active Link Highlight
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        document.querySelectorAll(".nav-links a").forEach((a) => {
            a.classList.remove("text-primary", "opacity-100");
            if (a.getAttribute("href").includes(current) && current !== "") {
                a.classList.add("text-primary", "opacity-100");
            }
        });
    };

    window.addEventListener('scroll', handleScroll);

    // --- Intersection Observer for Reveal Animations ---
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Elements to reveal
    const revealElements = document.querySelectorAll('.card, .section-header, .why-item, .test-card, .hero-content > *, .stat-item');
    revealElements.forEach(el => {
        el.classList.add('reveal-init');
        revealObserver.observe(el);
    });

    // --- Smooth Scroll Enhancements ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = nav ? nav.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
