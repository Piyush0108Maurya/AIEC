let progress = 0;
const loader = document.getElementById("loader");
const progressBar = document.querySelector(".progress");
const percentageText = document.querySelector(".percentage");
const nn = document.getElementById("nn");
const ml = document.getElementById("ml");
const ai = document.getElementById("ai");

// Progress simulation
let interval = setInterval(() => {
  progress += 2;
  progressBar.style.width = progress + "%";
  percentageText.textContent = progress + "%";

  if (progress > 20) nn.textContent = "Active";
  if (progress > 50) ml.textContent = "Initializing";
  if (progress > 80) ai.textContent = "Online";

  if (progress >= 100) {
    clearInterval(interval);
    setTimeout(() => {
      loader.style.display = "none";
      document.body.style.overflow = "auto";
    }, 600);
  }
}, 100); // ~5s total

// Navbar blur on scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

document.querySelectorAll(".event-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Event registration coming soon!");
  });
});


// Mobile menu toggle
// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Close menu when a link is clicked (mobile only)
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});




// Example: dynamic hover effect logging
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    console.log("Hovered on:", card.querySelector(".project-name").innerText);
  });
});

// Scroll reveal
const sections = document.querySelectorAll("section");
const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.8;
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < trigger) {
      sec.classList.add("visible");
    }
  });
};
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();



// Typing Effect
const typingText = document.querySelector(".typing-text");
const words = ["Artificial Intelligence", "Machine Learning", "Future Tech"];
let wordIndex = 0, charIndex = 0;
function type() {
  if (charIndex < words[wordIndex].length) {
    typingText.textContent += words[wordIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
}
function erase() {
  if (charIndex > 0) {
    typingText.textContent = words[wordIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 300);
  }
}
type();

// 3D Globe with glowing nodes
const canvas = document.getElementById("globeCanvas");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  canvas.offsetWidth / canvas.offsetHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Simple glowing wireframe globe
// === Globe (Bigger) ===
const geometry = new THREE.SphereGeometry(3, 48, 48); // bigger globe
const material = new THREE.MeshBasicMaterial({
  color: 0x7b2ff7,
  wireframe: true
});
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// === Logo Inside Globe ===
const logoTexture = new THREE.TextureLoader().load("logo.png");
const logoMaterial = new THREE.SpriteMaterial({ map: logoTexture, transparent: true });
const logoSprite = new THREE.Sprite(logoMaterial);
logoSprite.scale.set(0.5, 0.5, 0.5); // adjust size (X, Y, Z)
scene.add(logoSprite);

// === Orbiting Particles (Satellites / AI signals) ===
const orbitParticles = [];
const orbitCount = 40; // more satellites for activity

const orbitGeometry = new THREE.SphereGeometry(0.12, 12, 12); // bigger satellites
const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0x00f6ff });

for (let i = 0; i < orbitCount; i++) {
  const particle = new THREE.Mesh(orbitGeometry, orbitMaterial);

  // Random orbit radius slightly outside globe
  const radius = 3.8 + Math.random() * 1.2;
  // Random angle around globe
  const angle = Math.random() * Math.PI * 2;
  const yAngle = Math.random() * Math.PI;

  particle.userData = { radius, angle, yAngle, speed: 0.005 + Math.random() * 0.015 };

  scene.add(particle);
  orbitParticles.push(particle);
}

// === Glow Trails ===
const trailMaterial = new THREE.LineBasicMaterial({ color: 0x00f6ff, transparent: true, opacity: 0.5 });

function createTrail(particle) {
  const trailLength = 15; // length of line
  const points = [];
  for (let i = 0; i < trailLength; i++) {
    points.push(new THREE.Vector3(0, 0, 0));
  }
  const trailGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const trail = new THREE.Line(trailGeometry, trailMaterial.clone());
  scene.add(trail);
  particle.userData.trail = trail;
}
orbitParticles.forEach(createTrail);

// === Animate ===
function animate() {
  requestAnimationFrame(animate);

  // Rotate globe
  globe.rotation.y += 0.002;

  // Move particles + update trails
  orbitParticles.forEach(p => {
    p.userData.angle += p.userData.speed;

    const x = p.userData.radius * Math.cos(p.userData.angle) * Math.sin(p.userData.yAngle);
    const y = p.userData.radius * Math.cos(p.userData.yAngle);
    const z = p.userData.radius * Math.sin(p.userData.angle) * Math.sin(p.userData.yAngle);

    p.position.set(x, y, z);

    // Update trail geometry
    const trail = p.userData.trail;
    const positions = trail.geometry.attributes.position.array;

    for (let i = positions.length - 3; i >= 3; i--) {
      positions[i] = positions[i - 3];
    }
    positions[0] = x;
    positions[1] = y;
    positions[2] = z;

    trail.geometry.attributes.position.needsUpdate = true;
  });
 //
  const glowMaterial = new THREE.SpriteMaterial({ 
  map: logoTexture, 
  color: 0x7b2ff7, 
  transparent: true, 
  opacity: 0.2 
});
const glowSprite = new THREE.Sprite(glowMaterial);
glowSprite.scale.set(3, 3, 1);
scene.add(glowSprite);

glowSprite.position.copy(logoSprite.position);



  renderer.render(scene, camera);
  logoSprite.position.set(0, 0, 0); // always stay at center

}
animate();

// === Footer Typing Effect ===
const footerTyping = document.getElementById("footer-typing");
const footerWords = ["© 2025 AIEC IITM — Powering the Future with AI", "Innovate • Build • Inspire"];
let fWordIndex = 0, fCharIndex = 0;

function typeFooter() {
  if (fCharIndex < footerWords[fWordIndex].length) {
    footerTyping.textContent += footerWords[fWordIndex].charAt(fCharIndex);
    fCharIndex++;
    setTimeout(typeFooter, 80);
  } else {
    setTimeout(eraseFooter, 2000);
  }
}
function eraseFooter() {
  if (fCharIndex > 0) {
    footerTyping.textContent = footerWords[fWordIndex].substring(0, fCharIndex - 1);
    fCharIndex--;
    setTimeout(eraseFooter, 40);
  } else {
    fWordIndex = (fWordIndex + 1) % footerWords.length;
    setTimeout(typeFooter, 500);
  }
}
typeFooter();

// === Footer Particles ===
const fCanvas = document.getElementById("footer-particles");
const fCtx = fCanvas.getContext("2d");
fCanvas.width = window.innerWidth;
fCanvas.height = document.querySelector(".footer").offsetHeight;

let particles = [];
for (let i = 0; i < 50; i++) {
  particles.push({
    x: Math.random() * fCanvas.width,
    y: Math.random() * fCanvas.height,
    radius: Math.random() * 2,
    dx: (Math.random() - 0.5) * 0.5,
    dy: -Math.random() * 0.5,
  });
}

function drawParticles() {
  fCtx.clearRect(0, 0, fCanvas.width, fCanvas.height);
  fCtx.fillStyle = "#7b2ff7";
  particles.forEach(p => {
    fCtx.beginPath();
    fCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    fCtx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.y < 0) {
      p.y = fCanvas.height;
      p.x = Math.random() * fCanvas.width;
    }
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();




