/* =============================================
   🚀 3D EFFECTS - Priya Girin Portfolio
   Three.js Particle Field + Interactive 3D
   ============================================= */

(function() {

// ── CURSOR GLOW TRACKER ──────────────────────
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
}

// ── THREE.JS PARTICLE FIELD ──────────────────
const canvas = document.getElementById('bg-canvas');
if (!canvas || typeof THREE === 'undefined') return;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

// Particle geometry
const count = 1800;
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
const sizes = new Float32Array(count);

const palette = [
  [0.31, 0.76, 0.97],   // #4FC3F7 blue
  [0.0, 0.96, 1.0],     // #00f5ff cyan
  [0.66, 0.33, 0.97],   // #a855f7 purple
  [0.96, 0.28, 0.71],   // #f472b6 pink
];

for (let i = 0; i < count; i++) {
  positions[i * 3]     = (Math.random() - 0.5) * 120;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

  const c = palette[Math.floor(Math.random() * palette.length)];
  colors[i * 3]     = c[0];
  colors[i * 3 + 1] = c[1];
  colors[i * 3 + 2] = c[2];

  sizes[i] = Math.random() * 1.5 + 0.3;
}

const geo = new THREE.BufferGeometry();
geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

const mat = new THREE.PointsMaterial({
  size: 0.25,
  vertexColors: true,
  transparent: true,
  opacity: 0.75,
  sizeAttenuation: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});

const particles = new THREE.Points(geo, mat);
scene.add(particles);

// CONNECTION LINES (wireframe sphere for depth)
const wireGeo = new THREE.IcosahedronGeometry(18, 2);
const wireMat = new THREE.MeshBasicMaterial({
  color: 0x4FC3F7,
  wireframe: true,
  transparent: true,
  opacity: 0.04,
});
const wireMesh = new THREE.Mesh(wireGeo, wireMat);
scene.add(wireMesh);

// Second rotating ring
const ringGeo = new THREE.TorusGeometry(22, 0.05, 4, 60);
const ringMat = new THREE.MeshBasicMaterial({
  color: 0x00f5ff,
  transparent: true,
  opacity: 0.06,
});
const ring1 = new THREE.Mesh(ringGeo, ringMat);
ring1.rotation.x = Math.PI / 3;
scene.add(ring1);

const ring2 = new THREE.Mesh(
  new THREE.TorusGeometry(28, 0.04, 4, 60),
  new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.05 })
);
ring2.rotation.x = -Math.PI / 4;
ring2.rotation.y = Math.PI / 6;
scene.add(ring2);

// Mouse influence
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
});

// Clock
const clock = new THREE.Clock();

// Animate
function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  // Rotate particles slowly
  particles.rotation.y = t * 0.015 + mouseX * 0.08;
  particles.rotation.x = t * 0.008 + mouseY * 0.04;

  // Wireframe rotation
  wireMesh.rotation.y = t * 0.04;
  wireMesh.rotation.x = t * 0.02;

  // Rings
  ring1.rotation.z = t * 0.025;
  ring2.rotation.z = -t * 0.018;
  ring2.rotation.x = -Math.PI / 4 + t * 0.01;

  // Camera gentle sway
  camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
  camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// ── IMAGE FRAME 3D MOUSE TILT ────────────────
const imageFrame = document.querySelector('.image-frame');
const heroRight = document.querySelector('.hero-right');

if (imageFrame && heroRight) {
  heroRight.addEventListener('mousemove', (e) => {
    const rect = imageFrame.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    imageFrame.style.transform = `
      perspective(800px)
      rotateX(${-dy * 12}deg)
      rotateY(${dx * 12}deg)
      scale3d(1.03, 1.03, 1.03)
    `;
  });

  heroRight.addEventListener('mouseleave', () => {
    imageFrame.style.transform = `
      perspective(800px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;
    imageFrame.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });

  heroRight.addEventListener('mouseenter', () => {
    imageFrame.style.transition = 'transform 0.1s ease';
  });
}


// ── SKILL BLOCKS 3D TILT ─────────────────────
document.querySelectorAll('.skill-block').forEach(block => {
  block.addEventListener('mousemove', (e) => {
    const rect = block.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    block.style.transform = `
      perspective(400px)
      rotateX(${-dy * 10}deg)
      rotateY(${dx * 10}deg)
      translateY(-8px)
      scale(1.05)
    `;
  });

  block.addEventListener('mouseleave', () => {
    block.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    block.style.transform = 'perspective(400px) rotateX(0) rotateY(0) translateY(0) scale(1)';
  });

  block.addEventListener('mouseenter', () => {
    block.style.transition = 'transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease';
  });
});


// ── PROJECT CARDS 3D TILT ────────────────────
document.querySelectorAll('.projects-top-grid .project-block, .projects-grid .project-block').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    card.style.transform = `
      perspective(600px)
      rotateX(${-dy * 8}deg)
      rotateY(${dx * 8}deg)
      translateY(-12px)
      scale(1.02)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0) scale(1)';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease';
  });
});


// ── EXPERIENCE BLOCKS TILT ───────────────────
document.querySelectorAll('.experience-block').forEach(block => {
  block.addEventListener('mousemove', (e) => {
    const rect = block.getBoundingClientRect();
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    block.style.transform = `perspective(700px) rotateX(${-dy * 5}deg) translateY(-10px)`;
  });

  block.addEventListener('mouseleave', () => {
    block.style.transition = 'transform 0.5s ease';
    block.style.transform = 'perspective(700px) rotateX(0) translateY(0)';
  });
  block.addEventListener('mouseenter', () => {
    block.style.transition = 'transform 0.15s ease';
  });
});


// ── STATS COUNT-UP ANIMATION ─────────────────
const statNums = document.querySelectorAll('.stats h3');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent.trim();
      const match = text.match(/(\d+\.?\d*)/);
      if (match) {
        const target = parseFloat(match[1]);
        const suffix = text.replace(match[1], '').trim();
        let start = 0;
        const step = target / 40;
        const img = el.querySelector('img');
        const interval = setInterval(() => {
          start += step;
          if (start >= target) {
            start = target;
            clearInterval(interval);
          }
          el.textContent = (Number.isInteger(target) ? Math.floor(start) : start.toFixed(1)) + suffix;
          if (img) el.appendChild(img);
        }, 30);
      }
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statsObserver.observe(el));


// ── GLITCH EFFECT ON HERO H1 ─────────────────
const heroH1 = document.querySelector('.hero-left h1');
if (heroH1) {
  let glitching = false;
  setInterval(() => {
    if (glitching) return;
    glitching = true;
    heroH1.style.filter = 'drop-shadow(2px 0 0 rgba(0,245,255,0.8)) drop-shadow(-2px 0 0 rgba(168,85,247,0.8))';
    heroH1.style.transform = 'translate(1px, 0)';
    setTimeout(() => {
      heroH1.style.filter = '';
      heroH1.style.transform = '';
      glitching = false;
    }, 120);
  }, 5000);
}


// ── SECTION HEADING TYPEWRITER ───────────────
// Add pulsing glow to section headings when they enter view
const headingObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'none';
      entry.target.offsetHeight; // reflow
      entry.target.style.animation = '';
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.about h2, .experience h2, .skills h2, .projects h2').forEach(h => {
  headingObserver.observe(h);
});

})();
