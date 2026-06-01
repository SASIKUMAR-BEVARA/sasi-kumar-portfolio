/**
 * Bevara Sasi Kumar - Portfolio Website Script
 * Interactive logic, animations, and data analytics visualizations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // THEME SWITCHER
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    document.body.className = savedTheme;
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
            updateThemeIcon('light-theme');
        } else {
            document.body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
            updateThemeIcon('dark-theme');
        }
        // Redraw canvas particles with new colors
        if (window.initParticles) {
            window.initParticles();
        }
    });

    function updateThemeIcon(theme) {
        if (theme === 'light-theme') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    // ==========================================================================
    // MOBILE NAVIGATION DRAWER
    // ==========================================================================
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close menu when clicking link items
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // Header scroll background change
    const header = document.querySelector('.header');
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            scrollToTopBtn.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            scrollToTopBtn.classList.remove('show');
        }
    });

    // ==========================================================================
    // TYPING ANIMATION (HERO SECTION)
    // ==========================================================================
    const typingElement = document.getElementById('typing-text');
    const titles = [
        'Data Analyst.',
        'AI Full Stack Developer.',
        'Python Enthusiast.',
        'Problem Solver.'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deletes faster
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // Check if finished typing word
        if (!isDeleting && charIndex === currentTitle.length) {
            typingSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500; // Pause before starting new word
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing animation if element exists
    if (typingElement) {
        setTimeout(type, 1000);
    }

    // ==========================================================================
    // SKILLS SECTION CATEGORY FILTERING & PROGRESS ANIMATIONS
    // ==========================================================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked button
            btn.classList.add('active');

            const category = btn.dataset.tab;

            skillCards.forEach(card => {
                const cardCategory = card.dataset.category;
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    // Retrigger micro scale animation
                    card.style.animation = 'none';
                    card.offsetHeight; // Trigger reflow
                    card.style.animation = null;
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Skill Progress Bars Trigger
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width; // Grab pre-coded width
                bar.style.width = '0%'; // Reset to zero initially
                bar.offsetHeight; // Reflow
                setTimeout(() => {
                    bar.style.width = targetWidth; // Animate to true value
                }, 100);
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.25 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // ==========================================================================
    // CUSTOM CURSOR & GLOWING BLOB PHYSICS
    // ==========================================================================
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const glowBlob = document.getElementById('cursor-glow-blob');

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    let glowX = 0, glowY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Custom animation loop for smooth damping
    function updateCursorPhysics() {
        // Smooth cursor border (damping = 0.15)
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        if (cursor) {
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
        }

        // Smooth cursor dot (damping = 0.35)
        dotX += (mouseX - dotX) * 0.35;
        dotY += (mouseY - dotY) * 0.35;
        if (cursorDot) {
            cursorDot.style.left = `${dotX}px`;
            cursorDot.style.top = `${dotY}px`;
        }

        // Smooth glow blob (damping = 0.08)
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        if (glowBlob) {
            glowBlob.style.left = `${glowX}px`;
            glowBlob.style.top = `${glowY}px`;
        }

        requestAnimationFrame(updateCursorPhysics);
    }
    updateCursorPhysics();

    // Hover state classes on interactive elements
    function updateCursorHoverEvents() {
        const clickables = document.querySelectorAll('a, button, .tab-btn, .project-card, .voting-btn, .menu-item-add, .qty-btn');
        clickables.forEach(item => {
            // Remove first to avoid duplicate event listeners
            item.removeEventListener('mouseenter', onMouseEnterClickable);
            item.removeEventListener('mouseleave', onMouseLeaveClickable);
            
            item.addEventListener('mouseenter', onMouseEnterClickable);
            item.addEventListener('mouseleave', onMouseLeaveClickable);
        });
    }

    function onMouseEnterClickable() {
        document.body.classList.add('clickable-hovered');
    }

    function onMouseLeaveClickable() {
        document.body.classList.remove('clickable-hovered');
    }

    updateCursorHoverEvents();

    // ==========================================================================
    // SEAMLESS PAGE TRANSITIONS
    // ==========================================================================
    const transitionOverlay = document.querySelector('.page-transition-overlay');
    const transitionLogo = document.querySelector('.page-transition-logo');

    // Page Reveal on Load
    if (transitionOverlay) {
        // Initial state: cover screen
        gsap.set(transitionOverlay, { y: '0%' });
        
        const tl = gsap.timeline();
        tl.to(transitionLogo, { opacity: 1, y: 0, duration: 0.4, delay: 0.2 })
          .to(transitionOverlay, {
              y: '-100%',
              duration: 0.6,
              ease: 'power3.inOut',
              onComplete: () => {
                  // Position below for next sweep
                  gsap.set(transitionOverlay, { y: '100%' });
                  gsap.set(transitionLogo, { opacity: 0, y: 20 });
              }
          });
    }

    // Intercept clicks on links
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        
        // Skip links that are: empty, hash links on current page, mailto, tel, whatsapp, external targets
        if (!href || 
            href.startsWith('#') || 
            href.startsWith('mailto:') || 
            href.startsWith('tel:') || 
            href.startsWith('https://wa.me') || 
            link.getAttribute('target') === '_blank') {
            return;
        }

        // Prevent normal navigation and trigger screen curtain sweep
        e.preventDefault();
        document.body.classList.remove('clickable-hovered');

        gsap.to(transitionOverlay, {
            y: '0%',
            duration: 0.5,
            ease: 'power3.inOut',
            onComplete: () => {
                window.location.href = href;
            }
        });
    });

    // ==========================================================================
    // GSAP HERO & SCROLLTRIGGER REVEALS
    // ==========================================================================
    if (typeof gsap !== 'undefined') {
        // Hero entrance timeline
        const heroTl = gsap.timeline();
        heroTl.from('.header', { y: -50, opacity: 0, duration: 0.8, ease: 'power3.out' })
              .from('.hero-greeting', { x: -30, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
              .from('.hero-name', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
              .from('.hero-title', { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
              .from('.hero-description', { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
              .from('.hero-ctas .btn', { scale: 0.9, opacity: 0, duration: 0.4, ease: 'power2.out', stagger: 0.15 }, '-=0.2')
              .from('.hero-socials a', { scale: 0.8, opacity: 0, duration: 0.4, ease: 'back.out(1.7)', stagger: 0.1 }, '-=0.2')
              .from('.image-wrapper', { scale: 0.9, opacity: 0, rotation: -2, duration: 0.8, ease: 'power3.out' }, '-=0.6');

        // Scroll reveals for other sections
        gsap.registerPlugin(ScrollTrigger);

        // Add reveal class to sections
        document.querySelectorAll('section').forEach(sec => {
            sec.classList.add('reveal-gsap');
            gsap.from(sec, {
                scrollTrigger: {
                    trigger: sec,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    }

    // Active Navigation Link Highlight on Scroll
    const sections = document.querySelectorAll('section');
    const navObsSettings = {
        rootMargin: '-20% 0px -60% 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}` || (activeId === 'home' && link.getAttribute('href') === '#home')) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObsSettings);

    sections.forEach(sec => {
        sectionObserver.observe(sec);
    });

    // ==========================================================================
    // INTERACTIVE NEURAL NETWORK PARTICLE WEB (CANVAS)
    // ==========================================================================
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    let particleCount = 60;
    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor(x, y, dx, dy, size, color) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            // Check canvas boundaries
            if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                this.dy = -this.dy;
            }

            // Move particle
            this.x += this.dx;
            this.y += this.dy;

            // Mouse Interactive Repulsion
            if (mouse.x !== null && mouse.y !== null) {
                let diffX = this.x - mouse.x;
                let diffY = this.y - mouse.y;
                let distance = Math.sqrt(diffX * diffX + diffY * diffY);

                if (distance < mouse.radius) {
                    let forceDirectionX = diffX / distance;
                    let forceDirectionY = diffY / distance;
                    
                    // Simple friction repulsion
                    let force = (mouse.radius - distance) / mouse.radius;
                    let directionX = forceDirectionX * force * 3;
                    let directionY = forceDirectionY * force * 3;

                    this.x += directionX;
                    this.y += directionY;
                }
            }

            this.draw();
        }
    }

    window.initParticles = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        particles = [];
        
        // Grab theme colors from page style context
        const isLightTheme = document.body.classList.contains('light-theme');
        const particleColor = isLightTheme ? 'rgba(8, 145, 178, 0.25)' : 'rgba(6, 182, 212, 0.25)';
        
        // Responsive density
        if (canvas.width < 768) {
            particleCount = 25;
            mouse.radius = 80;
        } else {
            particleCount = 70;
            mouse.radius = 160;
        }

        for (let i = 0; i < particleCount; i++) {
            let size = Math.random() * 2.5 + 1.5;
            let x = Math.random() * (canvas.width - size * 2) + size;
            let y = Math.random() * (canvas.height - size * 2) + size;
            let dx = (Math.random() - 0.5) * 0.8;
            let dy = (Math.random() - 0.5) * 0.8;

            particles.push(new Particle(x, y, dx, dy, size, particleColor));
        }
    };

    function connectParticles() {
        const isLightTheme = document.body.classList.contains('light-theme');
        const lineColorBase = isLightTheme ? '8, 145, 178' : '6, 182, 212';
        const maxDistance = 120;

        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    // Line opacity drops as distance increases
                    let opacity = (1 - (distance / maxDistance)) * 0.15;
                    ctx.strokeStyle = `rgba(${lineColorBase}, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
        }
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    // Initialize and run
    window.initParticles();
    animateParticles();

    // Redraw particles on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            window.initParticles();
        }, 150);
    });

    // ==========================================================================
    // CONTACT FORM INTERACTIVE LOGIC (WHATSAPP & MAILTO DYNAMIC REDIRECTS)
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const method = document.getElementById('contact-method').value;
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill out all fields.');
                return;
            }

            // Create notification banner
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Creating Chat URL... <i class="fas fa-spinner fa-spin"></i>';

            setTimeout(() => {
                if (method === 'whatsapp') {
                    // Build WhatsApp Text payload
                    const whatsappText = `Hello Bevara Sasi Kumar, \n\nMy name is ${name} (${email}).\n\n${message}`;
                    const encodedText = encodeURIComponent(whatsappText);
                    const whatsappUrl = `https://wa.me/918179396163?text=${encodedText}`;
                    
                    window.open(whatsappUrl, '_blank');
                } else {
                    // Build Mailto payload
                    const mailtoSubject = `Portfolio Connection from ${name}`;
                    const mailtoBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
                    const mailtoUrl = `mailto:bevarasasikumar18@gmail.com?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;
                    
                    window.location.href = mailtoUrl;
                }

                // Show visual confirmation on the page
                submitBtn.innerHTML = 'Sent Successfully! <i class="fas fa-check"></i>';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)'; // Emerald Green
                
                // Reset form
                contactForm.reset();

                // Restore button state after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                    submitBtn.style.background = ''; // Revert to stylesheet variables
                }, 3000);

            }, 1000);
        });
    }
});
