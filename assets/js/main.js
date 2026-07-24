// ============================================================
// Yayasan PPLSI / SDN Balas Klumprik — shared front-end behavior
// Pure vanilla JS. No backend, no build step required.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Mobile menu toggle (single source of truth: #mobile-menu[hidden]) ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  if (navToggle && mobileMenu && menuIcon && closeIcon) {

    const setMenuOpen = (open) => {
      mobileMenu.hidden = !open;
      mobileMenu.setAttribute("aria-hidden", String(!open));
      menuIcon.classList.toggle("site-navbar__icon--hidden", open);
      closeIcon.classList.toggle("site-navbar__icon--hidden", !open);
      navToggle.setAttribute("aria-expanded", String(open));
    };

    // Toggle on hamburger click
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      setMenuOpen(mobileMenu.hidden);
    });

    // Close after selecting a menu item
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenu.hidden && !mobileMenu.contains(e.target) && !navToggle.contains(e.target)) {
        setMenuOpen(false);
      }
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !mobileMenu.hidden) {
        setMenuOpen(false);
        navToggle.focus();
      }
    });

    // Close automatically if resized up to desktop layout
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024 && !mobileMenu.hidden) {
        setMenuOpen(false);
      }
    });
  }

  /* ---------- Glass navbar scroll effect (CSS class only, no inline style fighting) ---------- */
  const glassContainer = document.getElementById('glass-container');
  if (glassContainer) {
    const onScroll = () => {
      glassContainer.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('active'));
  }

  /* ---------- Hero image slider (data-hero-slider) ---------- */
  document.querySelectorAll('[data-hero-slider]').forEach((hero) => {
    const slides = hero.querySelectorAll('.hero-slide');
    if (slides.length < 2) return;
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
    }, 5000);
  });

  /* ---------- Footer copyright year ---------- */
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = `© ${new Date().getFullYear()}`;
  }

  /* ---------- Gallery filter (client-side, data-filter / data-gallery-item) ---------- */
  const filterButtons = document.querySelectorAll('[data-filter]');
  const galleryItems = document.querySelectorAll('[data-gallery-item]');
  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-filter');
        filterButtons.forEach((b) => b.classList.remove('bg-[#7c1f1f]', 'text-white'));
        filterButtons.forEach((b) => b.classList.add('bg-gray-100', 'text-gray-700'));
        btn.classList.add('bg-[#7c1f1f]', 'text-white');
        btn.classList.remove('bg-gray-100', 'text-gray-700');

        galleryItems.forEach((item) => {
          const cat = item.getAttribute('data-gallery-item');
          const show = category === 'all' || cat === category;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Simple client-side search (data-search-input / data-search-target) ---------- */
  const searchInput = document.querySelector('[data-search-input]');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      document.querySelectorAll('[data-search-target]').forEach((card) => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  /* ---------- PPDB / contact form: static-friendly submit feedback ---------- */
  document.querySelectorAll('form[data-static-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      const action = form.getAttribute('action') || '';
      // If the form points to FormSubmit/Netlify/mailto, let it submit normally.
      if (action.includes('formsubmit.co') || action.includes('netlify') || action.startsWith('mailto:')) {
        return;
      }
      e.preventDefault();
      const feedback = form.querySelector('[data-form-feedback]');
      if (feedback) {
        feedback.classList.remove('hidden');
        feedback.textContent = 'Formulir ini adalah demo statis. Hubungkan ke FormSubmit atau Netlify Forms agar pesan benar-benar terkirim (lihat komentar di README.md).';
      }
    });
  });
});
