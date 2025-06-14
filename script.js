// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after content loaded
    const loader = document.querySelector('.loader');
    const loaderProgress = document.querySelector('.loader-progress');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                initAnimations();
                initThreeJS();
            }, 500);
        }
        loaderProgress.style.width = `${progress}%`;
    }, 100);
    
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
    
    // Links and buttons hover effect
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(1.5)`;
            cursor.style.border = '1px solid var(--accent)';
            cursorDot.style.opacity = '0';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(1)`;
            cursor.style.border = '2px solid var(--accent)';
            cursorDot.style.opacity = '1';
        });
    });
    
    // Mobile navigation
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileNavToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            mobileNavToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // Update active nav link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Nav scroll behavior
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        
        if (window.scrollY > 80) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
        
        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 90) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Initialize animations
function initAnimations() {
    // Hero animations
    gsap.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
    });
    
    gsap.to('.hero-cta', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
    });
    
    gsap.to('.hero-image', {
        opacity: 1,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    // Scroll animations
    gsap.registerPlugin(ScrollTrigger);
    
    // About section animations
    gsap.to('.about-text', {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.to('.about-image', {
        scrollTrigger: {
            trigger: '.about-image',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Skills animations
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Project card animations
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out'
        });
        
        // Add 3D tilt effect to project cards
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `perspective(1000px) rotateX(${-deltaY * 10}deg) rotateY(${deltaX * 10}deg) scale3d(1.02, 1.02, 1.02)`;
            this.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            this.style.transition = 'transform 0.3s ease';
        });
    });
    
    // Contact section animations
    gsap.to('.contact-text', {
        scrollTrigger: {
            trigger: '.contact-text',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.to('.contact-globe', {
        scrollTrigger: {
            trigger: '.contact-globe',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
    });
}

// Initialize ThreeJS elements
function initThreeJS() {
    // Hero Section 3D Background
    const heroCanvas = document.querySelector('.hero-canvas');
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    heroCanvas.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1500;
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const colorOptions = [
        new THREE.Color(0xffffff), // White
        new THREE.Color(0xff6b35), // Orange
        new THREE.Color(0xaaaaaa)  // Light gray
    ];
    
    for (let i = 0; i < particleCount; i++) {
        // Position
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        
        // Color
        const colorIndex = Math.floor(Math.random() * colorOptions.length);
        const color = colorOptions[colorIndex];
        
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Camera position
    camera.position.z = 5;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Smooth mouse follow
        targetX = mouseX * 0.2;
        targetY = mouseY * 0.2;
        
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0003;
        
        // Move based on mouse position
        particles.rotation.x += (targetY - particles.rotation.x) * 0.02;
        particles.rotation.y += (targetX - particles.rotation.y) * 0.02;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Contact Globe
    const globeContainer = document.getElementById('globe-container');
    if (globeContainer) {
        // Only initialize if we're at that section
        const globeScene = new THREE.Scene();
        const globeCamera = new THREE.PerspectiveCamera(75, globeContainer.offsetWidth / globeContainer.offsetHeight, 0.1, 1000);
        
        const globeRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        globeRenderer.setSize(globeContainer.offsetWidth, globeContainer.offsetHeight);
        globeContainer.appendChild(globeRenderer.domElement);
        
        // Create globe
        const globeGeometry = new THREE.SphereGeometry(1.5, 32, 32);
        
        // Create wireframe material
        const globeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.7
        });
        
        const globe = new THREE.Mesh(globeGeometry, globeMaterial);
        globeScene.add(globe);
        
        // Add points to represent locations
        const locations = [
            { lat: 40.7128, lng: -74.0060 }, // New York
            { lat: 51.5074, lng: -0.1278 },  // London
            { lat: 35.6762, lng: 139.6503 }, // Tokyo
            { lat: 25.2048, lng: 55.2708 },  // Dubai
            { lat: -33.8688, lng: 151.2093 }, // Sydney
            { lat: 37.7749, lng: -122.4194 }  // San Francisco
        ];
        
        // Convert lat/lng to 3D coordinates
        function latLngToVector3(lat, lng) {
            const phi = (90 - lat) * Math.PI / 180;
            const theta = (lng + 180) * Math.PI / 180;
            
            const x = -1.5 * Math.sin(phi) * Math.cos(theta);
            const y = 1.5 * Math.cos(phi);
            const z = 1.5 * Math.sin(phi) * Math.sin(theta);
            
            return new THREE.Vector3(x, y, z);
        }
        
        // Add points
        locations.forEach(location => {
            const pointGeometry = new THREE.SphereGeometry(0.05, 16, 16);
            const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff6b35 });
            const point = new THREE.Mesh(pointGeometry, pointMaterial);
            
            const position = latLngToVector3(location.lat, location.lng);
            point.position.copy(position);
            
            globe.add(point);
            
            // Add pulse animation
            const pulseGeometry = new THREE.SphereGeometry(0.03, 16, 16);
            const pulseMaterial = new THREE.MeshBasicMaterial({
                color: 0xff6b35,
                transparent: true,
                opacity: 1
            });
            
            const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
            pulse.position.copy(position);
            globe.add(pulse);
            
            // Animate pulse
            function animatePulse() {
                const scale = 1 + Math.sin(Date.now() * 0.005) * 0.5;
                pulse.scale.set(scale, scale, scale);
                requestAnimationFrame(animatePulse);
            }
            
            animatePulse();
        });
        
        // Add connections between points
        for (let i = 0; i < locations.length; i++) {
            for (let j = i + 1; j < locations.length; j++) {
                if (Math.random() > 0.6) continue; // Only show some connections
                
                const start = latLngToVector3(locations[i].lat, locations[i].lng);
                const end = latLngToVector3(locations[j].lat, locations[j].lng);
                
                const curvePoints = [];
                
                // Create curved line between points
                const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
                const distance = start.distanceTo(end);
                
                // Lift the midpoint away from globe surface
                midPoint.normalize().multiplyScalar(1.5 + distance * 0.4);
                
                // Create curve
                const curve = new THREE.QuadraticBezierCurve3(start, midPoint, end);
                
                // Sample points along curve
                for (let t = 0; t <= 1; t += 0.01) {
                    curvePoints.push(curve.getPoint(t));
                }
                
                // Create line
                const lineGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
                const lineMaterial = new THREE.LineBasicMaterial({
                    color: 0xffffff,
                    transparent: true,
                    opacity: 0.5,
                    linewidth: 1
                });
                
                const line = new THREE.Line(lineGeometry, lineMaterial);
                globe.add(line);
            }
        }
        
        // Position camera
        globeCamera.position.z = 5;
        
        // Add ambient light
        const globeLight = new THREE.AmbientLight(0xffffff, 0.5);
        globeScene.add(globeLight);
        
        // Globe animation loop
        function animateGlobe() {
            requestAnimationFrame(animateGlobe);
            
            globe.rotation.y += 0.005;
            globe.rotation.x = 0.2;
            
            globeRenderer.render(globeScene, globeCamera);
        }
        
        // Resize handler
        window.addEventListener('resize', () => {
            if (globeContainer.offsetWidth > 0) {
                globeCamera.aspect = globeContainer.offsetWidth / globeContainer.offsetHeight;
                globeCamera.updateProjectionMatrix();
                globeRenderer.setSize(globeContainer.offsetWidth, globeContainer.offsetHeight);
            }
        });
        
        animateGlobe();
    }
}