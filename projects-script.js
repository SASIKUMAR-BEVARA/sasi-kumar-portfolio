/**
 * Projects Hub Script
 * Interactive logic, dynamic GSAP filter grid animations, and cursor physics.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // THEME SWITCHER
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
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

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
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

    function updateCursorPhysics() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        if (cursor) {
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
        }

        dotX += (mouseX - dotX) * 0.35;
        dotY += (mouseY - dotY) * 0.35;
        if (cursorDot) {
            cursorDot.style.left = `${dotX}px`;
            cursorDot.style.top = `${dotY}px`;
        }

        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        if (glowBlob) {
            glowBlob.style.left = `${glowX}px`;
            glowBlob.style.top = `${glowY}px`;
        }

        requestAnimationFrame(updateCursorPhysics);
    }
    updateCursorPhysics();

    function updateCursorHoverEvents() {
        const clickables = document.querySelectorAll('a, button, .tab-btn, .project-card, .voting-btn, .menu-item-add, .qty-btn');
        clickables.forEach(item => {
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

    if (transitionOverlay) {
        gsap.set(transitionOverlay, { y: '0%' });
        
        const tl = gsap.timeline();
        tl.to(transitionLogo, { opacity: 1, y: 0, duration: 0.4, delay: 0.2 })
          .to(transitionOverlay, {
              y: '-100%',
              duration: 0.6,
              ease: 'power3.inOut',
              onComplete: () => {
                  gsap.set(transitionOverlay, { y: '100%' });
                  gsap.set(transitionLogo, { opacity: 0, y: 20 });
              }
          });
    }

    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href || 
            href.startsWith('#') || 
            href.startsWith('mailto:') || 
            href.startsWith('tel:') || 
            href.startsWith('https://wa.me') || 
            link.getAttribute('target') === '_blank') {
            return;
        }

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
    // GSAP ENTRANCE & FILTER GRID ANIMATIONS
    // ==========================================================================
    if (typeof gsap !== 'undefined') {
        // Entrance Timeline
        const projectsTl = gsap.timeline();
        projectsTl.from('.case-study-hero .section-subtitle', { y: -20, opacity: 0, duration: 0.5, ease: 'power2.out' })
                  .from('.case-study-hero h1', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
                  .from('.case-study-hero p', { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
                  .from('.skills-tabs', { scale: 0.95, opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
                  .from('.project-card', { y: 40, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.15 }, '-=0.1');

        // Dynamic Filtering Animation
        const filterBtns = document.querySelectorAll('.skills-tabs .tab-btn');
        const projectCards = document.querySelectorAll('#projects-hub-grid .project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Toggle active button class
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.dataset.filter;

                // Animate filter grid transition
                gsap.to(projectCards, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                    stagger: 0.05,
                    onComplete: () => {
                        projectCards.forEach(card => {
                            const cat = card.dataset.cat;
                            if (filterValue === 'all' || cat === filterValue) {
                                card.classList.remove('category-hidden');
                            } else {
                                card.classList.add('category-hidden');
                            }
                        });

                        // Filtered entrance animations
                        const activeCards = document.querySelectorAll('#projects-hub-grid .project-card:not(.category-hidden)');
                        gsap.fromTo(activeCards, 
                            { scale: 0.8, opacity: 0 }, 
                            { 
                                scale: 1, 
                                opacity: 1, 
                                duration: 0.4, 
                                ease: 'power2.out',
                                stagger: 0.08 
                            }
                        );
                        
                        // Recalculate ScrollTrigger positions
                        if (window.ScrollTrigger) {
                            ScrollTrigger.refresh();
                        }
                    }
                });
            });
        });
    }

    // ==========================================================================
    // INTERACTIVE NEURAL NETWORK PARTICLE WEB (CANVAS)
    // ==========================================================================
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    let particleCount = 60;
    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
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
            if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            if (mouse.x !== null && mouse.y !== null) {
                let diffX = this.x - mouse.x;
                let diffY = this.y - mouse.y;
                let distance = Math.sqrt(diffX * diffX + diffY * diffY);

                if (distance < mouse.radius) {
                    let forceDirectionX = diffX / distance;
                    let forceDirectionY = diffY / distance;
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
        const isLightTheme = document.body.classList.contains('light-theme');
        const particleColor = isLightTheme ? 'rgba(8, 145, 178, 0.25)' : 'rgba(6, 182, 212, 0.25)';
        
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

    window.initParticles();
    animateParticles();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            window.initParticles();
        }, 150);
    });
});
