// ════════ CURSOR ════════
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

if (cursor && ring && window.innerWidth > 768) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .service-card, .testimonial-card, .portfolio-item, .blog-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1.8)';
      ring.style.width = '50px'; ring.style.height = '50px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.width = '36px'; ring.style.height = '36px';
    });
  });
}

// ════════ NAVBAR ════════
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
});

// ════════ MOBILE NAV ════════
function toggleMobileNav() {
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav) mobileNav.classList.toggle('open');
}
function closeMobileNav() {
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav) mobileNav.classList.remove('open');
}

// ════════ SCROLL REVEAL ════════
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { 
        e.target.classList.add('revealed'); 
        observer.unobserve(e.target); 
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));
}

// ════════ COUNT UP ════════
const countEls = document.querySelectorAll('.count-up');
if (countEls.length > 0) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Math.floor(current).toLocaleString('en-IN');
        }, 16);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  countEls.forEach(el => countObserver.observe(el));
}

// ════════ FORM SUBMIT ════════
function handleSubmit(e) {
  if (e) e.preventDefault();
  const successEl = document.getElementById('formSuccess');
  if (successEl) {
    successEl.style.display = 'block';
    setTimeout(() => { successEl.style.display = 'none'; }, 5000);
  }
}
