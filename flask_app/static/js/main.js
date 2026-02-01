/**
 * Global Economic Foundation - Minimal JS
 * - Navbar: add solid background + blur on scroll
 * - Mobile menu: hamburger toggle, slide down, aria
 * - About section: Intersection Observer for scroll reveal animations
 */

(function () {
  'use strict';

  var nav = document.getElementById('site-nav');
  var mobileMenuBtn = document.getElementById('mobile-menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  var openIcon = nav && nav.querySelector('.nav-open-icon');
  var closeIcon = nav && nav.querySelector('.nav-close-icon');

  var SCROLL_THRESHOLD = 20;

  function updateNavbarScroll() {
    if (!nav) return;
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('nav-bar--scrolled');
    } else {
      nav.classList.remove('nav-bar--scrolled');
    }
  }

  function openMobileMenu() {
    if (!mobileMenu || !mobileMenuBtn) return;
    mobileMenu.hidden = false;
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileMenuBtn.setAttribute('aria-label', 'Close menu');
    if (openIcon) openIcon.classList.add('hidden');
    if (closeIcon) closeIcon.classList.remove('hidden');
  }

  function closeMobileMenu() {
    if (!mobileMenu || !mobileMenuBtn) return;
    mobileMenu.hidden = true;
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-label', 'Open menu');
    if (openIcon) openIcon.classList.remove('hidden');
    if (closeIcon) closeIcon.classList.add('hidden');
  }

  function toggleMobileMenu() {
    if (mobileMenu && mobileMenu.hidden) {
      openMobileMenu();
    } else {
      closeMobileMenu();
    }
  }

  // Scroll: add/remove solid navbar (CSS transition handles appearance)
  if (nav) {
    window.addEventListener('scroll', function () {
      updateNavbarScroll();
    }, { passive: true });
    updateNavbarScroll();
  }

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    // Close when clicking a nav link (for in-page anchors)
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  /* ---------- About Section: Scroll reveal via Intersection Observer ---------- */
  (function () {
    var aboutSection = document.querySelector('[data-about-section]');
    if (!aboutSection) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            aboutSection.classList.add('about-section--revealed');
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.15 }
    );

    observer.observe(aboutSection);
  })();

  /* ---------- What We Do Section: Scroll reveal via Intersection Observer ---------- */
  (function () {
    var whatWeDoSection = document.querySelector('[data-what-we-do-section]');
    if (!whatWeDoSection) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            whatWeDoSection.classList.add('what-we-do-section--revealed');
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.12 }
    );

    observer.observe(whatWeDoSection);
  })();

  /* ---------- How We Make It Happen Section: Scroll reveal via Intersection Observer ---------- */
  (function () {
    var howSection = document.querySelector('[data-how-we-make-it-happen-section]');
    if (!howSection) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            howSection.classList.add('how-we-make-it-happen-section--revealed');
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.12 }
    );

    observer.observe(howSection);
  })();

  /* ---------- Why It Matters Section: Scroll reveal via Intersection Observer ---------- */
  (function () {
    var whySection = document.querySelector('[data-why-it-matters-section]');
    if (!whySection) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            whySection.classList.add('why-it-matters-section--revealed');
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.15 }
    );

    observer.observe(whySection);
  })();

  /* ---------- Join Us Section: Scroll reveal ---------- */
  (function () {
    var section = document.querySelector('[data-join-us-section]');
    if (!section) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            section.classList.add('join-us-section--revealed');
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.12 }
    );

    observer.observe(section);
  })();

  /* ---------- Impact Stats: Count-up animation on scroll ---------- */
  (function () {
    var section = document.querySelector('[data-impact-stats-section]');
    if (!section) return;

    var numbers = section.querySelectorAll('.impact-number[data-impact-value]');
    var hasAnimated = false;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || hasAnimated) return;
          hasAnimated = true;

          numbers.forEach(function (el) {
            var target = parseInt(el.getAttribute('data-impact-value'), 10);
            var suffix = el.getAttribute('data-impact-suffix') || '';
            var step = Math.max(1, Math.ceil(target / 40));
            var count = 0;

            var interval = setInterval(function () {
              count += step;
              if (count >= target) {
                el.textContent = target + suffix;
                clearInterval(interval);
              } else {
                el.textContent = count + suffix;
              }
            }, 30);
          });
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.2 }
    );

    observer.observe(section);
  })();

  /* ---------- Testimonials Section: Scroll reveal ---------- */
  (function () {
    var section = document.querySelector('[data-testimonials-section]');
    if (!section) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            section.classList.add('testimonials-section--revealed');
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.12 }
    );

    observer.observe(section);
  })();

  /* ---------- Partners Section: Scroll reveal ---------- */
  (function () {
    var section = document.querySelector('[data-partners-section]');
    if (!section) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            section.classList.add('partners-section--revealed');
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.12 }
    );

    observer.observe(section);
  })();
})();
