// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Back to top button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form validation
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        const btnText = document.querySelector('.btn-text');
        const btnLoading = document.querySelector('.btn-loading');
        const formStatus = document.getElementById('form-status');
        
        let isValid = true;
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        
        // Validate name
        if (name.value.trim() === '') {
            document.getElementById('name-error').textContent = 'Name is required';
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            document.getElementById('email-error').textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email';
            isValid = false;
        }
        
        // Validate subject
        if (subject.value.trim() === '') {
            document.getElementById('subject-error').textContent = 'Subject is required';
            isValid = false;
        }
        
        // Validate message
        if (message.value.trim() === '') {
            document.getElementById('message-error').textContent = 'Message is required';
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'block';
            
            // Simulate form submission
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                formStatus.textContent = 'Your message has been sent successfully!';
                formStatus.className = 'form-status success';
                
                // Hide loading state
                btnText.style.display = 'block';
                btnLoading.style.display = 'none';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }, 5000);
            }, 2000);
        }
    });
}

// Add animation to elements when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animated');
    const resumePath = 'assets/resume.pdf';
    const downloadResumeBtn = document.getElementById('download-resume');
    const viewResumeBtn = document.getElementById('view-resume');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transition = 'opacity 0.5s ease-in-out';
        observer.observe(element);
    });

    // Wire resume buttons
    if (downloadResumeBtn || viewResumeBtn) {
        fetch(resumePath, { method: 'HEAD' })
            .then(response => {
                if (!response.ok) throw new Error('Not found');
                const resumeUrl = resumePath;
                if (downloadResumeBtn) {
                    downloadResumeBtn.href = resumeUrl;
                    downloadResumeBtn.setAttribute('download', 'Soumyajit_Khan_Resume.pdf');
                }
                if (viewResumeBtn) {
                    viewResumeBtn.href = resumeUrl;
                    viewResumeBtn.target = '_blank';
                    viewResumeBtn.rel = 'noopener noreferrer';
                }
            })
            .catch(() => {
                if (downloadResumeBtn) downloadResumeBtn.style.display = 'none';
                if (viewResumeBtn) viewResumeBtn.style.display = 'none';
            });
    }
});