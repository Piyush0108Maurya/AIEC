// ==========================================
// AIEC IITM - Clean Version (No GSAP / No Three.js)
// ==========================================

// 1. LOADER ANIMATION
let progress = 0;
const loader = document.getElementById("loader");
const progressBar = document.querySelector(".progress");
const progressGlow = document.querySelector(".progress-glow");
const percentageText = document.querySelector(".percentage");
const nn = document.getElementById("nn");
const ml = document.getElementById("ml");
const ai = document.getElementById("ai");

const progressInterval = setInterval(() => {
  progress += 3;
  progressBar.style.width = progress + "%";
  if (progressGlow) progressGlow.style.width = progress + "%";
  percentageText.textContent = progress + "%";

  if (progress > 20) nn.textContent = "Active";
  if (progress > 50) ml.textContent = "Initializing";
  if (progress > 80) ai.textContent = "Online";

  if (progress >= 100) {
    clearInterval(progressInterval);
    setTimeout(() => {
      loader.style.opacity = 0;
      setTimeout(() => {
        loader.style.display = "none";
        document.body.style.overflow = "auto";
      }, 800);
    }, 400);
  }
}, 80);

// 2. NAVBAR SCROLL EFFECT
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// 3. MOBILE MENU TOGGLE
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// 4. TYPING EFFECT
const typingText = document.querySelector(".typing-text");
const words = [
  "Artificial Intelligence",
  "Machine Learning",
  "Neural Networks",
  "Future Technology",
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];
  if (!isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1500);
      return;
    }
  } else {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(type, isDeleting ? 60 : 100);
}
setTimeout(type, 1000);

// 5. SIMPLE HERO PARTICLE EFFECT (Static Floating Dots)
const heroParticles = document.getElementById("hero-particles");
if (heroParticles) {
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = Math.random() * 4 + "px";
    particle.style.height = particle.style.width;
    particle.style.background = Math.random() > 0.5 ? "#00f6ff" : "#7b2ff7";
    particle.style.borderRadius = "50%";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.opacity = Math.random() * 0.6 + 0.2;
    particle.style.animation = `floatParticle ${3 + Math.random() * 4}s ease-in-out infinite`;
    heroParticles.appendChild(particle);
  }
}

// 6. FLOAT PARTICLE ANIMATION (CSS injected here)
const style = document.createElement("style");
style.textContent = `
@keyframes floatParticle {
  0%,100% { transform: translateY(0); opacity: 0.8; }
  50% { transform: translateY(-20px); opacity: 1; }
}`;
document.head.appendChild(style);

// ==========================================
// 4. ENHANCED 3D GLOBE WITH NEURAL NETWORKS
// ==========================================
const canvas = document.getElementById("globeCanvas");
if (canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.offsetWidth / canvas.offsetHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Main Globe
  const geometry = new THREE.SphereGeometry(2.5, 64, 64);
  const material = new THREE.MeshBasicMaterial({
    color: 0x7b2ff7,
    wireframe: true,
    transparent: true,
    opacity: 1
  });
  const globe = new THREE.Mesh(geometry, material);
  scene.add(globe);

  // Inner Glow Sphere
  const glowGeometry = new THREE.SphereGeometry(2.4, 32, 32);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f6ff,
    transparent: true,
    opacity: 0.1,
    side: THREE.BackSide
  });
  const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
  scene.add(glowSphere);

  // Orbiting Particles (Data Nodes)
  const orbitParticles = [];
  const orbitCount = 50;
  const orbitGeometry = new THREE.SphereGeometry(0.08, 16, 16);
  
  for (let i = 0; i < orbitCount; i++) {
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: Math.random() > 0.5 ? 0x00f6ff : 0x7b2ff7
    });
    const particle = new THREE.Mesh(orbitGeometry, particleMaterial);

    const radius = 3 + Math.random() * 1.5;
    const angle = Math.random() * Math.PI * 2;
    const yAngle = Math.random() * Math.PI;

    particle.userData = {
      radius,
      angle,
      yAngle,
      speed: 0.003 + Math.random() * 0.01
    };

    scene.add(particle);
    orbitParticles.push(particle);
  }

  // Neural Network Connections
  const connectionLines = [];
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00f6ff,
    transparent: true,
    opacity: 0.3
  });

  function createConnection(p1, p2) {
    const points = [p1.position.clone(), p2.position.clone()];
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
    return { line, p1, p2 };
  }

  // Create connections between nearby particles
  for (let i = 0; i < orbitParticles.length; i++) {
    for (let j = i + 1; j < orbitParticles.length; j++) {
      if (Math.random() > 0.95) {
        connectionLines.push(createConnection(orbitParticles[i], orbitParticles[j]));
      }
    }
  }

  // Data Streams (Flowing Lines)
  const streamCount = 8;
  const streams = [];
  
  for (let i = 0; i < streamCount; i++) {
    const streamPoints = [];
    const streamLength = 20;
    
    for (let j = 0; j < streamLength; j++) {
      streamPoints.push(new THREE.Vector3(0, 0, 0));
    }
    
    const streamGeometry = new THREE.BufferGeometry().setFromPoints(streamPoints);
    const streamMaterial = new THREE.LineBasicMaterial({
      color: 0x00f6ff,
      transparent: true,
      opacity: 0.6
    });
    const stream = new THREE.Line(streamGeometry, streamMaterial);
    scene.add(stream);
    
    streams.push({
      line: stream,
      angle: Math.random() * Math.PI * 2,
      yAngle: Math.random() * Math.PI,
      speed: 0.02 + Math.random() * 0.03,
      radius: 2.8
    });
  }

  // Animation Loop
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Rotate globe
    globe.rotation.y += 0.001;
    globe.rotation.x = Math.sin(time * 0.3) * 0.1;

    // Pulse glow
    glowSphere.scale.set(
      1 + Math.sin(time * 2) * 0.05,
      1 + Math.sin(time * 2) * 0.05,
      1 + Math.sin(time * 2) * 0.05
    );

    // Move orbiting particles
    orbitParticles.forEach(p => {
      p.userData.angle += p.userData.speed;

      const x = p.userData.radius * Math.cos(p.userData.angle) * Math.sin(p.userData.yAngle);
      const y = p.userData.radius * Math.cos(p.userData.yAngle);
      const z = p.userData.radius * Math.sin(p.userData.angle) * Math.sin(p.userData.yAngle);

      p.position.set(x, y, z);

      // Pulse particle size
      const scale = 1 + Math.sin(time * 3 + p.userData.angle) * 0.3;
      p.scale.set(scale, scale, scale);
    });

    // Update neural connections
    connectionLines.forEach(conn => {
      const positions = conn.line.geometry.attributes.position.array;
      positions[0] = conn.p1.position.x;
      positions[1] = conn.p1.position.y;
      positions[2] = conn.p1.position.z;
      positions[3] = conn.p2.position.x;
      positions[4] = conn.p2.position.y;
      positions[5] = conn.p2.position.z;
      conn.line.geometry.attributes.position.needsUpdate = true;

      // Pulse connection opacity
      conn.line.material.opacity = 0.2 + Math.sin(time * 2) * 0.1;
    });

    // Animate data streams
    streams.forEach(stream => {
      stream.angle += stream.speed;
      const positions = stream.line.geometry.attributes.position.array;

      for (let i = positions.length - 3; i >= 3; i -= 3) {
        positions[i] = positions[i - 3];
        positions[i + 1] = positions[i - 2];
        positions[i + 2] = positions[i - 1];
      }

      const x = stream.radius * Math.cos(stream.angle) * Math.sin(stream.yAngle);
      const y = stream.radius * Math.cos(stream.yAngle);
      const z = stream.radius * Math.sin(stream.angle) * Math.sin(stream.yAngle);

      positions[0] = x;
      positions[1] = y;
      positions[2] = z;

      stream.line.geometry.attributes.position.needsUpdate = true;
    });

    renderer.render(scene, camera);
  }
  animate();

  // Handle resize
  window.addEventListener('resize', () => {
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

// === PROJECT CARD FLIP ON CLICK ===
document.querySelectorAll(".flip-card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});
