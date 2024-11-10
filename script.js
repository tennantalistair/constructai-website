document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inquiryForm');
    
    // Add placeholder attributes to inputs for label animation
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.setAttribute('placeholder', ' ');
    });

    // Form validation and submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        let isValid = true;
        const formData = {};
        
        inputs.forEach(input => {
            const value = input.value.trim();
            formData[input.id] = value;
            
            if (!value) {
                isValid = false;
                showError(input, 'This field is required');
            } else {
                clearError(input);
                
                // Specific field validations
                switch(input.id) {
                    case 'email':
                        if (!isValidEmail(value)) {
                            isValid = false;
                            showError(input, 'Please enter a valid email address');
                        }
                        break;
                    case 'phone':
                        if (!isValidPhone(value)) {
                            isValid = false;
                            showError(input, 'Please enter a valid phone number');
                        }
                        break;
                    case 'website':
                        if (!isValidURL(value)) {
                            isValid = false;
                            showError(input, 'Please enter a valid URL');
                        }
                        break;
                    case 'projects':
                        if (isNaN(value) || parseInt(value) < 0) {
                            isValid = false;
                            showError(input, 'Please enter a valid number');
                        }
                        break;
                }
            }
        });

        if (isValid) {
            // Simulate form submission
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.textContent = 'Submitted Successfully!';
                form.reset();
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit Inquiry';
                }, 2000);
            }, 1500);
        }
    });
});

// Validation helper functions
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorDiv);
    }
    input.classList.add('error');
}

function clearError(input) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        formGroup.removeChild(errorDiv);
    }
    input.classList.remove('error');
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[\d\s\-+()]{10,}$/.test(phone);
}

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll-based animations for nav
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});
