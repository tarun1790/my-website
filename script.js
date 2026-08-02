/* ==========================================================================
   TARUN JAMPANI PORTFOLIO INTERACTIVE LOGIC (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Global State Datasets
  let projectsData = [];
  let certsData = [];

  // Initialize All Systems
  initCanvasBackground();
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
   1. CANVAS AMBIENT PARTICLE CONSTELLATION
   ========================================================================== */
function initCanvasBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 18), 70);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.8,
      color: Math.random() > 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(56, 189, 248, '
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw particles & links
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.6)';
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    "Full-Stack Engineer & AI Developer",
    "AI Agent Memory & LLM Architect",
    "Cyber Security & Reverse Engineering Specialist",
    "Open Source Software Developer (16 Repos)",
    "Machine Learning & Telemetry Specialist"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = 2200; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   3. NAVIGATION & SCROLL HIGHLIGHT
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Active navigation highlight based on scroll position
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   4. DEVELOPER CLI TERMINAL
   ========================================================================== */
function initTerminal() {
  const output = document.getElementById('terminal-output');
  const input = document.getElementById('terminal-input');
  const clearBtn = document.getElementById('t-clear-btn');
  const copyBtn = document.getElementById('t-copy-btn');
  const quickPills = document.querySelectorAll('.cmd-pill');

  if (!output || !input) return;

  const neofetchOutput = `
<span class="t-cyan">tarun@tarun1790</span>
----------------------------------------------------
<span class="t-purple">OS:</span> Windows 11 / Linux (Ubuntu)
<span class="t-purple">Uptime:</span> Active on GitHub since Dec 2023
<span class="t-purple">Host:</span> Custom AI Engineering Workstation
<span class="t-purple">Role:</span> Full-Stack Engineer & AI Developer
<span class="t-purple">Languages:</span> Python, TypeScript, JavaScript, C++, SQL, HTML5/CSS3
<span class="t-purple">Frameworks:</span> PyTorch, Next.js, React, Node.js, Express, Tailwind
<span class="t-purple">Status:</span> <span class="t-green">[ONLINE]</span> Building Next-Gen AI Apps
<span class="t-purple">GitHub Stats:</span> 16 Public Repos | 14 Open Source Projects
<span class="t-purple">Contact:</span> tarun.jampani45@gmail.com | linkedin.com/in/tarun-jampani-958329299
----------------------------------------------------
`;

  function appendLine(text, isCommand = false) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    if (isCommand) {
      line.innerHTML = `<span class="t-prompt">tarun@tarun1790:~$</span> <span class="t-cyan">${escapeHtml(text)}</span>`;
    } else {
      line.innerHTML = text;
    }
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  // Initial welcome message
  appendLine(`Welcome to Tarun Jampani's Interactive CLI v2.0`);
  appendLine(`Type '<span class="t-yellow">neofetch</span>', '<span class="t-yellow">skills</span>', '<span class="t-yellow">projects</span>', or '<span class="t-yellow">help</span>' to explore.`);
  appendLine(neofetchOutput);

  function executeCommand(cmdStr) {
    const cmd = cmdStr.trim().toLowerCase();
    appendLine(cmdStr, true);

    switch (cmd) {
      case 'help':
        appendLine(`
Available Commands:
  <span class="t-yellow">neofetch</span>       Display profile & system stats
  <span class="t-yellow">skills</span>         List core engineering skills & frameworks
  <span class="t-yellow">projects</span>       List top featured GitHub repositories
  <span class="t-yellow">certs</span>          View technical certifications
  <span class="t-yellow">contact</span>        Show contact handles & email
  <span class="t-yellow">whoami</span>         Print current role summary
  <span class="t-yellow">quote</span>          Output favorite developer philosophy
  <span class="t-yellow">clear</span>          Clear terminal window
`);
        break;
      case 'neofetch':
        appendLine(neofetchOutput);
        break;
      case 'skills':
        appendLine(`
<span class="t-cyan">=== TECH STACK MATRIX ===</span>
* <span class="t-purple">Languages:</span> Python (Expert), TypeScript, JavaScript, C++, SQL
* <span class="t-purple">AI & ML:</span> PyTorch, GraphRAG, XGBoost, Autoencoders, Reinforcement Learning
* <span class="t-purple">Web Dev:</span> React, Next.js, Node.js, Express, HTML5, CSS3 Glassmorphism
* <span class="t-purple">Systems:</span> Linux, Docker, Git, VS Code, Windows 11, Security Router
`);
        break;
      case 'projects':
        appendLine(`
<span class="t-cyan">=== TOP FEATURED REPOSITORIES ===</span>
1. <span class="t-yellow">TencentDB-Agent-Memory</span> - Team-level AI agent memory hub (Python)
2. <span class="t-yellow">reverse-skill</span> - Security & penetration testing AI router pack (Python)
3. <span class="t-yellow">worldmonitor</span> - Real-time global intelligence dashboard (TypeScript)
4. <span class="t-yellow">industry-equipment-predictive-maintenance</span> - Industrial IoT telemetry ML (TypeScript)
5. <span class="t-yellow">IoT-sensor-anomaly-detection</span> - Unsupervised streaming anomaly detection (Python)
6. <span class="t-yellow">XGBoost-for-Credit-Risk-Assessment</span> - Credit risk classification engine (Python)
`);
        break;
      case 'certs':
        appendLine(`
<span class="t-cyan">=== CERTIFICATIONS ===</span>
[1] Machine Learning & Deep Learning Specialization (DeepLearning.AI)
[2] Full-Stack Software Engineering Professional (Meta)
[3] AI Agent Systems & LLM Memory Architecture
[4] Cyber Security & Authorized Penetration Testing
[5] Python Data Science & Algorithmic Problem Solving
`);
        break;
      case 'contact':
        appendLine(`
<span class="t-cyan">=== CONTACT INFORMATION ===</span>
Email:     tarun.jampani45@gmail.com
GitHub:    https://github.com/tarun1790
LinkedIn:  https://www.linkedin.com/in/tarun-jampani-958329299/
Discord:   tarun1790
`);
        break;
      case 'whoami':
        appendLine(`Tarun Jampani — Full-Stack Engineer & AI Developer based in India.`);
        break;
      case 'quote':
        appendLine(`<span class="t-green">"Building the future with code, AI agents, and custom software."</span>`);
        break;
      case 'clear':
        output.innerHTML = '';
        break;
      case '':
        break;
      default:
        appendLine(`Command not recognized: '<span class="t-yellow">${escapeHtml(cmdStr)}</span>'. Type '<span class="t-green">help</span>' for command list.`);
    }
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value;
      input.value = '';
      executeCommand(val);
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      output.innerHTML = '';
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(output.innerText);
      showToast('Terminal output copied to clipboard!');
    });
  }

  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      if (cmd) executeCommand(cmd);
    });
  });
}

/* ==========================================================================
   5. SKILLS MATRIX DATA & RENDERER
   ========================================================================== */
const skillsDataset = [
  { name: 'Python 3', category: 'languages', level: 95, icon: 'fa-brands fa-python', catLabel: 'Languages' },
  { name: 'TypeScript', category: 'languages', level: 90, icon: 'fa-code', catLabel: 'Languages' },
  { name: 'JavaScript (ES6+)', category: 'languages', level: 92, icon: 'fa-brands fa-js', catLabel: 'Languages' },
  { name: 'C++', category: 'languages', level: 82, icon: 'fa-terminal', catLabel: 'Languages' },
  { name: 'HTML5 & CSS3', category: 'languages', level: 95, icon: 'fa-brands fa-html5', catLabel: 'Languages' },
  { name: 'SQL & Relational DB', category: 'languages', level: 88, icon: 'fa-database', catLabel: 'Languages' },

  { name: 'React & Next.js', category: 'frameworks', level: 90, icon: 'fa-brands fa-react', catLabel: 'Frameworks' },
  { name: 'Node.js & Express', category: 'frameworks', level: 88, icon: 'fa-brands fa-node-js', catLabel: 'Frameworks' },
  { name: 'Tailwind CSS & Glassmorphism', category: 'frameworks', level: 92, icon: 'fa-palette', catLabel: 'Frameworks' },
  { name: 'REST APIs & WebSockets', category: 'frameworks', level: 90, icon: 'fa-network-wired', catLabel: 'Frameworks' },

  { name: 'PyTorch & Neural Nets', category: 'ai', level: 92, icon: 'fa-brain', catLabel: 'AI & ML' },
  { name: 'AI Agent Memory / GraphRAG', category: 'ai', level: 95, icon: 'fa-robot', catLabel: 'AI & ML' },
  { name: 'XGBoost & Scikit-Learn', category: 'ai', level: 88, icon: 'fa-chart-line', catLabel: 'AI & ML' },
  { name: 'Anomaly Detection & Telemetry', category: 'ai', level: 90, icon: 'fa-wave-square', catLabel: 'AI & ML' },

  { name: 'Reverse Engineering & Security', category: 'tools', level: 86, icon: 'fa-shield-halved', catLabel: 'Security' },
  { name: 'Git & GitHub Actions', category: 'tools', level: 94, icon: 'fa-brands fa-git-alt', catLabel: 'DevOps' },
  { name: 'Docker & Containers', category: 'tools', level: 85, icon: 'fa-brands fa-docker', catLabel: 'DevOps' },
  { name: 'Linux / Windows System Admin', category: 'tools', level: 90, icon: 'fa-brands fa-linux', catLabel: 'Systems' }
];

function initSkills() {
  const container = document.getElementById('skills-container');
  const tabs = document.querySelectorAll('.skill-tab');
  if (!container) return;

  function renderSkills(filter = 'all') {
    container.innerHTML = '';
    const list = filter === 'all' ? skillsDataset : skillsDataset.filter(s => s.category === filter);

    list.forEach(s => {
      const card = document.createElement('div');
      card.className = 'skill-card glass-panel';
      card.innerHTML = `
        <div class="skill-card-icon"><i class="${s.icon}"></i></div>
        <div class="skill-card-info">
          <div class="skill-name">${escapeHtml(s.name)}</div>
          <div class="skill-cat">${escapeHtml(s.catLabel)} • ${s.level}%</div>
          <div class="skill-progress-bg">
            <div class="skill-progress-bar" style="width: ${s.level}%;"></div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-tab');
      renderSkills(cat);
    });
  });

  renderSkills('all');
}

/* ==========================================================================
   6. LOAD PROJECTS & CERTIFICATIONS DATA & RENDER
   ========================================================================== */
async function loadDataAndRender() {
  try {
    const pResp = await fetch('data/projects.json');
    if (pResp.ok) {
      projectsData = await pResp.json();
    }
  } catch (e) {
    console.log('Using embedded fallback projects data');
  }

  try {
    const cResp = await fetch('data/certifications.json');
    if (cResp.ok) {
      certsData = await cResp.json();
    }
  } catch (e) {
    console.log('Using embedded fallback certifications data');
  }

  renderProjects('all', '');
  renderCertifications();
  initProjectFilters();
}

function renderProjects(filterCategory = 'all', searchQuery = '') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = '';

  let filtered = projectsData.filter(p => {
    const matchCat = filterCategory === 'all' || p.category === filterCategory;
    const matchSearch = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery) ||
      p.language.toLowerCase().includes(searchQuery) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery));
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--text-secondary);">No projects matched your filter.</div>`;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card glass-panel';
    card.setAttribute('data-id', p.id);

    const tagsHtml = p.tags.map(t => `<span class="p-tag">${escapeHtml(t)}</span>`).join('');

    card.innerHTML = `
      <div>
        <div class="project-top-row">
          <div class="project-icon-box"><i class="fa-solid ${p.icon || 'fa-code'}"></i></div>
          <div class="project-links">
            <a href="${p.url}" target="_blank" rel="noopener" class="p-link-icon" title="Open GitHub Repo" onclick="event.stopPropagation();">
              <i class="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
        <h3 class="project-title">${escapeHtml(p.title)}</h3>
        <p class="project-desc">${escapeHtml(p.description)}</p>
        <div class="project-tags">${tagsHtml}</div>
      </div>
      <div class="project-footer-meta">
        <div class="p-lang">
          <span class="lang-dot"></span>
          <span>${escapeHtml(p.language)}</span>
        </div>
        <div><i class="fa-brands fa-github-alt"></i> Open Source</div>
      </div>
    `;

    card.addEventListener('click', () => openProjectModal(p));
    grid.appendChild(card);
  });
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('project-search-input');

  let currentCategory = 'all';
  let currentSearch = '';

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter');
      renderProjects(currentCategory, currentSearch);
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      renderProjects(currentCategory, currentSearch);
    });
  }
}

/* ==========================================================================
   7. CERTIFICATIONS SHOWCASE & MODAL UPLOAD
   ========================================================================== */
function renderCertifications() {
  const grid = document.getElementById('certs-grid');
  if (!grid) return;

  grid.innerHTML = '';

  certsData.forEach(c => {
    const card = document.createElement('div');
    card.className = 'cert-card glass-panel';

    const skillsTags = (c.skills || []).map(s => `<span class="c-skill-tag">${escapeHtml(s)}</span>`).join('');

    card.innerHTML = `
      <div>
        <div class="cert-badge-header">
          <img src="${c.badgeUrl || 'assets/cert_badge.jpg'}" alt="Badge" class="cert-img-thumb" onerror="this.src='assets/cert_badge.jpg'">
          <div>
            <h3 class="cert-title">${escapeHtml(c.title)}</h3>
            <span class="cert-issuer">${escapeHtml(c.issuer)}</span>
          </div>
        </div>
        <p class="cert-desc">${escapeHtml(c.description)}</p>
        <div class="cert-skills-wrap">${skillsTags}</div>
      </div>
      <div class="cert-meta-row">
        <span><i class="fa-regular fa-calendar-check"></i> Issued ${escapeHtml(c.date)}</span>
        <a href="${c.verificationUrl}" target="_blank" rel="noopener" class="btn-outline" style="padding: 4px 12px; font-size: 0.8rem;" onclick="event.stopPropagation();">
          Verify LinkedIn / Credential <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    `;

    card.addEventListener('click', () => openCertModal(c));
    grid.appendChild(card);
  });
}

/* ==========================================================================
   8. MODALS ENGINE
   ========================================================================== */
function initModals() {
  const projectModal = document.getElementById('project-modal');
  const projectModalClose = document.getElementById('project-modal-close');
  const certModal = document.getElementById('cert-modal');
  const certModalClose = document.getElementById('cert-modal-close');
  const uploadTrigger = document.getElementById('upload-cert-trigger-btn');

  if (projectModalClose) {
    projectModalClose.addEventListener('click', () => projectModal.classList.remove('active'));
  }
  if (certModalClose) {
    certModalClose.addEventListener('click', () => certModal.classList.remove('active'));
  }

  window.addEventListener('click', (e) => {
    if (e.target === projectModal) projectModal.classList.remove('active');
    if (e.target === certModal) certModal.classList.remove('active');
  });

  if (uploadTrigger) {
    uploadTrigger.addEventListener('click', openUploadCertModal);
  }
}

function openProjectModal(p) {
  const modal = document.getElementById('project-modal');
  const body = document.getElementById('project-modal-content');
  if (!modal || !body) return;

  const tagsHtml = p.tags.map(t => `<span class="p-tag">${escapeHtml(t)}</span>`).join('');

  body.innerHTML = `
    <div style="display:flex; align-items:center; gap: 16px; margin-bottom: 20px;">
      <div class="project-icon-box" style="width: 60px; height: 60px; font-size: 1.8rem;"><i class="fa-solid ${p.icon || 'fa-code'}"></i></div>
      <div>
        <h2 style="font-family: var(--font-title); font-size: 1.8rem;">${escapeHtml(p.title)}</h2>
        <span style="color: var(--accent-cyan); font-family: var(--font-code); font-size: 0.9rem;">${escapeHtml(p.name)}</span>
      </div>
    </div>

    <p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 24px;">
      ${escapeHtml(p.description)}
    </p>

    <div style="margin-bottom: 24px;">
      <h4 style="margin-bottom: 10px; color: var(--text-main);">Tech Stack & Topics</h4>
      <div class="project-tags">${tagsHtml}</div>
    </div>

    <div style="background: rgba(0,0,0,0.4); padding: 16px; border-radius: 10px; font-family: var(--font-code); margin-bottom: 24px;">
      <div style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 6px;">Git Clone URL:</div>
      <div style="display:flex; justify-content:space-between; align-items:center; color: var(--accent-cyan);">
        <span>git clone ${p.url}.git</span>
        <button class="copy-small-btn" data-copy="git clone ${p.url}.git" title="Copy"><i class="fa-regular fa-copy"></i></button>
      </div>
    </div>

    <div style="display:flex; gap: 16px;">
      <a href="${p.url}" target="_blank" rel="noopener" class="btn-primary">
        <i class="fa-brands fa-github"></i> View GitHub Repository
      </a>
    </div>
  `;

  initCopyButtons();
  modal.classList.add('active');
}

function openCertModal(c) {
  const modal = document.getElementById('cert-modal');
  const body = document.getElementById('cert-modal-content');
  if (!modal || !body) return;

  const skillsTags = (c.skills || []).map(s => `<span class="c-skill-tag">${escapeHtml(s)}</span>`).join('');

  body.innerHTML = `
    <div style="text-align:center; margin-bottom: 24px;">
      <img src="${c.badgeUrl || 'assets/cert_badge.jpg'}" alt="Certificate Badge" style="width: 120px; height: 120px; border-radius: 20px; object-fit: cover; border: 2px solid var(--accent-blue); margin-bottom: 16px;" onerror="this.src='assets/cert_badge.jpg'">
      <h2 style="font-family: var(--font-title); font-size: 1.8rem; margin-bottom: 6px;">${escapeHtml(c.title)}</h2>
      <span style="color: var(--accent-blue); font-weight: 600;">${escapeHtml(c.issuer)}</span>
    </div>

    <p style="color: var(--text-secondary); font-size: 1rem; line-height: 1.7; margin-bottom: 20px;">
      ${escapeHtml(c.description)}
    </p>

    <div style="margin-bottom: 20px;">
      <h4 style="margin-bottom: 8px;">Verified Skills:</h4>
      <div class="cert-skills-wrap">${skillsTags}</div>
    </div>

    <div style="background: rgba(255,255,255,0.03); padding: 16px; border-radius: 12px; margin-bottom: 24px; font-size: 0.9rem; color: var(--text-secondary);">
      <div><strong>Credential ID:</strong> ${escapeHtml(c.credentialId || 'Verified')}</div>
      <div><strong>Issue Date:</strong> ${escapeHtml(c.date)}</div>
    </div>

    <div style="display:flex; justify-content:center;">
      <a href="${c.verificationUrl}" target="_blank" rel="noopener" class="btn-primary">
        <i class="fa-solid fa-shield-check"></i> View Verification / LinkedIn Details
      </a>
    </div>
  `;

  modal.classList.add('active');
}

function openUploadCertModal() {
  const modal = document.getElementById('cert-modal');
  const body = document.getElementById('cert-modal-content');
  if (!modal || !body) return;

  body.innerHTML = `
    <h2 style="font-family: var(--font-title); font-size: 1.8rem; margin-bottom: 16px;"><i class="fa-solid fa-file-arrow-up"></i> Upload / Add Certification</h2>
    <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 24px;">Add a new technical certificate or credential to your portfolio showcase.</p>

    <form id="new-cert-form">
      <div class="form-group">
        <label>Certification Title</label>
        <input type="text" id="add-cert-title" required placeholder="e.g. AWS Certified Solutions Architect">
      </div>

      <div class="form-group">
        <label>Issuing Organization / Provider</label>
        <input type="text" id="add-cert-issuer" required placeholder="e.g. Amazon Web Services / LinkedIn Learning">
      </div>

      <div class="form-group">
        <label>Issue Date / Year</label>
        <input type="text" id="add-cert-date" required placeholder="e.g. 2026">
      </div>

      <div class="form-group">
        <label>Verification URL or LinkedIn Certificate Link</label>
        <input type="url" id="add-cert-url" required placeholder="https://www.linkedin.com/in/tarun-jampani-958329299/">
      </div>

      <div class="form-group">
        <label>Skills Verified (comma separated)</label>
        <input type="text" id="add-cert-skills" placeholder="e.g. Cloud Computing, Docker, Machine Learning">
      </div>

      <div class="form-group">
        <label>Short Description</label>
        <textarea id="add-cert-desc" rows="3" required placeholder="Brief description of skills covered..."></textarea>
      </div>

      <button type="submit" class="btn-primary" style="width: 100%; justify-content: center;">
        <i class="fa-solid fa-plus"></i> Save Certification to Showcase
      </button>
    </form>
  `;

  modal.classList.add('active');

  const form = document.getElementById('new-cert-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newCert = {
        id: 'cert-' + (certsData.length + 1),
        title: document.getElementById('add-cert-title').value,
        issuer: document.getElementById('add-cert-issuer').value,
        date: document.getElementById('add-cert-date').value,
        verificationUrl: document.getElementById('add-cert-url').value,
        skills: document.getElementById('add-cert-skills').value.split(',').map(s => s.trim()).filter(Boolean),
        description: document.getElementById('add-cert-desc').value,
        badgeUrl: 'assets/cert_badge.jpg'
      };

      certsData.unshift(newCert);
      renderCertifications();
      modal.classList.remove('active');
      showToast('New certification added successfully!');
    });
  }
}

/* ==========================================================================
   9. CONTACT FORM & TOAST NOTIFICATIONS
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    // Launch mailto fallback
    window.location.href = `mailto:tarun.jampani45@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;

    showToast(`Thank you ${name}! Opening email client...`);
    form.reset();
  });
}

function initCopyButtons() {
  document.querySelectorAll('.copy-small-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const text = btn.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text);
        showToast(`Copied to clipboard: "${text}"`);
      }
    };
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-emerald);"></i> <span>${escapeHtml(message)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
