/* =============================================
   Hala Samhan — Portfolio Scripts
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

    /* -----------------------------------------
       Typewriter Effect
       ----------------------------------------- */
    const typewriterEl = document.getElementById('typewriter');
    const phrases = ['Hala Samhan', 'a Frontend Dev', 'a CRM Developer'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typewrite() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400;
        }

        setTimeout(typewrite, typeSpeed);
    }
    typewrite();

    /* -----------------------------------------
       Counter Animation
       ----------------------------------------- */
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    function animateCounters() {
        counters.forEach(function (counter) {
            const target = parseFloat(counter.getAttribute('data-target'));
            const isDecimal = counter.getAttribute('data-decimal') === 'true';
            const duration = 2000;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 4);
                const current = eased * target;

                if (isDecimal) {
                    counter.textContent = current.toFixed(2);
                } else {
                    counter.textContent = Math.floor(current);
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = isDecimal ? target.toFixed(2) : target;
                }
            }

            requestAnimationFrame(update);
        });
    }

    /* -----------------------------------------
       Scroll Reveal
       ----------------------------------------- */
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        const windowHeight = window.innerHeight;

        reveals.forEach(function (el) {
            const top = el.getBoundingClientRect().top;
            if (top < windowHeight - 80) {
                el.classList.add('active');
            }
        });

        // Counter trigger
        if (!countersAnimated) {
            const counterSection = document.querySelector('.counter');
            if (counterSection) {
                const top = counterSection.getBoundingClientRect().top;
                if (top < windowHeight - 50) {
                    countersAnimated = true;
                    animateCounters();
                }
            }
        }
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    /* -----------------------------------------
       Skill Bar Animation
       ----------------------------------------- */
    function animateSkillBars() {
        const bars = document.querySelectorAll('.skill-bar-fill');
        const windowHeight = window.innerHeight;

        bars.forEach(function (bar) {
            const top = bar.getBoundingClientRect().top;
            if (top < windowHeight - 50) {
                const width = bar.getAttribute('data-width');
                if (width) {
                    bar.style.width = width;
                }
            }
        });
    }

    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars();

    /* -----------------------------------------
       Navbar Scroll Effect
       ----------------------------------------- */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* -----------------------------------------
       Mobile Menu Toggle
       ----------------------------------------- */
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    /* -----------------------------------------
       Smooth Scroll for Anchor Links
       ----------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 64;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    /* -----------------------------------------
       Contact Form Handling
       ----------------------------------------- */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = contactForm.querySelector('[name="name"]');
            const email = contactForm.querySelector('[name="email"]');
            const message = contactForm.querySelector('[name="message"]');

            if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
                showToast('Please fill in all fields.', 'warning');
                return;
            }

            if (!isValidEmail(email.value)) {
                showToast('Please enter a valid email address.', 'warning');
                return;
            }

            // Simulate sending
            showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /* -----------------------------------------
       Toast Notification
       ----------------------------------------- */
    function showToast(message, type) {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'toast-item';

        const iconName = type === 'success' ? 'lucide:check-circle' : 'lucide:alert-circle';
        const iconColor = type === 'success' ? '#22c55e' : '#f59e0b';

        toast.innerHTML =
            '<span class="iconify" data-icon="' + iconName + '" data-width="20" style="color:' + iconColor + '; flex-shrink:0;"></span>' +
            '<span style="font-size:14px; font-weight:600; color:#1e1b4b;">' + message + '</span>';

        container.appendChild(toast);

        // Re-scan for new Iconify icons
        if (window.Iconify) {
            window.Iconify.scan(toast);
        }

        // Trigger animation
        requestAnimationFrame(function () {
            toast.classList.add('show');
        });

        // Auto-remove
        setTimeout(function () {
            toast.classList.remove('show');
            setTimeout(function () {
                toast.remove();
            }, 400);
        }, 4000);
    }

    /* -----------------------------------------
       Active Nav Link Highlight
       ----------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = '#7e22ce';
            }
        });
    });

});