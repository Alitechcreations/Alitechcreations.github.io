// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

    // ===== 3D Background =====
    const canvas = document.getElementById('3d-bg');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Add lights
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add floating shapes
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x6c63ff, 
        transparent: true, 
        opacity: 0.7 
    });

    const shapes = [];
    for (let i = 0; i < 5; i++) {
        const shape = new THREE.Mesh(geometry, material);
        shape.position.x = (Math.random() - 0.5) * 10;
        shape.position.y = (Math.random() - 0.5) * 10;
        shape.position.z = (Math.random() - 0.5) * 10;
        shapes.push(shape);
        scene.add(shape);
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        shapes.forEach(shape => {
            shape.rotation.x += 0.005;
            shape.rotation.y += 0.01;
        });
        renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // ===== Typewriter Effect =====
    const typewriterTexts = ["UI/UX Designer", "Graphic Designer", "Prototyper"];
    const typewriterElement = document.querySelector('.typewriter');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentText = typewriterTexts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typewriterTexts.length;
            setTimeout(typeWriter, 500);
        } else {
            setTimeout(typeWriter, isDeleting ? 50 : 100);
        }
    }
    typeWriter();

    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
});
