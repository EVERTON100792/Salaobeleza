// Belleza Studio - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeScrollEffects();
    initializeGalleryFilters();
    initializeForms();
    initializeModal();
    setMinDate();
    initializeAdvancedAnimations();
    initializeProgressBar();
    initializeParticles();
    initializeLoadingScreen();
    initializeIntersectionObserver();
});

// Navigation Functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-category, .gallery-item, .team-member, .value-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Gallery Filters
function initializeGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Form Handling
function initializeForms() {
    const contactForm = document.getElementById('contactForm');
    const appointmentForm = document.getElementById('appointmentForm');

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleAppointmentForm);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div> Enviando...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showMessage('Solicitação enviada com sucesso! Entraremos em contato em breve.', 'success');
        e.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleAppointmentForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div> Agendando...';
    submitBtn.disabled = true;
    
    // Simulate appointment booking
    setTimeout(() => {
        showMessage('Agendamento realizado com sucesso! Você receberá uma confirmação em breve.', 'success');
        e.target.reset();
        closeAppointmentModal();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function validateForm(data) {
    const requiredFields = ['name', 'phone', 'email'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showMessage(`Por favor, preencha o campo ${getFieldLabel(field)}.`, 'error');
            return false;
        }
    }
    
    // Validate email
    if (!isValidEmail(data.email)) {
        showMessage('Por favor, insira um e-mail válido.', 'error');
        return false;
    }
    
    // Validate phone
    if (!isValidPhone(data.phone)) {
        showMessage('Por favor, insira um telefone válido.', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\(\)\s\-\+\d]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function getFieldLabel(field) {
    const labels = {
        'name': 'Nome',
        'phone': 'Telefone',
        'email': 'E-mail',
        'service': 'Serviço',
        'date': 'Data',
        'time': 'Horário'
    };
    return labels[field] || field;
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Find the form container
    const activeForm = document.querySelector('#appointmentModal.modal[style*="block"]') 
        ? document.querySelector('#appointmentForm') 
        : document.querySelector('#contactForm');
    
    if (activeForm) {
        activeForm.insertBefore(messageDiv, activeForm.firstChild);
        
        // Auto remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Modal Functionality
function initializeModal() {
    const modal = document.getElementById('appointmentModal');
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeAppointmentModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeAppointmentModal();
        }
    });
}

function openAppointmentModal() {
    const modal = document.getElementById('appointmentModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus first input
    setTimeout(() => {
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
    }, 100);
}

function closeAppointmentModal() {
    const modal = document.getElementById('appointmentModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Clear any messages
    const messages = modal.querySelectorAll('.message');
    messages.forEach(msg => msg.remove());
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function openWhatsApp() {
    const phoneNumber = '5511999999999'; // Replace with actual WhatsApp number
    const message = encodeURIComponent('Olá! Gostaria de agendar um horário no Belleza Studio.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

function setMinDate() {
    // Set minimum date for appointment forms to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.setAttribute('min', minDate);
    });
}

// Phone number formatting
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length >= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 6) {
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length >= 2) {
        value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }
    
    input.value = value;
}

// Add phone formatting to phone inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    });
});

// Smooth scrolling for all internal links
document.addEventListener('DOMContentLoaded', function() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Ensure WhatsApp button is visible
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        whatsappBtn.style.display = 'flex';
        whatsappBtn.style.visibility = 'visible';
        whatsappBtn.style.opacity = '1';
    }
});

// Performance optimizations
window.addEventListener('load', function() {
    // Remove loading class from body if it exists
    document.body.classList.remove('loading');
    
    // Initialize any deferred functionality
    console.log('Belleza Studio website loaded successfully');
});

// Error handling for missing elements
function safeQuerySelector(selector, callback) {
    const element = document.querySelector(selector);
    if (element && typeof callback === 'function') {
        callback(element);
    }
}

// Accessible navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('click', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Service worker registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('ServiceWorker registration successful');
        //     })
        //     .catch(function(err) {
        //         console.log('ServiceWorker registration failed');
        //     });
    });
}

// Advanced Animations and Visual Effects Functions

// Loading Screen with Animation
function initializeLoadingScreen() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
    `;
    document.body.appendChild(loadingOverlay);
    
    // Hide loading screen after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    });
}

// Scroll Progress Bar
function initializeProgressBar() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Particle Background Effect
function initializeParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    hero.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 15; i++) {
        createParticle(particlesContainer);
    }
    
    // Continuously create particles
    setInterval(() => {
        if (particlesContainer.children.length < 15) {
            createParticle(particlesContainer);
        }
    }, 2000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position and animation duration
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 12000);
}

// Advanced Scroll Animations with Intersection Observer
function initializeIntersectionObserver() {
    if (!window.IntersectionObserver) return;
    
    // Create observers for different animation types
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '-50px' });
    
    // Observe elements with reveal animations
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    // Counter animation observer
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe counter elements
    const counterElements = document.querySelectorAll('.counter');
    counterElements.forEach(el => {
        counterObserver.observe(el);
    });
}

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target') || element.textContent);
    const duration = 2000; // 2 seconds
    const start = performance.now();
    const startValue = 0;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(startValue + (target - startValue) * easeOutQuart);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Advanced Animation Initialization
function initializeAdvancedAnimations() {
    // Add typing animation to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.classList.add('typing-animation');
    }
    
    // Add stagger animations to service cards
    const serviceCards = document.querySelectorAll('.service-category');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.2) + 's';
    });
    
    // Add hover effects to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Enhanced form animations
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', function() {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!input.value) {
                    group.classList.remove('focused');
                }
            });
        }
    });
}

// Parallax Scrolling Effect
function initializeParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Enhanced Button Interactions
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
    });
}

// Smooth Page Transitions
function initializePageTransitions() {
    // Add fade-in animation to main content
    const mainContent = document.querySelector('main') || document.body;
    mainContent.style.opacity = '0';
    mainContent.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 100);
    });
}

// Advanced WhatsApp Button Animation
function enhanceWhatsAppButton() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (!whatsappBtn) return;
    
    // Add pulse animation on scroll
    let isVisible = false;
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        if (scrollY > 300 && !isVisible) {
            whatsappBtn.style.transform = 'scale(1)';
            whatsappBtn.style.opacity = '1';
            isVisible = true;
        } else if (scrollY <= 300 && isVisible) {
            whatsappBtn.style.transform = 'scale(0)';
            whatsappBtn.style.opacity = '0';
            isVisible = false;
        }
    });
    
    // Add click ripple effect
    whatsappBtn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Image Effects without Blur
function initializeImageEffects() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        
        // Remove any blur filter that might be applied
        img.style.filter = 'none';
        img.style.opacity = '1';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.filter = 'none';
        });
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
            img.style.filter = 'none';
        }
    });
}

// Initialize all advanced features
document.addEventListener('DOMContentLoaded', function() {
    initializeParallaxEffect();
    initializeButtonEffects();
    initializePageTransitions();
    enhanceWhatsAppButton();
    initializeImageEffects();
});

// Keyboard Navigation Enhancement
document.addEventListener('keydown', function(e) {
    // Enhanced keyboard navigation
    if (e.altKey && e.key === 'h') {
        // Alt + H: Go to hero section
        scrollToSection('hero');
    } else if (e.altKey && e.key === 's') {
        // Alt + S: Go to services section
        scrollToSection('services');
    } else if (e.altKey && e.key === 'g') {
        // Alt + G: Go to gallery section
        scrollToSection('gallery');
    } else if (e.altKey && e.key === 'c') {
        // Alt + C: Go to contact section
        scrollToSection('contact');
    }
});

// Performance Monitoring
function initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        setTimeout(() => {
            const navigationTiming = performance.getEntriesByType('navigation')[0];
            const loadTime = navigationTiming.loadEventEnd - navigationTiming.loadEventStart;
            
            if (loadTime > 3000) {
                console.warn('Page load time is slow:', loadTime + 'ms');
            }
        }, 0);
    });
}

// Initialize performance monitoring
initializePerformanceMonitoring();
