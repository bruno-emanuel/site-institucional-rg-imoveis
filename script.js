document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Lucide Icons ---
    const initIcons = () => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    };
    initIcons();

    // --- Initialize Splide.js Carousel ---
    if (typeof Splide !== 'undefined') {
        new Splide('#property-carousel', {
            type   : 'loop',
            drag   : 'free',
            focus  : 'center',
            perPage: 3,
            gap    : '2rem',
            autoplay: true,
            interval: 3000,
            pauseOnHover: false,
            arrows: true,
            pagination: true,
            breakpoints: {
                1024: {
                    perPage: 2,
                },
                640: {
                    perPage: 1,
                    gap: '1rem',
                },
            }
        }).mount();
        
        // Re-init icons after Splide clones items
        initIcons();
    }

    // --- Sticky Header & Active Links ---
    const nav = document.querySelector('#main-nav');
    const navLogo = document.querySelector('#nav-logo');
    const navBrand = document.querySelector('#nav-brand');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    
    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Sticky Header Logic
        if (scrollY > 10) {
            nav.classList.add('nav-scrolled', 'text-ink');
            nav.classList.remove('text-white', 'py-6');
            navLogo.classList.remove('brightness-0', 'invert');
            navBrand.classList.add('text-ink');
            navBrand.classList.remove('text-white');
            
            navLinks.forEach(link => {
                link.classList.remove('nav-link-white');
                link.classList.add('nav-link-dark');
            });
        } else {
            nav.classList.remove('nav-scrolled', 'text-ink');
            nav.classList.add('text-white', 'py-6');
            navLogo.classList.add('brightness-0', 'invert');
            navBrand.classList.remove('text-ink');
            navBrand.classList.add('text-white');
            
            navLinks.forEach(link => {
                link.classList.add('nav-link-white');
                link.classList.remove('nav-link-dark');
            });
        }

        // Active Link Highlight
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((a) => {
            a.classList.remove("text-primary", "opacity-100");
            if (a.getAttribute("href") === `#${current}` && current !== "") {
                a.classList.add("text-primary", "opacity-100");
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.querySelector('#mobile-menu-toggle');
    const mobileMenu = document.querySelector('#mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                setTimeout(() => {
                    mobileMenu.classList.remove('opacity-0', '-translate-y-4');
                }, 10);
                mobileMenuToggle.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
            } else {
                mobileMenu.classList.add('opacity-0', '-translate-y-4');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
                mobileMenuToggle.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
            }
            lucide.createIcons();
        });

        // Close menu on link click
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('opacity-0', '-translate-y-4');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
                mobileMenuToggle.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
                lucide.createIcons();
            });
        });
    }

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

    // --- Accordion Logic ---
    const accordions = document.querySelectorAll('.accordion-item');
    
    accordions.forEach(item => {
        const toggle = item.querySelector('.accordion-toggle');
        const content = item.querySelector('.accordion-content');
        
        toggle.addEventListener('click', () => {
            const isOpen = toggle.getAttribute('aria-expanded') === 'true';
            
            // Close other items
            accordions.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.accordion-toggle').setAttribute('aria-expanded', 'false');
                    otherItem.querySelector('.accordion-content').style.maxHeight = '0';
                    otherItem.classList.remove('border-primary/30', 'ring-1', 'ring-primary/10');
                }
            });
            
            // Toggle current item
            toggle.setAttribute('aria-expanded', !isOpen);
            content.style.maxHeight = !isOpen ? content.scrollHeight + "px" : "0";
            
            if (!isOpen) {
                item.classList.add('border-primary/30', 'ring-1', 'ring-primary/10');
            } else {
                item.classList.remove('border-primary/30', 'ring-1', 'ring-primary/10');
            }
        });
    });

    // --- Smooth Scroll Enhancements ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const nav = document.querySelector('nav');
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
