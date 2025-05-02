// 3D Parallax Effect
document.addEventListener('mousemove', (e) => {
    const perspectiveContainer = document.querySelector('.perspective-container');
    const x = (window.innerWidth / 2 - e.pageX) / 25;
    const y = (window.innerHeight / 2 - e.pageY) / 25;
    perspectiveContainer.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate Elements on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.timeline-item, .project-card, .about-image, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) translateZ(0)';
        }
    });
};

// Set initial state for animation
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.timeline-item, .project-card, .about-image, .contact-form');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px) translateZ(20px)';
        element.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;
    });
    
    // Trigger animation after a short delay
    setTimeout(animateOnScroll, 500);
});

window.addEventListener('scroll', animateOnScroll);

// Form Submission
const form = document.querySelector('.contact-form form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
});
