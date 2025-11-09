// Contact page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Enhanced form validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Add focus effects
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
                validateField(this);
            });
        });

        function validateField(field) {
            const value = field.value.trim();
            const fieldName = field.getAttribute('name');
            let isValid = true;
            let errorMessage = '';

            switch (fieldName) {
                case 'name':
                    if (value.length < 2) {
                        isValid = false;
                        errorMessage = 'Name must be at least 2 characters long';
                    }
                    break;
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;
                case 'message':
                    if (value.length < 10) {
                        isValid = false;
                        errorMessage = 'Message must be at least 10 characters long';
                    }
                    break;
            }

            // Remove existing error message
            const existingError = field.parentElement.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }

            // Remove error styling
            field.classList.remove('error');

            if (!isValid) {
                field.classList.add('error');
                const errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.style.color = 'var(--accent)';
                errorElement.style.fontSize = '0.8rem';
                errorElement.style.marginTop = '5px';
                errorElement.textContent = errorMessage;
                field.parentElement.appendChild(errorElement);
            }

            return isValid;
        }

        // Enhanced form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isFormValid = true;
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !validateField(input)) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                const formData = new FormData(contactForm);
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending Message...';
                submitBtn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    // Success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.style.background = 'var(--secondary)';
                    successMessage.style.color = 'white';
                    successMessage.style.padding = '15px';
                    successMessage.style.borderRadius = '5px';
                    successMessage.style.marginTop = '20px';
                    successMessage.style.textAlign = 'center';
                    successMessage.innerHTML = `
                        <h4>Thank You!</h4>
                        <p>Your message has been sent successfully. We will get back to you soon.</p>
                    `;
                    
                    contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                    contactForm.reset();
                    
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;

                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 2000);
            }
        });
    }

    // Map placeholder interaction
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', function() {
            alert('Church Location: SCAN Headquarters, P.O. Box 216, Karonga, Malawi');
        });
    }
});