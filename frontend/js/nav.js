// Navigation component

document.addEventListener('DOMContentLoaded', () => {
  // Load dynamic header
  loadComponent('header-placeholder', '../components/header.html')
    .then(() => {
      highlightActiveLink();
    });

  // Load dynamic footer
  loadComponent('footer-placeholder', '../components/footer.html');
});


function highlightActiveLink() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (!href) return;

    // Extract file names for comparison
    const currentPageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    const targetPageName = href.substring(href.lastIndexOf('/') + 1);

    // Standardize Home matching (handles index.html, landingPage.html, or root /)
    const isCurrentHome = currentPageName === '' || currentPageName === 'index.html' || currentPageName === 'landingPage.html';
    const isTargetHome = targetPageName === 'index.html' || targetPageName === 'landingPage.html';

    if ((isCurrentHome && isTargetHome) || currentPageName === targetPageName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Vision & Mission dynamic mobile card stack toggle
function selectCard(cardName) {
  const visionCard = document.getElementById('vision-card');
  const missionCard = document.getElementById('mission-card');
  if (!visionCard || !missionCard) return;

  if (cardName === 'vision') {
    visionCard.classList.remove('inactive');
    visionCard.classList.add('active');
    missionCard.classList.remove('active');
    missionCard.classList.add('inactive');
  } else if (cardName === 'mission') {
    missionCard.classList.remove('inactive');
    missionCard.classList.add('active');
    visionCard.classList.remove('active');
    visionCard.classList.add('inactive');
  }
}
window.selectCard = selectCard; // Expose globally for HTML onclick trigger

// Department mobile selection logic
const deptData = {
  'software-web': {
    title: 'Software & Web Development',
    desc: 'Focuses on building technical proficiency in web and application development while enhancing coding skills through personal projects.'
  },
  'data-analytics': {
    title: 'Data Analytics',
    desc: 'Develops skills in complex data analysis to drive technological advancement and prepare members for data-driven industries.'
  },
  'security': {
    title: 'Security',
    desc: 'Focuses on the critical field of cybersecurity, equipping members with the skills necessary to protect digital assets and implement security best practices.'
  },
  'cloud-computing': {
    title: 'Cloud computing',
    desc: 'Masters cloud architecture and AWS services to prepare members for the digital economy through practical, real-world deployment.'
  },
  'ml-ai': {
    title: 'Machine Learning & AI',
    desc: 'Advances innovation in artificial intelligence and machine learning, encouraging members to conduct research and build real-world prototypes with AWS tools.'
  },
  'adv-infra': {
    title: 'Advanced Network & Infrastructure',
    desc: 'Strengthens understanding of modern networking systems and foundational infrastructure through technical assessments designed to build high-level engineering leaders.'
  }
};

function selectDept(deptId) {
  const slots = document.querySelectorAll('.dept-slot');
  const detailCard = document.getElementById('dept-detail-card');
  const titleEl = document.getElementById('dept-detail-title');
  const descEl = document.getElementById('dept-detail-desc');
  
  if (!detailCard || !titleEl || !descEl) return;
  
  // Highlight active slot
  slots.forEach(slot => {
    if (slot.getAttribute('onclick').includes(deptId)) {
      slot.classList.add('active');
    } else {
      slot.classList.remove('active');
    }
  });
  
  // Add updating class to trigger fade transition
  detailCard.classList.add('updating');
  
  setTimeout(() => {
    const data = deptData[deptId];
    if (data) {
      titleEl.textContent = data.title;
      descEl.textContent = data.desc;
    }
    detailCard.classList.remove('updating');
  }, 200);
}
window.selectDept = selectDept;

// Offices mobile drawer sheet logic
const officeData = {
  'Executive': 'The executive board governs the organization, efficiently executing its plans, programs, and policies.',
  'Relations': 'Driving growth and digital security through strategic communications and partnerships.',
  'Operations': 'Optimizing daily operations and club experiences through strategic management and event execution.',
  'Creatives': 'Driving visual identity and audience engagement through creative content, media enhancement, and impactful presentations.',
  'Marketing': 'Amplifying online influence and community engagement through strategic social media management, branding, and account security.',
  'Finance': 'Safeguarding assets and ensuring compliance through strategic budget management and financial forecasting.',
  'Media': 'Capturing and managing visual media to document events and support organizational publicity.',
  'Technology': 'Driving technical skill-building through hands-on training, workshops, and support.'
};

function openOfficeDrawer(officeId) {
  const overlay = document.getElementById('office-drawer-overlay');
  const title = document.getElementById('office-drawer-title');
  const desc = document.getElementById('office-drawer-desc');
  if (!overlay || !title || !desc) return;
  
  const description = officeData[officeId];
  if (description) {
    title.textContent = officeId;
    desc.textContent = description;
  }
  
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden'; // Lock background scrolling
}
window.openOfficeDrawer = openOfficeDrawer;

function closeOfficeDrawer() {
  const overlay = document.getElementById('office-drawer-overlay');
  if (!overlay) return;
  
  overlay.classList.remove('open');
  document.body.style.overflow = ''; // Unlock background scrolling
}
window.closeOfficeDrawer = closeOfficeDrawer;

// Goals card toggle expansion dynamic listener
document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('goal-card-more-btn')) {
    const cardOuter = e.target.closest('.goal-card-outer');
    if (!cardOuter) return;
    
    const isExpanded = cardOuter.classList.contains('expanded');
    if (isExpanded) {
      cardOuter.classList.remove('expanded');
      e.target.textContent = 'more';
    } else {
      cardOuter.classList.add('expanded');
      e.target.textContent = 'less';
    }
  }
});

// About Page Hero Auto-Slideshow Carousel
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.about-hero-slideshow .slide');
  if (slides.length === 0) return;

  let currentSlideIndex = 0;
  setInterval(() => {
    slides[currentSlideIndex].classList.remove('active');
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    slides[currentSlideIndex].classList.add('active');
  }, 4000);
});