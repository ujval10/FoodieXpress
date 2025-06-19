// Loader logic
window.addEventListener('DOMContentLoaded', () => {
  // Theme: apply from localStorage on load
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  const modeToggle = document.getElementById('mode-toggle');
  if (modeToggle) {
    modeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.style.opacity = 0;
    setTimeout(() => loader.style.display = 'none', 500);
  }, 1200); // Simulate loading
  initHeroCarousel();

  // Slide-in overlay logic for Menu and Contact
  const menuOverlay = document.getElementById('menu-overlay');
  const contactOverlay = document.getElementById('contact-overlay');
  const menuLink = document.querySelector('.nav-links a[href="#menu"]');
  const contactLink = document.querySelector('.nav-links a[href="#contact"]');
  const homeLink = document.querySelector('.nav-links a[href="#home"]');
  const closeMenuBtn = document.getElementById('close-menu-overlay');
  const closeContactBtn = document.getElementById('close-contact-overlay');

  function closeAllOverlays() {
    if (menuOverlay) menuOverlay.classList.remove('active');
    if (contactOverlay) contactOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuLink && menuOverlay && closeMenuBtn) {
    menuLink.addEventListener('click', function(e) {
      e.preventDefault();
      if (contactOverlay) contactOverlay.classList.remove('active');
      menuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    closeMenuBtn.addEventListener('click', function() {
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  if (contactLink && contactOverlay && closeContactBtn) {
    contactLink.addEventListener('click', function(e) {
      e.preventDefault();
      if (menuOverlay) menuOverlay.classList.remove('active');
      contactOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    closeContactBtn.addEventListener('click', function() {
      contactOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  if (homeLink) {
    homeLink.addEventListener('click', function() {
      closeAllOverlays();
    });
  }

  // Allow switching between overlays
  if (menuLink && contactLink) {
    menuLink.addEventListener('click', function(e) {
      if (contactOverlay && contactOverlay.classList.contains('active')) {
        contactOverlay.classList.remove('active');
        setTimeout(() => menuOverlay.classList.add('active'), 50);
      }
    });
    contactLink.addEventListener('click', function(e) {
      if (menuOverlay && menuOverlay.classList.contains('active')) {
        menuOverlay.classList.remove('active');
        setTimeout(() => contactOverlay.classList.add('active'), 50);
      }
    });
  }

  // Contact form submit handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const successMsg = document.getElementById('contact-success');
      if (successMsg) successMsg.style.display = 'block';
      this.reset();
      setTimeout(() => {
        if (successMsg) successMsg.style.display = 'none';
      }, 5000);
    });
  }

  initFadeInOnScroll();
});

// Dark/Light mode toggle
const modeToggle = document.getElementById('mode-toggle');
if (modeToggle) {
  modeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    modeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });
}

// Carousel logic (stub)
function initCarousel() {
  // TODO: Implement carousel switching
}

// Scroll-triggered pop-up (stub)
function initScrollPopup() {
  // TODO: Show popup on scroll
}

// Navbar scroll-spy (stub)
function initScrollSpy() {
  // TODO: Highlight nav links on scroll
}

// Hero Carousel Logic
function initHeroCarousel() {
  const slides = document.querySelectorAll('#hero-carousel .hero-slide');
  let current = 0;
  let interval = null;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
      // Pause video if not active
      const video = slide.querySelector('video');
      if (video) {
        if (i === idx) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  showSlide(current);
  interval = setInterval(nextSlide, 3500);
}

// Initialize features
initCarousel();
initScrollPopup();
initScrollSpy();

// Cart Logic
const cart = {};
const cartBtn = document.getElementById('cart-btn');
const cartNotification = document.getElementById('cart-notification');

function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartNotification() {
  const hasItems = Object.keys(cart).length > 0;
  if (hasItems) {
    cartBtn.classList.add('has-items');
  } else {
    cartBtn.classList.remove('has-items');
  }
  saveCartToStorage();
}

document.addEventListener('click', function(e) {
  // Add to Cart
  if (e.target.closest('.food-card__add')) {
    const card = e.target.closest('.food-card');
    const name = card.getAttribute('data-dish');
    const price = parseInt(card.getAttribute('data-price'), 10);
    if (!cart[name]) {
      cart[name] = { name, price, qty: 1 };
    } else {
      cart[name].qty++;
    }
    updateCartNotification();
  }
});

cartBtn.addEventListener('click', function() {
  window.location.href = 'cart.html';
});

// Scroll-triggered fade-in animation for cards and mission section
function initFadeInOnScroll() {
  const fadeEls = [
    ...document.querySelectorAll('.food-card'),
    ...document.querySelectorAll('.mission-hero')
  ];
  const observer = new window.IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });
  fadeEls.forEach(el => observer.observe(el));
} 