document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inquiryForm');
    
    // Add placeholder attributes to inputs for label animation
    const inputs = form.querySelectorAll('input:not([type="hidden"])');
    inputs.forEach(input => {
        input.setAttribute('placeholder', ' ');
        
        // Add input event listener for real-time validation
        input.addEventListener('input', function() {
            validateInput(this);
        });
    });

    // Form validation and submission
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Always prevent default to handle validation
        console.log('Form submission started');
        
        // Basic validation
        let isValid = true;
        const formData = {};
        
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
            formData[input.id] = input.value.trim();
        });

        if (!isValid) {
            console.log('Form validation failed');
            return;
        }

        console.log('Form validation passed, proceeding with submission');
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        // Log the submission attempt
        console.log('Form submitted with data:', formData);
        
        // Submit the form
        form.submit();
    });
});

// Validation helper function
function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Check if empty
    if (!value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else {
        // Specific field validations
        switch(input.id) {
            case 'fullName':
                if (!/^[A-Za-z\s\-']+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid name (letters, spaces, hyphens, and apostrophes only)';
                }
                break;
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'phone':
                if (!/^[\d\s\-+()]{10,}$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number (minimum 10 digits)';
                }
                break;
            case 'website':
                try {
                    const url = new URL(value);
                    if (!url.protocol.startsWith('http')) {
                        throw new Error('Invalid protocol');
                    }
                } catch {
                    isValid = false;
                    errorMessage = 'Please enter a valid URL starting with http:// or https://';
                }
                break;
            case 'projects':
                const numProjects = parseInt(value);
                if (isNaN(numProjects) || numProjects < 0) {
                    isValid = false;
                    errorMessage = 'Please enter a valid number (0 or greater)';
                }
                break;
            default:
                // For other fields, just ensure they have minimum length
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Please enter at least 2 characters';
                }
        }
    }

    if (!isValid) {
        showError(input, errorMessage);
        console.log(`${input.id} validation failed: ${errorMessage}`);
    } else {
        clearError(input);
        console.log(`${input.id} validation passed`);
    }

    return isValid;
}

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

// Log any form-related errors to help with debugging
window.addEventListener('error', function(e) {
    console.error('Global error:', e.message);
    console.error('Error details:', {
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
    });
});
