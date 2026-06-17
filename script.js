// Image Carousel Functionality
let currentSlideIndex = 0;
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselDots = document.querySelectorAll('.carousel-dots .dot');
const totalSlides = carouselSlides.length;

function showSlide(index) {
    // Remove active class from all slides and dots
    carouselSlides.forEach(slide => slide.classList.remove('active'));
    carouselDots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    if (index >= totalSlides) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = totalSlides - 1;
    } else {
        currentSlideIndex = index;
    }
    
    carouselSlides[currentSlideIndex].classList.add('active');
    carouselDots[currentSlideIndex].classList.add('active');
}

function currentSlide(index) {
    showSlide(index);
}

// Auto-rotate carousel every 0.5 second
if (carouselSlides.length > 0) {
    setInterval(() => {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }, 500);
}

// Testimonial Slider
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonialCards.length;

function updateTestimonialSlider() {
    testimonialCards.forEach((card, index) => {
        card.classList.remove('active');
        if (index === currentTestimonial) {
            card.classList.add('active');
        }
    });
    updateDots();
}

function slideTestimonial(direction) {
    currentTestimonial += direction;
    if (currentTestimonial >= totalTestimonials) {
        currentTestimonial = 0;
    } else if (currentTestimonial < 0) {
        currentTestimonial = totalTestimonials - 1;
    }
    updateTestimonialSlider();
}

function updateDots() {
    const sliderDots = document.getElementById('sliderDots');
    sliderDots.innerHTML = '';
    for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === currentTestimonial ? ' active' : '');
        dot.onclick = () => {
            currentTestimonial = i;
            updateTestimonialSlider();
        };
        sliderDots.appendChild(dot);
    }
}

// Initialize testimonial slider
if (testimonialCards.length > 0) {
    updateDots();
    setInterval(() => {
        slideTestimonial(1);
    }, 5000);
}

// FAQ Accordion
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// Newsletter Form
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    alert(`Thank you! We've sent a confirmation email to ${email}`);
    event.target.reset();
}

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for buttons
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields!');
            return;
        }
        
        alert(`Thank you, ${name}! We've received your message and will get back to you at ${email} shortly.`);
        contactForm.reset();
    });
}

// Add scroll effect to navbar
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Highlight active navigation link
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#FFD700';
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards, portfolio items, team cards, etc
document.querySelectorAll('.service-card, .portfolio-card, .team-card, .stat-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Increment counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            const suffix = element.textContent.match(/[+%]/g) ? element.textContent.match(/[+%]/g)[0] : '';
            element.textContent = Math.ceil(current) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            const suffix = element.textContent.match(/[+%]/g) ? element.textContent.match(/[+%]/g)[0] : '';
            element.textContent = target + suffix;
        }
    };
    
    updateCounter();
}

// Observe stat cards for counter animation
const statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                
                animateCounter(statNumber, number);
                statNumber.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu) {
        navMenu.classList.remove('active');
    }
});

// Prevent multiple form submissions
let formSubmitted = false;
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        if (formSubmitted) {
            e.preventDefault();
            return;
        }
        formSubmitted = true;
        setTimeout(() => {
            formSubmitted = false;
        }, 3000);
    });
}

console.log('🚀 SocialStrong Marketing - Website Loaded!');
console.log('📧 hello@socialstrongmarketing.com');
console.log('📱 +1 (555) 123-4567');

// FAQ Accordion
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// Newsletter Form
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    alert(`Thank you! We've sent a confirmation email to ${email}`);
    event.target.reset();
}

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for buttons
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields!');
            return;
        }
        
        alert(`Thank you, ${name}! We've received your message and will get back to you at ${email} shortly.`);
        contactForm.reset();
    });
}

// Add scroll effect to navbar
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Highlight active navigation link
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#FFD700';
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards, portfolio items, team cards, etc
document.querySelectorAll('.service-card, .portfolio-card, .team-card, .stat-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Increment counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            const suffix = element.textContent.match(/[+%]/g) ? element.textContent.match(/[+%]/g)[0] : '';
            element.textContent = Math.ceil(current) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            const suffix = element.textContent.match(/[+%]/g) ? element.textContent.match(/[+%]/g)[0] : '';
            element.textContent = target + suffix;
        }
    };
    
    updateCounter();
}

// Observe stat cards for counter animation
const statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                
                animateCounter(statNumber, number);
                statNumber.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu) {
        navMenu.classList.remove('active');
    }
});

// Prevent multiple form submissions
let formSubmitted = false;
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        if (formSubmitted) {
            e.preventDefault();
            return;
        }
        formSubmitted = true;
        setTimeout(() => {
            formSubmitted = false;
        }, 3000);
    });
}

console.log('🚀 SocialStrong Marketing - Website Loaded!');
console.log('📧 hello@socialstrongmarketing.com');
console.log('📱 +1 (555) 123-4567');
