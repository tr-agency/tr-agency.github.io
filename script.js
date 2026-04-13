const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

const revealElements = document.querySelectorAll(
  '.service-card, .result-card, .about-card, .cta-box, .card-highlight, .trust-grid, .section-heading'
);

revealElements.forEach((element) => {
  element.classList.add('reveal');
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => observer.observe(element));

const sections = document.querySelectorAll('main section[id]');
const menuAnchors = document.querySelectorAll('.nav-menu a[href^="#"]');

const setActiveLink = () => {
  let currentId = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentId = section.getAttribute('id');
    }
  });

  menuAnchors.forEach((anchor) => {
    anchor.classList.remove('active');
    const href = anchor.getAttribute('href').replace('#', '');
    if (href === currentId) {
      anchor.classList.add('active');
    }
  });
};

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);
