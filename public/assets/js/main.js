// SPDX-FileCopyrightText: 2025 Basingstoke Repair Network
// SPDX-License-Identifier: MIT

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');

            // Update ARIA attribute for accessibility
            const isExpanded = !mobileMenu.classList.contains('hidden');
            mobileMenuButton.setAttribute('aria-expanded', isExpanded);

            // Toggle icon
            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                if (isExpanded) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
                const icon = mobileMenuButton.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Initialize Swiper Hero Carousel
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
        keyboard: {
            enabled: true,
        },
        a11y: {
            enabled: true,
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Header shadow on scroll
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }

        lastScroll = currentScroll;
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add animation on scroll for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply fade-in animation to sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(section);
    });

    // External link handling
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // Form validation (if forms are added later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                } else {
                    field.classList.remove('border-red-500');
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // Print functionality
    const printButton = document.getElementById('print-button');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }

    // Add current year to copyright
    const currentYearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    currentYearElements.forEach(element => {
        element.textContent = currentYear;
    });

    // Accessibility: Skip to main content
    const skipLink = document.querySelector('a[href="#main-content"]');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const mainContent = document.getElementById('main-content') || document.querySelector('main');
            if (mainContent) {
                mainContent.setAttribute('tabindex', '-1');
                mainContent.focus();
                mainContent.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Image Lightbox Functionality
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxBackdrop = lightbox.querySelector('.lightbox-backdrop');

    // Function to open lightbox
    function openLightbox(imageSrc, imageAlt) {
        lightboxImage.src = imageSrc;
        lightboxImage.alt = imageAlt;
        lightbox.classList.remove('hidden');
        // Use setTimeout to ensure the display change happens before opacity change
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    }

    // Function to close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightboxImage.src = '';
            lightboxImage.alt = '';
            document.body.style.overflow = '';
        }, 300);
    }

    // Add click listeners to team photos (clickable-image class)
    document.querySelectorAll('.clickable-image').forEach(img => {
        // Make images keyboard accessible
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');

        // Click handler
        img.addEventListener('click', function() {
            const src = this.src;
            const alt = this.alt;
            openLightbox(src, alt);
        });

        // Keyboard handler (Enter and Space keys)
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const src = this.src;
                const alt = this.alt;
                openLightbox(src, alt);
            }
        });
    });

    // Add click listeners to hero images (background images on hero-slide)
    document.querySelectorAll('.hero-slide').forEach(slide => {
        // Extract background image URL from inline style
        const style = slide.getAttribute('style') || '';
        const urlMatch = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);

        if (urlMatch && urlMatch[1]) {
            const imageUrl = urlMatch[1];

            // Add magnify icon overlay
            const magnifyIcon = document.createElement('div');
            magnifyIcon.className = 'hero-magnify-icon';
            magnifyIcon.innerHTML = '<i class="fas fa-search-plus"></i>';
            magnifyIcon.setAttribute('tabindex', '0');
            magnifyIcon.setAttribute('role', 'button');
            magnifyIcon.setAttribute('aria-label', 'View image full size');
            slide.style.position = 'relative';
            slide.appendChild(magnifyIcon);

            // Click handler for magnify icon
            magnifyIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                openLightbox(imageUrl, 'Hero image');
            });

            // Keyboard handler for magnify icon
            magnifyIcon.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(imageUrl, 'Hero image');
                }
            });
        }
    });

    // Close lightbox on close button click
    lightboxClose.addEventListener('click', closeLightbox);

    // Close lightbox on backdrop click
    lightboxBackdrop.addEventListener('click', closeLightbox);

    // Close lightbox on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Console welcome message
    console.log('%c🔧 Welcome to Basingstoke Repair Network! 🔧', 'color: #28276f; font-size: 16px; font-weight: bold;');
    console.log('%cInterested in contributing? Contact us at info@chinehamrepair.org.uk', 'color: #02011A; font-size: 12px;');
});

// Service Worker Registration (for PWA - optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(err => console.log('SW registration failed:', err));
    });
}
