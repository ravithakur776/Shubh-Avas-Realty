/* ===================================================
   Shubh Avas Realty - Cinematic Scroll & GSAP Engine
   High-performance 60FPS Canvas Blending & Creative Developer Logic
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements - Hero (DO NOT MODIFY OR REMOVE)
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    const header = document.getElementById('site-header');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroSection = document.querySelector('.hero-scroll-container');
    const scrollTrack = document.querySelector('.scroll-track');

    // Loader Elements
    const loader = document.getElementById('loader');
    const loaderBar = document.getElementById('loader-bar');
    const loaderText = document.getElementById('loader-text');

    // Animateable elements
    const heroLabel = document.querySelector('.hero-label');
    const heroSubheading = document.querySelector('.hero-subheading');
    const heroTitleWords = document.querySelectorAll('.word-anim');
    const heroCtas = document.querySelector('.hero-ctas');

    // State Variables
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let maxScroll = windowHeight * 3;
    let lastDrawnFrame = -1;
    let lenis;
    let heroScrollTrigger;

    // Image Sequence Configuration
    const totalFrames = 300;
    const images = [];
    let loadedCount = 0;
    let isFullyLoaded = false;

    // Set Canvas Dimensions
    function resizeCanvas() {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Skip canvas resizing on mobile if width did not change (e.g. mobile address bar toggles)
        if (isMobile && newWidth === windowWidth) {
            return;
        }

        windowWidth = newWidth;
        windowHeight = newHeight;
        maxScroll = windowHeight * 3; // Recalculate scroll boundaries

        // High DPI Display Support
        const dpr = window.devicePixelRatio || 1;
        canvas.width = windowWidth * dpr;
        canvas.height = windowHeight * dpr;
        ctx.scale(dpr, dpr);

        canvas.style.width = windowWidth + 'px';
        canvas.style.height = windowHeight + 'px';

        // Force a redraw on resize using current scroll position to prevent reset to frame 0
        lastDrawnFrame = -1;
        if (heroScrollTrigger) {
            renderSequenceFromProgress(heroScrollTrigger.progress);
        } else {
            renderSequence(window.scrollY);
        }
    }

    // Preload all 300 images
    function preloadImageSequence() {
        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            const frameNum = String(i).padStart(3, '0');
            img.src = `luxury villa images/ezgif-frame-${frameNum}.jpg`;

            img.onload = () => {
                loadedCount++;
                const percentage = Math.floor((loadedCount / totalFrames) * 100);

                // Update loader progress UI
                loaderBar.style.width = `${percentage}%`;
                loaderText.textContent = `Loading Experience ${percentage}%`;

                // Render the first frame as soon as it's ready for instant LCP
                if (i === 1) {
                    renderCanvasFrame();
                }

                if (loadedCount === totalFrames) {
                    onPreloadComplete();
                }
            };

            img.onerror = () => {
                // If a frame fails to load, count it anyway to not break loader
                loadedCount++;
                if (loadedCount === totalFrames) {
                    onPreloadComplete();
                }
            };

            images.push(img);
        }
    }

    function onPreloadComplete() {
        isFullyLoaded = true;

        // Let the loading screen stay for 400ms for a premium visual flow
        setTimeout(() => {
            loader.classList.add('fade-out');
            initialize();
        }, 400);
    }

    // Scroll tracking for header transition
    let navScrolled = false;
    window.addEventListener('scroll', () => {
        const sy = window.scrollY;
        if (sy > 50 && !navScrolled) {
            header.classList.add('scrolled');
            navScrolled = true;
        } else if (sy <= 50 && navScrolled) {
            header.classList.remove('scrolled');
            navScrolled = false;
        }
    }, { passive: true });

    function initialize() {
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        // Initialize Advanced Creative Scroll & GSAP plugins
        initCreativeDeveloperCode();
        
        // Initial render based on starting scroll position
        renderSequence(window.scrollY);
    }

    // Render Sequence Frame & Animate Text from progress (0 to 1)
    function renderSequenceFromProgress(progress) {
        // 1. Draw current frame corresponding to scroll progress
        const targetFrameIndex = Math.min(
            Math.max(Math.floor(progress * (totalFrames - 1)), 0),
            totalFrames - 1
        );

        if (targetFrameIndex !== lastDrawnFrame) {
            drawFrameOnCanvas(targetFrameIndex);
            lastDrawnFrame = targetFrameIndex;
        }

        // 2. Animate Overlay Text
        animateText(progress);
    }

    // Render Sequence Frame & Animate Text from scroll Y position
    function renderSequence(scrollY) {
        const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
        renderSequenceFromProgress(progress);
    }

    // Find nearest loaded image if targeted frame is still loading (prevents blank canvas)
    function getNearestLoadedImage(index) {
        if (images[index] && images[index].complete && images[index].naturalWidth !== 0) {
            return images[index];
        }

        // Search neighbors outwards
        let dist = 1;
        while (dist < totalFrames) {
            const prev = index - dist;
            const next = index + dist;

            if (prev >= 0 && images[prev] && images[prev].complete && images[prev].naturalWidth !== 0) {
                return images[prev];
            }
            if (next < totalFrames && images[next] && images[next].complete && images[next].naturalWidth !== 0) {
                return images[next];
            }
            dist++;
        }
        return null;
    }

    function drawFrameOnCanvas(frameIndex) {
        const img = getNearestLoadedImage(frameIndex);
        if (!img) return;

        // Aspect-ratio cover math for scaling & centering
        const imgWidth = img.naturalWidth || 1920;
        const imgHeight = img.naturalHeight || 1080;
        const imgRatio = imgWidth / imgHeight;
        const canvasRatio = windowWidth / windowHeight;

        let drawWidth, drawHeight;
        if (canvasRatio > imgRatio) {
            drawWidth = windowWidth;
            drawHeight = windowWidth / imgRatio;
        } else {
            drawWidth = windowHeight * imgRatio;
            drawHeight = windowHeight;
        }

        ctx.save();
        // Center drawing coordinates
        ctx.translate(windowWidth / 2, windowHeight / 2);
        ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
        ctx.restore();
    }

    // Fallback/Force initial render
    function renderCanvasFrame() {
        drawFrameOnCanvas(0);
    }

    // Staggered Progressive Character / Word Reveal Mechanics
    function animateText(progress) {
        // 1. Scroll Indicator Fades Out quickly
        if (progress > 0.05) {
            scrollIndicator.classList.add('fade-out');
        } else {
            scrollIndicator.classList.remove('fade-out');
        }

        // 2. Text Reveal (Scroll 0% to 10%)
        // Hold/Static state (Scroll 10% to 25%)
        // Text Fade Out (Scroll 25% to 40%)
        let opacity = 0;
        let translateY = 30; // Max start offset in pixels
        let ctasScale = 0.8;

        if (progress <= 0.10) {
            // Fade-in Phase (Map 0.0-0.10 scroll to 0.0-1.0 progress scale)
            const stageProg = progress / 0.10;

            opacity = stageProg;
            translateY = 30 * (1.0 - stageProg);

            // Stagger title words progressive reveal
            heroTitleWords.forEach((word, index) => {
                const wordDelay = index * 0.12;
                const wordProg = Math.min(Math.max((stageProg - wordDelay) / (1.0 - wordDelay), 0), 1);

                // Elastic/smooth ease-out for words
                const easedWordProg = 1.0 - Math.pow(1.0 - wordProg, 3);
                word.style.transform = `translateY(${30 * (1.0 - easedWordProg)}px)`;
                word.style.opacity = easedWordProg;
            });

            // Spring scale-in for CTA buttons
            const btnProg = Math.min(Math.max((stageProg - 0.45) / 0.55, 0), 1);
            if (btnProg > 0) {
                // Spring overshoot damping equation
                const spring = Math.sin(btnProg * Math.PI * 1.25) * 0.1 + btnProg;
                ctasScale = 0.8 + spring * 0.2;
                heroCtas.style.opacity = btnProg;
            } else {
                heroCtas.style.opacity = 0;
            }

            // Animate label and subheading
            const subEased = 1.0 - Math.pow(1.0 - stageProg, 3);
            heroLabel.style.opacity = subEased;
            heroLabel.style.transform = `translateY(${30 * (1.0 - subEased)}px)`;

            heroSubheading.style.opacity = subEased;
            heroSubheading.style.transform = `translateY(${30 * (1.0 - subEased)}px)`;

            heroCtas.style.transform = `scale(${ctasScale})`;

        } else if (progress > 0.10 && progress <= 0.25) {
            // Hold Phase - All items fully static at maximum values
            opacity = 1.0;
            translateY = 0;

            heroLabel.style.opacity = 1;
            heroLabel.style.transform = 'translateY(0px)';

            heroTitleWords.forEach(word => {
                word.style.opacity = 1;
                word.style.transform = 'translateY(0px)';
            });

            heroSubheading.style.opacity = 1;
            heroSubheading.style.transform = 'translateY(0px)';

            heroCtas.style.opacity = 1;
            heroCtas.style.transform = 'scale(1)';

        } else if (progress > 0.25 && progress <= 0.40) {
            // Fade-out Phase (Map 0.25-0.40 scroll to 1.0-0.0 opacity scale)
            const stageProg = (progress - 0.25) / 0.15;
            opacity = 1.0 - stageProg;
            translateY = -30 * stageProg; // Slide upward on fade out

            const fadeValue = Math.max(0, 1.0 - stageProg);

            heroLabel.style.opacity = fadeValue;
            heroLabel.style.transform = `translateY(${translateY}px)`;

            heroTitleWords.forEach(word => {
                word.style.opacity = fadeValue;
                word.style.transform = `translateY(${translateY}px)`;
            });

            heroSubheading.style.opacity = fadeValue;
            heroSubheading.style.transform = `translateY(${translateY}px)`;

            heroCtas.style.opacity = fadeValue;
            heroCtas.style.transform = `scale(${1.0 - stageProg * 0.1}) translateY(${translateY}px)`;

        } else {
            // Beyond 40% - completely hidden
            heroLabel.style.opacity = 0;
            heroSubheading.style.opacity = 0;
            heroCtas.style.opacity = 0;
            heroTitleWords.forEach(word => {
                word.style.opacity = 0;
            });
        }
    }

    // ========================================================
    // CREATIVE DEVELOPER SCROLLING, GSAP & INTERACTIVE CORE
    // ========================================================
    function initCreativeDeveloperCode() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // 1. Initialize Lenis Smooth Scroll
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            infinite: false
        });

        // Synchronize Lenis scroll positions with ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Create ScrollTrigger for hero section pinning & animation
        heroScrollTrigger = ScrollTrigger.create({
            trigger: '.hero-scroll-container',
            start: 'top top',
            end: 'bottom bottom',
            pin: '.sticky-viewport',
            pinSpacing: false,
            scrub: true,
            onUpdate: (self) => {
                if (isFullyLoaded) {
                    renderSequenceFromProgress(self.progress);
                }
            }
        });

        // Native RAF loop for Lenis ticks to ensure correct delta matching
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Close mobile menu helper function
        function closeMobileMenu() {
            const mobileMenu = document.getElementById('mobile-menu');
            const hamburgerBtn = document.getElementById('hamburger-btn');
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                if (hamburgerBtn) {
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                    hamburgerBtn.classList.remove('open');
                }
                lenis.start();
            }
        }

        // Link navbar anchor click scrolling to Lenis
        document.querySelectorAll('.site-header a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                // Ensure mobile menu is closed and Lenis is started BEFORE scrolling
                closeMobileMenu();

                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    lenis.scrollTo(targetEl, {
                        offset: targetId === '#contact' ? 0 : -80,
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });
                }
            });
        });

        // 2. Custom Cursor Tracking Glow
        const customCursor = document.getElementById('custom-cursor');
        window.addEventListener('mousemove', (e) => {
            gsap.to(customCursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        // 3. Navigation Link Highlight States via ScrollTrigger
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = ['about', 'services', 'featured', 'process', 'contact'];

        sections.forEach(secId => {
            const sec = document.getElementById(secId === 'featured' ? 'featured' : (secId === 'process' ? 'process' : secId));
            if (sec) {
                ScrollTrigger.create({
                    trigger: sec,
                    start: 'top center',
                    end: 'bottom center',
                    onEnter: () => updateNavActiveState(secId),
                    onEnterBack: () => updateNavActiveState(secId)
                });
            }
        });

        function updateNavActiveState(activeId) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${activeId}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }

        // 4. SplitType Word Reveal Animation (Atelier Intro Title)
        if (typeof SplitType !== 'undefined') {
            const splitHeadline = new SplitType('#intro-headline', { types: 'words' });
            gsap.from(splitHeadline.words, {
                opacity: 0,
                y: 35,
                stagger: 0.06,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '#intro-headline',
                    start: 'top 80%'
                }
            });
        }

        // 5. GSAP Image Mask Reveal (Section 2)
        gsap.fromTo('.image-mask-inner', {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            scale: 1.25
        }, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            scale: 1,
            duration: 1.8,
            ease: 'power4.inOut',
            scrollTrigger: {
                trigger: '.image-reveal-mask',
                start: 'top 80%'
            }
        });

        // 6. Generic Scroll reveals for clean section entrances
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            gsap.from(el, {
                opacity: 0,
                y: 40,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                }
            });
        });

        // 7. Dynamic Parallax Scrolling Elements
        document.querySelectorAll('[data-speed]').forEach(el => {
            const speed = parseFloat(el.dataset.speed);
            gsap.to(el.querySelector('img') || el, {
                yPercent: speed * 100,
                ease: 'none',
                scrollTrigger: {
                    trigger: el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });

        // 8. Service Cards Hover Track Glows & Tilt Initializer
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });

        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(document.querySelectorAll('.service-card'), {
                max: 5,
                speed: 400,
                glare: true,
                "max-glare": 0.15
            });
        }

        // MatchMedia for Desktop layouts (min-width: 992px)
        const mm = gsap.matchMedia();

        mm.add("(min-width: 992px)", () => {
            // 9. Horizontal Scrolling (Featured Properties)
            const track = document.getElementById('horizontal-track');
            if (track) {
                gsap.to(track, {
                    x: () => -(track.scrollWidth - window.innerWidth),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '#featured',
                        pin: true,
                        scrub: 1,
                        start: 'top top',
                        end: () => `+=${track.scrollWidth - window.innerWidth}`,
                        invalidateOnRefresh: true
                    }
                });
            }

            // 10. Apple Style Sticky Storytelling (Why Choose Us)
            const storyTrackFill = document.getElementById('story-timeline-fill');
            const timelineSteps = document.querySelectorAll('.timeline-step');
            const storyCards = document.querySelectorAll('.story-card');

            ScrollTrigger.create({
                trigger: '#choose-us',
                start: 'top top',
                end: '+=150%',
                pin: true,
                scrub: true,
                onUpdate: (self) => {
                    const prog = self.progress;

                    // Animate vertical indicator fill
                    if (storyTrackFill) {
                        storyTrackFill.style.height = `${prog * 100}%`;
                    }

                    // Determine current step index based on progress subdivisions
                    let activeStep = 1;
                    if (prog > 0.35 && prog <= 0.70) {
                        activeStep = 2;
                    } else if (prog > 0.70) {
                        activeStep = 3;
                    }

                    // Stagger timeline numbers check
                    timelineSteps.forEach(step => {
                        const stepNum = parseInt(step.dataset.step);
                        if (stepNum <= activeStep) {
                            step.classList.add('active');
                        } else {
                            step.classList.remove('active');
                        }
                    });

                    // Toggle card cards
                    storyCards.forEach((card, index) => {
                        if (index + 1 === activeStep) {
                            card.classList.add('active');
                        } else {
                            card.classList.remove('active');
                        }
                    });

                    // Smooth background color transition
                    const bgColors = {
                        1: '#050811', // Deep Obsidian Navy
                        2: '#160813', // Rich Velvet Plum
                        3: '#0c1511'  // Sacred Forest Green
                    };
                    gsap.to('#choose-us', {
                        backgroundColor: bgColors[activeStep],
                        duration: 0.8,
                        overwrite: 'auto'
                    });
                },
                onLeave: () => {
                    gsap.to('#choose-us', { backgroundColor: '#090E1A', duration: 0.8 });
                },
                onLeaveBack: () => {
                    gsap.to('#choose-us', { backgroundColor: '#090E1A', duration: 0.8 });
                }
            });
        });

        // MatchMedia for Mobile/Tablet layouts (max-width: 991px)
        mm.add("(max-width: 991px)", () => {
            const storyCards = document.querySelectorAll('.story-card');
            const bgColors = ['#050811', '#160813', '#0c1511'];
            
            storyCards.forEach((card, index) => {
                ScrollTrigger.create({
                    trigger: card,
                    start: 'top center+=15%',
                    end: 'bottom center+=15%',
                    onEnter: () => {
                        gsap.to('#choose-us', {
                            backgroundColor: bgColors[index],
                            duration: 0.8,
                            overwrite: 'auto'
                        });
                    },
                    onEnterBack: () => {
                        gsap.to('#choose-us', {
                            backgroundColor: bgColors[index],
                            duration: 0.8,
                            overwrite: 'auto'
                        });
                    }
                });
            });

            // Reset background when leaving section on mobile
            ScrollTrigger.create({
                trigger: '#choose-us',
                start: 'top bottom',
                end: 'bottom top',
                onLeave: () => {
                    gsap.to('#choose-us', { backgroundColor: '#090E1A', duration: 0.8 });
                },
                onLeaveBack: () => {
                    gsap.to('#choose-us', { backgroundColor: '#090E1A', duration: 0.8 });
                }
            });
        });

        // 11. Acquisition Journey Dynamic Timeline Draw (SVG drawing)
        const timelinePath = document.getElementById('timeline-path');
        if (timelinePath) {
            // Set SVG stroke boundaries
            timelinePath.style.strokeDasharray = '100';
            timelinePath.style.strokeDashoffset = '100';

            gsap.to(timelinePath, {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.timeline-wrapper',
                    start: 'top center',
                    end: 'bottom center',
                    scrub: true
                }
            });
        }

        // 12. Dynamic Number Counter Animators
        document.querySelectorAll('[data-target]').forEach(counter => {
            const target = parseInt(counter.dataset.target);
            gsap.fromTo(counter, {
                textContent: 0
            }, {
                textContent: target,
                duration: 2.2,
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            });
        });

        // 13. Swiper Testimonials Carousel
        if (typeof Swiper !== 'undefined') {
            new Swiper('.testimonials-slider', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                speed: 1000
            });
        }

        // 14. Gallery Filtering and Lightbox
        const filterBtns = document.querySelectorAll('.filter-btn');
        const masonryItems = document.querySelectorAll('.masonry-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const activeBtn = document.querySelector('.filter-btn.active');
                if (activeBtn) activeBtn.classList.remove('active');
                btn.classList.add('active');

                const filterValue = btn.dataset.filter;

                // Kill ongoing gallery animations to prevent conflict jumps
                gsap.killTweensOf(masonryItems);

                gsap.to(masonryItems, {
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.3,
                    onComplete: () => {
                        masonryItems.forEach(item => {
                            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                                item.style.display = 'inline-block';
                                gsap.to(item, { opacity: 1, scale: 1, duration: 0.4 });
                            } else {
                                item.style.display = 'none';
                            }
                        });
                        // Recalculate ScrollTrigger parameters on layout alteration
                        ScrollTrigger.refresh();
                    }
                });
            });
        });

        // Global Lightbox Actions
        window.openLightbox = function (item) {
            const img = item.querySelector('img');
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const caption = document.getElementById('lightbox-caption');

            lightboxImg.src = img.src;
            caption.textContent = img.alt;
            lightbox.classList.add('open');
            lenis.stop(); // Stop scroll when lightbox is active
        }

        window.closeLightbox = function () {
            document.getElementById('lightbox').classList.remove('open');
            lenis.start(); // Resume scroll
        }

        // 15. FAQ Accordion Open/Close
        const faqTriggers = document.querySelectorAll('.faq-trigger');
        faqTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

                // Close other panels
                faqTriggers.forEach(other => {
                    if (other !== trigger) {
                        other.setAttribute('aria-expanded', 'false');
                        other.nextElementSibling.style.maxHeight = null;
                    }
                });

                // Toggle current trigger
                trigger.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');
                const content = trigger.nextElementSibling;
                if (!isExpanded) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = null;
                }

                // Refresh trigger boundaries
                setTimeout(() => ScrollTrigger.refresh(), 400);
            });
        });

        // 16. Fullscreen Mobile Navigation Trigger
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if (hamburgerBtn && mobileMenu) {
            hamburgerBtn.addEventListener('click', () => {
                const open = mobileMenu.classList.toggle('open');
                hamburgerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
                hamburgerBtn.classList.toggle('open', open);
                if (open) {
                    lenis.stop();
                } else {
                    lenis.start();
                }
            });

            // Close mobile menu on overlay click
            mobileMenu.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                hamburgerBtn.classList.remove('open');
                lenis.start();
            });
        }

        // 17. Contact Form Validations & Submissions Success
        const contactForm = document.getElementById('contact-form');
        const successOverlay = document.getElementById('success-overlay');

        if (contactForm && successOverlay) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // Luxury fade-in transition for the checkmark overlay
                gsap.to(successOverlay, {
                    autoAlpha: 1,
                    display: 'flex',
                    duration: 0.6,
                    ease: 'power3.out',
                    onStart: () => {
                        successOverlay.classList.add('show');
                    }
                });
            });
        }

        // 18. Magnetic Submit Button Interactive Physic
        const magneticBtns = document.querySelectorAll('.magnetic-btn, .btn-submit-luxury');
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                // Physics calculation offset from button center
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(btn, {
                    x: x * 0.35,
                    y: y * 0.35,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.3)'
                });
            });
        });
    }

    // Start preloading images sequence
    preloadImageSequence();
});
