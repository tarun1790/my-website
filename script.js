/* ==========================================================================
   TARUN JAMPANI PORTFOLIO LOGIC
   Minimalist Premium Theme (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  let projectsData = [];
  let certsData = [];

  initScrollReveal();
  loadDataAndRender();
  initModals();
});

/* ==========================================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

/* ==========================================================================
   LOAD DATA & RENDER PROJECTS & CERTIFICATIONS
   ========================================================================== */
async function loadDataAndRender() {
  // Use static certification data to prevent any local fetch overhead or failures
  certsData = fallbackCerts;

  // Use static project data to prevent GitHub API rate limits (HTTP 429)
  projectsData = fallbackProjects;

  renderProjects();
  renderCertifications();
}

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = '';

  projectsData.forEach(p => {
    const card = document.createElement('div');
    card.className = 'minimal-card';
    card.innerHTML = `
      <div class="card-title">${escapeHtml(p.name)}</div>
      <div class="card-desc">${escapeHtml(p.description)}</div>
      <div class="card-meta">
        <span><i class="fa-solid fa-code"></i> ${escapeHtml(p.language || 'Code')}</span>
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
    card.className = 'minimal-card';
    card.innerHTML = `
      <div class="card-issuer">${escapeHtml(c.issuer)}</div>
      <div class="card-title">${escapeHtml(c.title)}</div>
      <div class="card-desc">${escapeHtml(c.description)}</div>
      <div class="card-meta">
        <span><i class="fa-solid fa-calendar"></i> ${escapeHtml(c.date)}</span>
      </div>
    `;

    card.addEventListener('click', () => openCertModal(c));
    grid.appendChild(card);
  });
}

/* ==========================================================================
   MODALS
   ========================================================================== */
function openProjectModal(p) {
  const modal = document.getElementById('project-modal');
  const content = document.getElementById('project-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <h2 class="card-title" style="font-size:2rem; margin-bottom:1rem;">${escapeHtml(p.name)}</h2>
    <p style="color:var(--text-muted); margin-bottom:2rem; line-height:1.7; font-size:1.1rem;">${escapeHtml(p.description)}</p>
    
    <div style="margin-bottom:2rem;">
      <h4 style="margin-bottom:1rem; font-family:var(--font-sans); color:var(--text-color);">Technologies & Tools</h4>
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
        ${p.tags.map(t => `<span style="padding:0.4rem 0.8rem; border:1px solid var(--border-color); border-radius:4px; font-size:0.85rem; color:var(--text-muted);">${escapeHtml(t)}</span>`).join('')}
      </div>
    </div>

    <a href="${p.url}" target="_blank" rel="noopener" class="btn-primary" style="text-decoration:none;">
      View Repository <i class="fa-solid fa-arrow-right" style="margin-left:0.5rem;"></i>
    </a>
  `;

  modal.classList.add('active');
}

function openCertModal(c) {
  const modal = document.getElementById('cert-modal');
  const content = document.getElementById('cert-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="card-issuer" style="margin-bottom:1rem;">${escapeHtml(c.issuer)}</div>
    <h2 class="card-title" style="font-size:2rem; margin-bottom:1rem;">${escapeHtml(c.title)}</h2>
    <p style="color:var(--text-muted); margin-bottom:2rem; line-height:1.7; font-size:1.1rem;">${escapeHtml(c.description)}</p>

    <div style="margin-bottom:2rem;">
      <h4 style="margin-bottom:1rem; font-family:var(--font-sans); color:var(--text-color);">Skills</h4>
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
        ${(c.skills || []).map(s => `<span style="padding:0.4rem 0.8rem; border:1px solid var(--border-color); border-radius:4px; font-size:0.85rem; color:var(--text-muted);">${escapeHtml(s)}</span>`).join('')}
      </div>
    </div>

    ${(c.verificationUrl || c.verifyUrl) ? `
      <a href="${c.verificationUrl || c.verifyUrl}" target="_blank" rel="noopener" class="btn-primary" style="text-decoration:none;">
        Verify Credential <i class="fa-solid fa-arrow-right" style="margin-left:0.5rem;"></i>
      </a>
    ` : ''}
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
    description: "Stateful LLM memory architecture integrating LangChain, FAISS vector stores, and Knowledge Graphs for context-aware multi-agent RAG pipelines.",
    category: "ai",
    tags: ["Python", "LLM", "Agentic Workflows", "Vector DB"],
    language: "Python",
    stars: 12,
    url: "https://github.com/tarun1790/TencentDB-Agent-Memory"
  },
  {
    name: "Reverse Skill & Security Pack",
    description: "Automated penetration testing suite utilizing Python automation, Radare2 for reverse engineering, and AI-driven vulnerability routing algorithms.",
    category: "security",
    tags: ["C++", "Python", "Security", "Reverse Engineering"],
    language: "C++",
    stars: 18,
    url: "https://github.com/tarun1790/Reverse-Skill-Security-Pack"
  },
  {
    name: "Industrial AI Telemetry Predictor",
    description: "IoT predictive maintenance pipeline leveraging PyTorch LSTM recurrent neural networks to process time-series telemetry and forecast sensor anomalies.",
    category: "ai",
    tags: ["Python", "PyTorch", "Predictive ML", "IoT"],
    language: "Python",
    stars: 15,
    url: "https://github.com/tarun1790/Industrial-AI-Telemetry-Predictor"
  },
  {
    name: "AQI Atmospheric Forecasting Engine",
    description: "Multi-source deep learning framework utilizing XGBoost and spatial-temporal neural networks to forecast AQI using satellite telemetry data.",
    category: "ai",
    tags: ["Python", "XGBoost", "Deep Learning", "AQI"],
    language: "Python",
    stars: 9,
    url: "https://github.com/tarun1790/AQI-Atmospheric-Forecasting-Engine"
  },
  {
    name: "WorldMonitor Intelligence Dashboard",
    description: "High-throughput React/Node.js dashboard utilizing WebSockets and D3.js to visualize live global telemetry and perform real-time geospatial mapping.",
    category: "web",
    tags: ["TypeScript", "React", "REST APIs", "Mapping"],
    language: "TypeScript",
    stars: 22,
    url: "https://github.com/tarun1790/WorldMonitor-Intelligence-Dashboard"
  },
  {
    name: "LeetCode Analytics Tracker",
    description: "Full-stack automated analytics platform built with Express and MongoDB to track Big O complexity metrics, submission telemetry, and streak data." ,
    category: "web",
    tags: ["JavaScript", "Node.js", "Algorithms", "Analytics"],
    language: "JavaScript",
    stars: 7,
    url: "https://github.com/tarun1790/LeetCode-Analytics-Tracker"
  }
];

const fallbackCerts = [
  {
    title: "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional",
    issuer: "Oracle",
    date: "2024",
    description: "Verified expertise in Large Language Model (LLM) fine-tuning, OCI Generative AI service deployment, RAG vector pipelines, and prompt engineering.",
    skills: ["OCI GenAI", "LLM Fine-Tuning", "Vector Search", "RAG Systems"],
    verifyUrl: "https://education.oracle.com"
  },
  {
    title: "Oracle Autonomous Database Cloud 2024 Certified Specialist",
    issuer: "Oracle",
    date: "2024",
    description: "Specialist certification for provisioning, managing, and tuning high-concurrency Oracle Autonomous Data Warehouses and Transaction Processing instances.",
    skills: ["Autonomous DB", "Oracle SQL", "High Availability", "Performance Tuning"],
    verifyUrl: "https://education.oracle.com"
  },
  {
    title: "NPTEL Elite Certificate - Data Science for Engineers",
    issuer: "NPTEL / IIT Madras",
    date: "2024",
    description: "Scored 81% (Elite Status) in rigorous national engineering exam covering linear algebra, R programming, data wrangling, and predictive modeling.",
    skills: ["Linear Algebra", "Data Wrangling", "R", "Predictive Modeling"],
    verifyUrl: "https://nptel.ac.in"
  },
  {
    title: "Google Cloud Generative AI Fundamentals",
    issuer: "Google Cloud",
    date: "2024",
    description: "Foundational credential covering Google Cloud Vertex AI, Transformer architecture principles, and responsible AI deployment.",
    skills: ["Vertex AI", "Transformers", "Responsible AI"],
    verifyUrl: "https://cloud.google.com"
  },
  {
    title: "DeepTech DSA Certification",
    issuer: "IIT Bombay Techfest",
    date: "2024",
    description: "Advanced Data Structures & Algorithms qualification testing asymptotic analysis, graph algorithms, and dynamic programming.",
    skills: ["Graph Theory", "Dynamic Programming", "Asymptotic Analysis"],
    verifyUrl: "https://techfest.org"
  },
  {
    title: "HP LIFE Data Science & Analytics",
    issuer: "HP LIFE",
    date: "2024",
    description: "Data analytics certification demonstrating business intelligence reporting, data visualization, and statistical modeling.",
    skills: ["Data Analytics", "Business Intelligence", "Visualization"],
    verifyUrl: "https://www.life-global.org"
  },
  {
    title: "Infosys Python Programmer 1 & 2",
    issuer: "Infosys Springboard",
    date: "2024",
    description: "Comprehensive dual python credential covering object-oriented programming, file I/O, data structures, and exception handling.",
    skills: ["Python OOP", "Data Structures", "Modules"],
    verifyUrl: "https://infyspringboard.onwingspan.com"
  },
  {
    title: "Infosys Agile Software Development",
    issuer: "Infosys Springboard",
    date: "2024",
    description: "Scrum methodology certification covering sprint planning, continuous integration, user story estimation, and TDD.",
    skills: ["Scrum", "Sprint Planning", "TDD", "CI/CD"],
    verifyUrl: "https://infyspringboard.onwingspan.com"
  },
  {
    title: "IBMI Berlin Data Science Certification",
    issuer: "IBMI Berlin",
    date: "2024",
    description: "European institute certification in statistical machine learning, data mining, and feature engineering techniques.",
    skills: ["Machine Learning", "Data Mining", "Statistics"],
    verifyUrl: "https://ibmi.de"
  }
];

