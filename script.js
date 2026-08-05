/* ==========================================================================
   TARUN JAMPANI 3D PORTFOLIO ENGINE (script.js)
   WebGL 3D Scene (Three.js) + Classic Dark Theme + Authentic Icons
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Global State Datasets
  let projectsData = [];
  let certsData = [];

  // Initialize Systems
  initThreeJS();
  initTypingEffect();
  initNavigation();
  initTerminal();
  initSkills();
  loadDataAndRender();
  initContactForm();
  initCopyButtons();
  initModals();
});

/* ==========================================================================
   1. THREE.JS 3D WEBGL INTERACTIVE SCENE (PROMINENT & CLEAN)
   ========================================================================== */
function initThreeJS() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 28;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 1. Prominent 3D Geodesic Cyber Wireframe Sphere
  const sphereGeo = new THREE.IcosahedronGeometry(18, 2);
  const sphereMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });
  const cyberSphere = new THREE.Mesh(sphereGeo, sphereMat);
  cyberSphere.position.set(0, 0, -5);
  scene.add(cyberSphere);

  // 2. Inner 3D Rotating Cyber TorusKnot
  const torusGeo = new THREE.TorusKnotGeometry(9, 2.5, 100, 16);
  const torusMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const torusKnot = new THREE.Mesh(torusGeo, torusMat);
  torusKnot.position.set(0, 0, -5);
  scene.add(torusKnot);

  // 3. Floating 3D Star Constellation Field (2000 Particles)
  const particlesCount = 2000;
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  const colorOptions = [
    new THREE.Color(0x38bdf8),
    new THREE.Color(0x0284c7),
    new THREE.Color(0x7dd3fc),
    new THREE.Color(0xffffff)
  ];

  for (let i = 0; i < particlesCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 140;
    positions[i + 1] = (Math.random() - 0.5) * 140;
    positions[i + 2] = (Math.random() - 0.5) * 140;

    const chosenColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    colors[i] = chosenColor.r;
    colors[i + 1] = chosenColor.g;
    colors[i + 2] = chosenColor.b;
  }

  const particlesGeo = new THREE.BufferGeometry();
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particlesMat = new THREE.PointsMaterial({
    size: 0.8,
    vertexColors: true,
    transparent: true,
    opacity: 0.85
  });

  const particleSystem = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particleSystem);

  // Ambient Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  // Smooth Mouse Parallax Tracking
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.0012;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.0012;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animate3D() {
    requestAnimationFrame(animate3D);

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    cyberSphere.rotation.x += 0.003;
    cyberSphere.rotation.y += 0.005;

    torusKnot.rotation.x -= 0.004;
    torusKnot.rotation.y -= 0.006;

    particleSystem.rotation.y += 0.001;
    particleSystem.rotation.x += 0.0005;

    scene.rotation.y = targetX * 1.5;
    scene.rotation.x = -targetY * 1.5;

    renderer.render(scene, camera);
  }

  animate3D();
}

/* ==========================================================================
   2. TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const typingText = document.getElementById('typing-text');
  if (!typingText) return;

  const phrases = [
    "Full-Stack Software Engineer & System Architect",
    "AI Agent & Multi-Agent Memory Engineer",
    "Machine Learning & Deep Learning Specialist",
    "Reverse Engineering & Security Tools Developer"
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && charIdx === currentPhrase.length) {
      typeSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   3. NAVIGATION & SCROLLSPY
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let currentSection = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.querySelector('i').classList.toggle('fa-bars');
      mobileToggle.querySelector('i').classList.toggle('fa-xmark');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

/* ==========================================================================
   4. INTERACTIVE TERMINAL SYSTEM
   ========================================================================== */
function initTerminal() {
  const output = document.getElementById('terminal-output');
  const input = document.getElementById('terminal-input');
  const clearBtn = document.getElementById('t-clear-btn');
  const copyBtn = document.getElementById('t-copy-btn');

  if (!output || !input) return;

  const history = [];
  let historyIdx = -1;

  const welcomeBanner = `
<span class="t-cyan">===============================================================</span>
<span class="t-cyan">           TARUN JAMPANI DEVELOPER TERMINAL v12.0              </span>
<span class="t-cyan">===============================================================</span>
Type <span class="t-green">'help'</span> to view available commands or click quick action pills below.
`;

  output.innerHTML = `<div class="terminal-line">${welcomeBanner}</div>`;

  const commands = {
    help: `
Available Commands:
  <span class="t-green">neofetch</span>  - Display system profile & metrics summary
  <span class="t-green">skills</span>    - List core tech stack & engineering skills
  <span class="t-green">projects</span>  - Show top open source GitHub projects
  <span class="t-green">certs</span>     - Display verified 10 certifications
  <span class="t-green">contact</span>   - Print direct email & social handles
  <span class="t-green">clear</span>     - Clear terminal screen
`,
    neofetch: `
<span class="t-cyan">        ./tarun1790</span>       ---------------------------
<span class="t-cyan">       /  _   _  \\</span>      <span class="t-green">User:</span> Tarun Jampani
<span class="t-cyan">      |  (o) (o)  |</span>     <span class="t-green">Role:</span> Full-Stack & AI Engineer
<span class="t-cyan">      |     <     |</span>     <span class="t-green">GitHub:</span> github.com/tarun1790
<span class="t-cyan">       \\  '---'  /</span>      <span class="t-green">Certifications:</span> 10 Verified Credentials
<span class="t-cyan">        '-------'</span>       <span class="t-green">Projects:</span> 14 Open Source Repositories
                        <span class="t-green">Primary OS:</span> Windows 11 / Linux
`,
    skills: `
<span class="t-purple">PROGRAMMING LANGUAGES:</span> Python, TypeScript, JavaScript, C++, SQL, HTML5, CSS3
<span class="t-purple">FRAMEWORKS & WEB:</span> React, Node.js, Express, REST APIs, Tailwind CSS, GraphRAG
<span class="t-purple">AI & MACHINE LEARNING:</span> PyTorch, TensorFlow, XGBoost, Scikit-Learn, OpenCV, LLM Memory
<span class="t-purple">DEV & SECURITY:</span> Git, Docker, Windows API, Reverse Engineering, Linux, CI/CD
`,
    projects: `
<span class="t-yellow">TOP GITHUB PROJECTS (14):</span>
  1. <span class="t-cyan">TencentDB Agent Memory System</span> - Stateful multi-agent LLM governance framework
  2. <span class="t-cyan">Reverse Skill & Security Pack</span> - Pentesting & security automation toolchain
  3. <span class="t-cyan">Industrial AI Telemetry Predictor</span> - Deep Learning IoT sensor failure predictor
  4. <span class="t-cyan">AQI Atmospheric Forecasting Engine</span> - LSTM neural network air quality model
  5. <span class="t-cyan">WorldMonitor Intelligence Dashboard</span> - Real-time global situation map & data miner
`,
    certs: `
<span class="t-yellow">VERIFIED CERTIFICATIONS (10):</span>
  1. Oracle Cloud Infrastructure 2024 Generative AI Certified Professional
  2. Oracle Autonomous Database Cloud 2024 Certified Specialist
  3. NPTEL Elite Certificate - Data Science for Engineers (IIT Madras / 81%)
  4. Google Cloud Generative AI Fundamentals
  5. DeepTech DSA Certification - IIT Bombay Techfest
  6. HP LIFE Data Science & Analytics
  7. Infosys Python Programmer 1 & 2
  8. Infosys Agile Software Development
  9. IBMI Berlin Data Science Certification
`,
    contact: `
<span class="t-cyan">Email:</span> tarun.jampani45@gmail.com
<span class="t-cyan">LinkedIn:</span> linkedin.com/in/tarun-jampani-958329299/
<span class="t-cyan">GitHub:</span> github.com/tarun1790
<span class="t-cyan">Discord:</span> tarun1790
`
  };

  function executeCommand(cmdStr) {
    const rawCmd = cmdStr.trim().toLowerCase();

    const cmdLine = document.createElement('div');
    cmdLine.className = 'terminal-line';
    cmdLine.innerHTML = `<span class="t-prompt">tarun@tarun1790:~$</span> ${escapeHtml(cmdStr)}`;
    output.appendChild(cmdLine);

    if (rawCmd === 'clear') {
      output.innerHTML = '';
      return;
    }

    const respLine = document.createElement('div');
    respLine.className = 'terminal-line';

    if (commands[rawCmd]) {
      respLine.innerHTML = commands[rawCmd];
    } else if (rawCmd !== '') {
      respLine.innerHTML = `<span style="color:#ef4444;">zsh: command not found: ${escapeHtml(rawCmd)}. Type 'help' for available options.</span>`;
    }

    output.appendChild(respLine);
    output.scrollTop = output.scrollHeight;
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value;
      if (val.trim() !== '') {
        history.push(val);
        historyIdx = history.length;
      }
      executeCommand(val);
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      if (historyIdx > 0) {
        historyIdx--;
        input.value = history[historyIdx];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIdx < history.length - 1) {
        historyIdx++;
        input.value = history[historyIdx];
      } else {
        historyIdx = history.length;
        input.value = '';
      }
    }
  });

  document.querySelectorAll('.cmd-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.dataset.cmd;
      executeCommand(cmd);
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      output.innerHTML = '';
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = output.innerText;
      navigator.clipboard.writeText(text);
      showToast('Terminal output copied to clipboard!');
    });
  }
}

/* ==========================================================================
   5. SKILLS MATRIX RENDERER
   ========================================================================== */
function initSkills() {
  const container = document.getElementById('skills-container');
  const tabs = document.querySelectorAll('.skill-tab');
  if (!container) return;

  const skillsData = [
    { name: "Python", cat: "languages", icon: "fa-brands fa-python", level: 95 },
    { name: "TypeScript / JavaScript", cat: "languages", icon: "fa-brands fa-js", level: 90 },
    { name: "C++", cat: "languages", icon: "fa-solid fa-code", level: 85 },
    { name: "HTML5 & CSS3", cat: "languages", icon: "fa-brands fa-html5", level: 95 },
    { name: "React", cat: "frameworks", icon: "fa-brands fa-react", level: 90 },
    { name: "Node.js & Express", cat: "frameworks", icon: "fa-brands fa-node-js", level: 88 },
    { name: "REST APIs & Web Systems", cat: "frameworks", icon: "fa-solid fa-layer-group", level: 92 },
    { name: "GraphRAG & Agent Memory", cat: "ai", icon: "fa-solid fa-brain", level: 92 },
    { name: "PyTorch & TensorFlow", cat: "ai", icon: "fa-solid fa-robot", level: 88 },
    { name: "Scikit-Learn & XGBoost", cat: "ai", icon: "fa-solid fa-chart-line", level: 90 },
    { name: "Docker & Containerization", cat: "tools", icon: "fa-brands fa-docker", level: 85 },
    { name: "Git & Version Control", cat: "tools", icon: "fa-brands fa-git-alt", level: 95 },
    { name: "Reverse Engineering", cat: "tools", icon: "fa-solid fa-shield-halved", level: 86 },
    { name: "SQL & Databases", cat: "tools", icon: "fa-solid fa-database", level: 88 }
  ];

  function renderSkills(category = 'all') {
    container.innerHTML = '';
    const filtered = category === 'all' ? skillsData : skillsData.filter(s => s.cat === category);

    filtered.forEach(s => {
      const card = document.createElement('div');
      card.className = 'skill-card glass-panel';
      card.innerHTML = `
        <div class="skill-card-icon"><i class="${s.icon}"></i></div>
        <div class="skill-card-info">
          <div class="skill-name">${escapeHtml(s.name)}</div>
          <div class="skill-cat">${escapeHtml(s.cat.toUpperCase())}</div>
          <div class="skill-progress-bg">
            <div class="skill-progress-bar" style="width: ${s.level}%;"></div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  renderSkills('all');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderSkills(tab.dataset.tab);
    });
  });
}

/* ==========================================================================
   6. LOAD DATA & RENDER PROJECTS & CERTIFICATIONS
   ========================================================================== */
async function loadDataAndRender() {
  try {
    const certsResp = await fetch('data/certifications.json?v=12.0');
    if (certsResp.ok) {
      certsData = await certsResp.json();
    }
  } catch (err) {
    console.warn('Using fallback cert dataset:', err);
  }

  if (!certsData || certsData.length === 0) {
    certsData = fallbackCerts;
  }

  projectsData = fallbackProjects;

  renderProjects('all', '');
  renderCertifications();

  const searchInput = document.getElementById('project-search-input');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
      renderProjects(activeFilter, query);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const query = searchInput ? searchInput.value.toLowerCase() : '';
      renderProjects(btn.dataset.filter, query);
    });
  });
}

function renderProjects(filter = 'all', query = '') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = '';

  let filtered = projectsData;

  if (filter !== 'all') {
    filtered = filtered.filter(p => p.category === filter);
  }

  if (query) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query))
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--text-dim);">No matching projects found.</div>`;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card glass-panel';
    card.innerHTML = `
      <div class="project-top-row">
        <div class="project-icon-box"><i class="${p.icon || 'fa-solid fa-code'}"></i></div>
        <div class="project-links">
          <a href="${p.url}" target="_blank" rel="noopener" class="p-link-icon" title="View GitHub Repo" onclick="event.stopPropagation();"><i class="fa-brands fa-github"></i></a>
        </div>
      </div>

      <div class="project-title">${escapeHtml(p.name)}</div>
      <div class="project-desc">${escapeHtml(p.description)}</div>

      <div class="project-tags">
        ${p.tags.map(t => `<span class="p-tag">${escapeHtml(t)}</span>`).join('')}
      </div>

      <div class="project-footer-meta">
        <div class="p-lang">
          <span class="lang-dot"></span>
          <span>${escapeHtml(p.language || 'Python')}</span>
        </div>
        <span><i class="fa-solid fa-star" style="color:#f59e0b;"></i> ${p.stars || 0}</span>
      </div>
    `;

    card.addEventListener('click', () => openProjectModal(p));
    grid.appendChild(card);
  });
}

function renderCertifications() {
  const grid = document.getElementById('certs-grid');
  if (!grid) return;

  grid.innerHTML = '';

  certsData.forEach(c => {
    const card = document.createElement('div');
    card.className = 'cert-card glass-panel';
    card.innerHTML = `
      <div class="cert-badge-header">
        <img src="${c.badge || 'assets/tarun_profile.jpg'}" alt="${escapeHtml(c.title)}" class="cert-img-thumb">
        <div>
          <div class="cert-title">${escapeHtml(c.title)}</div>
          <div class="cert-issuer">${escapeHtml(c.issuer)}</div>
        </div>
      </div>

      <div class="cert-desc">${escapeHtml(c.description)}</div>

      <div class="cert-skills-wrap">
        ${(c.skills || []).map(s => `<span class="c-skill-tag">${escapeHtml(s)}</span>`).join('')}
      </div>

      <div class="cert-meta-row">
        <span>Issued: <strong>${escapeHtml(c.date)}</strong></span>
        ${c.verifyUrl ? `<a href="${c.verifyUrl}" target="_blank" rel="noopener" class="btn-gh" style="padding:4px 10px; font-size:0.78rem;" onclick="event.stopPropagation();">Verify Credential</a>` : ''}
      </div>
    `;

    card.addEventListener('click', () => openCertModal(c));
    grid.appendChild(card);
  });
}

/* ==========================================================================
   7. MODALS & FORMS
   ========================================================================== */
function openProjectModal(p) {
  const modal = document.getElementById('project-modal');
  const content = document.getElementById('project-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <h2 style="font-family:var(--font-title); font-size:1.8rem; margin-bottom:12px; color:#ffffff;">${escapeHtml(p.name)}</h2>
    <p style="color:var(--text-secondary); margin-bottom:20px; line-height:1.7;">${escapeHtml(p.description)}</p>
    
    <div style="margin-bottom:20px;">
      <h4 style="color:#38bdf8; margin-bottom:8px;">Technologies & Tools</h4>
      <div class="project-tags">
        ${p.tags.map(t => `<span class="p-tag">${escapeHtml(t)}</span>`).join('')}
      </div>
    </div>

    <div style="display:flex; gap:16px;">
      <a href="${p.url}" target="_blank" rel="noopener" class="btn-primary">
        <i class="fa-brands fa-github"></i> View GitHub Repository
      </a>
    </div>
  `;

  modal.classList.add('active');
}

function openCertModal(c) {
  const modal = document.getElementById('cert-modal');
  const content = document.getElementById('cert-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="display:flex; align-items:center; gap:16px; margin-bottom:16px;">
      <img src="${c.badge || 'assets/tarun_profile.jpg'}" style="width:64px; height:64px; border-radius:14px; object-fit:cover; border:2px solid #38bdf8;">
      <div>
        <h2 style="font-family:var(--font-title); font-size:1.6rem; color:#ffffff;">${escapeHtml(c.title)}</h2>
        <span style="color:#38bdf8; font-weight:700;">${escapeHtml(c.issuer)}</span>
      </div>
    </div>

    <p style="color:var(--text-secondary); margin-bottom:20px; line-height:1.7;">${escapeHtml(c.description)}</p>

    <div style="margin-bottom:24px;">
      <h4 style="color:#38bdf8; margin-bottom:8px;">Verified Skills & Competencies</h4>
      <div class="cert-skills-wrap">
        ${(c.skills || []).map(s => `<span class="c-skill-tag">${escapeHtml(s)}</span>`).join('')}
      </div>
    </div>

    <div style="display:flex; gap:16px;">
      ${c.verifyUrl ? `<a href="${c.verifyUrl}" target="_blank" rel="noopener" class="btn-primary"><i class="fa-solid fa-award"></i> Verify Official Credential</a>` : ''}
    </div>
  `;

  modal.classList.add('active');
}

function initModals() {
  const pModal = document.getElementById('project-modal');
  const cModal = document.getElementById('cert-modal');
  const pClose = document.getElementById('project-modal-close');
  const cClose = document.getElementById('cert-modal-close');

  if (pClose) pClose.addEventListener('click', () => pModal.classList.remove('active'));
  if (cClose) cClose.addEventListener('click', () => cModal.classList.remove('active'));

  window.addEventListener('click', (e) => {
    if (e.target === pModal) pModal.classList.remove('active');
    if (e.target === cModal) cModal.classList.remove('active');
  });

  const uploadBtn = document.getElementById('upload-cert-trigger-btn');
  if (uploadBtn) {
    uploadBtn.addEventListener('click', () => {
      showToast('To add new certifications, feel free to send them via direct message or email!');
    });
  }
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    const mailtoUrl = `mailto:tarun.jampani45@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
    window.location.href = mailtoUrl;

    showToast('Redirecting to your default email client...');
    form.reset();
  });
}

function initCopyButtons() {
  document.querySelectorAll('.copy-small-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.dataset.copy;
      navigator.clipboard.writeText(text);
      showToast(`Copied to clipboard: ${text}`);
    });
  });
}

function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#38bdf8;"></i> <span>${escapeHtml(msg)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, match => {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return map[match];
  });
}

/* ==========================================================================
   FALLBACK DATASETS
   ========================================================================== */
const fallbackProjects = [
  {
    name: "TencentDB Agent Memory System",
    description: "Stateful LLM agent memory governance architecture featuring Chat-Memory, Skill, LLM-Wiki, and Code-Graph indexing.",
    category: "ai",
    tags: ["Python", "LLM", "Agentic Workflows", "Vector DB"],
    language: "Python",
    stars: 12,
    icon: "fa-solid fa-brain",
    url: "https://github.com/tarun1790/TencentDB-Agent-Memory"
  },
  {
    name: "Reverse Skill & Security Pack",
    description: "Pentesting tools, automated reverse engineering routines, and AI router packs for system auditing.",
    category: "security",
    tags: ["C++", "Python", "Security", "Reverse Engineering"],
    language: "C++",
    stars: 18,
    icon: "fa-solid fa-shield-halved",
    url: "https://github.com/tarun1790/Reverse-Skill-Security-Pack"
  },
  {
    name: "Industrial AI Telemetry Predictor",
    description: "Predictive maintenance pipeline utilizing Deep Learning and LSTM neural networks for IoT sensor stream fault prediction.",
    category: "ai",
    tags: ["Python", "PyTorch", "Predictive ML", "IoT"],
    language: "Python",
    stars: 15,
    icon: "fa-solid fa-robot",
    url: "https://github.com/tarun1790/Industrial-AI-Telemetry-Predictor"
  },
  {
    name: "AQI Atmospheric Forecasting Engine",
    description: "Deep learning model forecasting air quality index metrics based on satellite telemetry and meteorological data.",
    category: "ai",
    tags: ["Python", "XGBoost", "Deep Learning", "AQI"],
    language: "Python",
    stars: 9,
    icon: "fa-solid fa-chart-line",
    url: "https://github.com/tarun1790/AQI-Atmospheric-Forecasting-Engine"
  },
  {
    name: "WorldMonitor Intelligence Dashboard",
    description: "Real-time global intelligence dashboard mapping geopolitical telemetry, data mining, and live situational awareness.",
    category: "web",
    tags: ["TypeScript", "React", "REST APIs", "Mapping"],
    language: "TypeScript",
    stars: 22,
    icon: "fa-solid fa-laptop-code",
    url: "https://github.com/tarun1790/WorldMonitor-Intelligence-Dashboard"
  },
  {
    name: "LeetCode Analytics Tracker",
    description: "Automated telemetry logger tracking algorithmic problem-solving speed, runtime complexity, and streak metrics.",
    category: "web",
    tags: ["JavaScript", "Node.js", "Algorithms", "Analytics"],
    language: "JavaScript",
    stars: 7,
    icon: "fa-solid fa-code",
    url: "https://github.com/tarun1790/LeetCode-Analytics-Tracker"
  }
];

const fallbackCerts = [
  {
    title: "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional",
    issuer: "Oracle",
    date: "2024",
    badge: "cert_badge_1785689247252.jpg",
    description: "Verified expertise in Large Language Model (LLM) fine-tuning, OCI Generative AI service deployment, RAG vector pipelines, and prompt engineering.",
    skills: ["OCI GenAI", "LLM Fine-Tuning", "Vector Search", "RAG Systems"],
    verifyUrl: "https://education.oracle.com"
  },
  {
    title: "Oracle Autonomous Database Cloud 2024 Certified Specialist",
    issuer: "Oracle",
    date: "2024",
    badge: "cert_badge_1785689247252.jpg",
    description: "Specialist certification for provisioning, managing, and tuning high-concurrency Oracle Autonomous Data Warehouses and Transaction Processing instances.",
    skills: ["Autonomous DB", "Oracle SQL", "High Availability", "Performance Tuning"],
    verifyUrl: "https://education.oracle.com"
  },
  {
    title: "NPTEL Elite Certificate - Data Science for Engineers",
    issuer: "NPTEL / IIT Madras",
    date: "2024",
    badge: "cert_badge_1785689247252.jpg",
    description: "Scored 81% (Elite Status) in rigorous national engineering exam covering linear algebra, R programming, data wrangling, and predictive modeling.",
    skills: ["Linear Algebra", "Data Wrangling", "R", "Predictive Modeling"],
    verifyUrl: "https://nptel.ac.in"
  },
  {
    title: "Google Cloud Generative AI Fundamentals",
    issuer: "Google Cloud",
    date: "2024",
    badge: "cert_badge_1785689247252.jpg",
    description: "Foundational credential covering Google Cloud Vertex AI, Transformer architecture principles, and responsible AI deployment.",
    skills: ["Vertex AI", "Transformers", "Responsible AI"],
    verifyUrl: "https://cloud.google.com"
  },
  {
    title: "DeepTech DSA Certification",
    issuer: "IIT Bombay Techfest",
    date: "2024",
    badge: "cert_badge_1785689247252.jpg",
    description: "Advanced Data Structures & Algorithms qualification testing asymptotic analysis, graph algorithms, and dynamic programming.",
    skills: ["Graph Theory", "Dynamic Programming", "Asymptotic Analysis"],
    verifyUrl: "https://techfest.org"
  },
  {
    title: "HP LIFE Data Science & Analytics",
    issuer: "HP LIFE",
    date: "2024",
    badge: "cert_badge_1785689247252.jpg",
    description: "Data analytics certification demonstrating business intelligence reporting, data visualization, and statistical modeling.",
    skills: ["Data Analytics", "Business Intelligence", "Visualization"],
    verifyUrl: "https://www.life-global.org"
  },
  {
    title: "Infosys Python Programmer 1 & 2",
    issuer: "Infosys Springboard",
    date: "2024",
    badge: "cert_badge_1785689247252.jpg",
    description: "Comprehensive dual python credential covering object-oriented programming, file I/O, data structures, and exception handling.",
    skills: ["Python OOP", "Data Structures", "Modules"],
    verifyUrl: "https://infyspringboard.onwingspan.com"
  },
  {
    title: "Infosys Agile Software Development",
    issuer: "Infosys Springboard",
    date: "2024",
    badge: "cert_badge_1785689247252.jpg",
    description: "Scrum methodology certification covering sprint planning, continuous integration, user story estimation, and TDD.",
    skills: ["Scrum", "Sprint Planning", "TDD", "CI/CD"],
    verifyUrl: "https://infyspringboard.onwingspan.com"
  },
  {
    title: "IBMI Berlin Data Science Certification",
    issuer: "IBMI Berlin",
    date: "2024",
    badge: "cert_badge_1785689247252.jpg",
    description: "European institute certification in statistical machine learning, data mining, and feature engineering techniques.",
    skills: ["Machine Learning", "Data Mining", "Statistics"],
    verifyUrl: "https://ibmi.de"
  }
];
