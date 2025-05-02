// 3D Background with Three.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('3d-bg'),
        alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create floating geometry
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshPhongMaterial({
        color: 0x6c63ff,
        shininess: 100,
        transparent: true,
        opacity: 0.7
    });
    
    const shapes = [];
    const shapeCount = 10;
    
    for (let i = 0; i < shapeCount; i++) {
        const shape = new THREE.Mesh(geometry, material);
        
        // Random position
        shape.position.x = Math.random() * 20 - 10;
        shape.position.y = Math.random() * 20 - 10;
        shape.position.z = Math.random() * 20 - 10;
        
        // Random rotation
        shape.rotation.x = Math.random() * Math.PI;
        shape.rotation.y = Math.random() * Math.PI;
        
        // Random size
        const scale = Math.random() * 0.5 + 0.5;
        shape.scale.set(scale, scale, scale);
        
        scene.add(shape);
        shapes.push(shape);
    }
    
    camera.position.z = 5;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        shapes.forEach(shape => {
            shape.rotation.x += 0.005;
            shape.rotation.y += 0.01;
            
            // Float up and down
            shape.position.y += Math.sin(Date.now() * 0.001 + shape.position.x) * 0.01;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-bar');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const percent = bar.parentElement.getAttribute('data-percent');
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = percent + '%';
            }, 100);
        });
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Typewriter effect
    const typewriterElement = document.querySelector('.typewriter');
    const texts = ["UI/UX Designer", "Graphic Artist", "Prototyper", "User Researcher"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeWriter, 500);
        } else {
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Start typewriter effect after a delay
    setTimeout(typeWriter, 2000);
    
    // Floating UI elements interaction
    const uiElements = document.querySelectorAll('.ui-element');
    
    uiElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            element.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'none';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transition = 'transform 0.5s ease';
            element.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    });
});
