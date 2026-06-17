/* ============================================
   AKUMA SPORTS - Main JavaScript
   Edit freely — no framework dependencies
   ============================================ */

/* ---- NAV SCROLL BEHAVIOUR ---- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---- MOBILE MENU TOGGLE ---- */
const menuBtn   = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    // Toggle hamburger ↔ X icon
    const icon = menuBtn.querySelector('svg');
    menuBtn.setAttribute(
      'aria-expanded',
      mobileMenu.classList.contains('open') ? 'true' : 'false'
    );
  });
}

/* ---- ACTIVE NAV LINK (based on current page) ---- */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ---- SCROLL REVEAL ANIMATION ---- */
// Add data-reveal to any element you want to fade in on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target); // fire once only
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-reveal]').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  revealObserver.observe(el);
});

document.addEventListener('animationend', () => {}); // flush

// CSS class that fires the reveal
const revealStyle = document.createElement('style');
revealStyle.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(revealStyle);

/* ---- TRAFFIC TRACKER ---- */
// Lightweight self-hosted page analytics stored in localStorage
// The admin dashboard reads from this same store
const TrafficTracker = {
  storageKey: 'akuma_analytics',

  getStore() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || { visits: [], enquiries: [] };
    } catch {
      return { visits: [], enquiries: [] };
    }
  },

  saveStore(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (e) {
      console.warn('Storage full:', e);
    }
  },

  trackPageView() {
    const data  = this.getStore();
    const today = new Date().toISOString().split('T')[0];

    // Keep max 90 days of visits to avoid bloating storage
    data.visits = data.visits.slice(-90 * 50);

    data.visits.push({
      date:    today,
      page:    window.location.pathname,
      title:   document.title,
      ref:     document.referrer || 'direct',
      ts:      Date.now(),
    });

    this.saveStore(data);
  },

  trackEnquiry(formData) {
    const data = this.getStore();

    data.enquiries.push({
      date:    new Date().toISOString(),
      name:    formData.name    || '',
      email:   formData.email   || '',
      sport:   formData.sport   || '',
      message: formData.message || '',
      page:    window.location.pathname,
      id:      Date.now(),
    });

    this.saveStore(data);
  },

  // Summary stats used by the admin dashboard
  getSummary() {
    const data  = this.getStore();
    const today = new Date().toISOString().split('T')[0];

    const todayVisits = data.visits.filter(v => v.date === today).length;

    // Unique days in last 30 days
    const last30 = new Date();
    last30.setDate(last30.getDate() - 30);
    const recentVisits = data.visits.filter(v => new Date(v.ts) >= last30);

    // Page hit counts
    const pageCounts = {};
    data.visits.forEach(v => {
      pageCounts[v.page] = (pageCounts[v.page] || 0) + 1;
    });

    const topPages = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([page, count]) => ({ page, count }));

    // Visits per day for the chart (last 14 days)
    const dailyCounts = {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      dailyCounts[key] = 0;
    }
    data.visits.forEach(v => {
      if (dailyCounts.hasOwnProperty(v.date)) {
        dailyCounts[v.date]++;
      }
    });

    return {
      totalVisits:    data.visits.length,
      todayVisits,
      last30Visits:   recentVisits.length,
      totalEnquiries: data.enquiries.length,
      topPages,
      dailyCounts,
      recentEnquiries: data.enquiries.slice(-10).reverse(),
    };
  },
};

// Auto-track every page load
TrafficTracker.trackPageView();

// Expose globally so contact.js and admin.js can use it
window.AkumaTracker = TrafficTracker;

/* ---- CONTACT FORM HANDLER ---- */
// Attach to any form with id="contact-form"
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
      name:    contactForm.querySelector('[name="name"]')?.value    || '',
      email:   contactForm.querySelector('[name="email"]')?.value   || '',
      sport:   contactForm.querySelector('[name="sport"]')?.value   || '',
      message: contactForm.querySelector('[name="message"]')?.value || '',
    };

    // Save enquiry to tracker
    window.AkumaTracker.trackEnquiry(data);

    // --- EMAIL: swap this out for your real backend / EmailJS / Formspree endpoint ---
    // Option A: Formspree (free tier) — replace YOUR_FORM_ID below
    // fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });

    // Show success message
    contactForm.innerHTML = `
      <div class="text-center py-8">
        <div style="font-size:3rem;margin-bottom:1rem;">✅</div>
        <h3 style="font-family:var(--font-display);font-size:1.5rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-red);margin-bottom:0.5rem;">
          ENQUIRY RECEIVED
        </h3>
        <p style="color:#aaa;font-size:0.9rem;">
          Thanks ${data.name}, we'll be in touch within 24 hours.
        </p>
      </div>
    `;
  });
}

/* ---- STATS TICKER DUPLICATION (for seamless loop) ---- */
const ticker = document.querySelector('.stats-ticker');
if (ticker) {
  // Clone children for seamless infinite scroll
  const items = ticker.innerHTML;
  ticker.innerHTML = items + items;
}
