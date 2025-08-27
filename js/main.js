// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    initMobileNavigation();
    
    // Form Validation
    initFormValidation();
    
    // Smooth Scrolling
    initSmoothScrolling();
    
    // Animation on Scroll
    initScrollAnimations();
});

// Mobile Navigation Functionality
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Form Validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous error messages
            clearErrorMessages();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // Validate form
            let isValid = true;
            
            // Name validation
            if (!formData.name) {
                showError('name', 'Name is required');
                isValid = false;
            } else if (formData.name.length < 2) {
                showError('name', 'Name must be at least 2 characters long');
                isValid = false;
            }
            
            // Email validation
            if (!formData.email) {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(formData.email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Phone validation
            if (!formData.phone) {
                showError('phone', 'Phone number is required');
                isValid = false;
            } else if (!isValidPhone(formData.phone)) {
                showError('phone', 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Message validation
            if (!formData.message) {
                showError('message', 'Message is required');
                isValid = false;
            } else if (formData.message.length < 10) {
                showError('message', 'Message must be at least 10 characters long');
                isValid = false;
            }
            
            // If form is valid, simulate submission
            if (isValid) {
                submitForm(formData);
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    switch(fieldName) {
        case 'name':
            if (!value) {
                showError('name', 'Name is required');
            } else if (value.length < 2) {
                showError('name', 'Name must be at least 2 characters long');
            }
            break;
            
        case 'email':
            if (!value) {
                showError('email', 'Email is required');
            } else if (!isValidEmail(value)) {
                showError('email', 'Please enter a valid email address');
            }
            break;
            
        case 'phone':
            if (!value) {
                showError('phone', 'Phone number is required');
            } else if (!isValidPhone(value)) {
                showError('phone', 'Please enter a valid phone number');
            }
            break;
            
        case 'message':
            if (!value) {
                showError('message', 'Message is required');
            } else if (value.length < 10) {
                showError('message', 'Message must be at least 10 characters long');
            }
            break;
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation helper
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Show error message
function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');
    
    if (field && errorElement) {
        field.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Clear field error
function clearFieldError(field) {
    const fieldName = field.name;
    const errorElement = document.getElementById(fieldName + 'Error');
    
    if (errorElement) {
        field.classList.remove('error');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// Clear all error messages
function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('.form-input, .form-textarea');
    
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
    
    inputElements.forEach(element => {
        element.classList.remove('error');
    });
}

// Simulate form submission
function submitForm(formData) {
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showSuccessMessage('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Log form data (in real application, this would be sent to server)
        console.log('Form submitted with data:', formData);
    }, 2000);
}

// Show success message
function showSuccessMessage(message) {
    // Remove existing success message
    const existingMessage = document.querySelector('.success-banner');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-banner';
    successDiv.innerHTML = `
        <div class="success-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="close-btn">&times;</button>
        </div>
    `;
    
    // Add styles
    successDiv.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #38a169;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        animation: slideDown 0.3s ease;
    `;
    
    const successContent = successDiv.querySelector('.success-content');
    successContent.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    const closeBtn = successDiv.querySelector('.close-btn');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: 1rem;
    `;
    
    document.body.appendChild(successDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (successDiv.parentElement) {
            successDiv.remove();
        }
    }, 5000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation on Scroll
function initScrollAnimations() {
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
    
    // Observe elements that should animate
    document.querySelectorAll('.product-card, .stat-item, .feature').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Utility function to handle errors gracefully
function handleError(error, context) {
    console.error(`Error in ${context}:`, error);
    
    // In production, you might want to send this to an error tracking service
    // Example: sendErrorToService(error, context);
}

// Add CSS animation for success message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    .form-input.error,
    .form-textarea.error {
        border-color: #e53e3e;
        box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
    }
`;
document.head.appendChild(style);

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause any animations or timers if needed
        console.log('Page hidden');
    } else {
        // Page is visible again
        console.log('Page visible');
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Handle resize logic here if needed
        console.log('Window resized');
    }, 250);
});
