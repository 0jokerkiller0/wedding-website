/**
 * WEDDING PROJECT SCRIPTS
 * Includes: Petals, Countdown, Scroll Reveal, and QR Generation
 */

/* ── PETALS ANIMATION ── */
(function initPetals() {
  const container = document.getElementById('petals');
  if (!container) return;
  
  const colors = ['#B8862A', '#D4A84B', '#6B1520', '#EDD5B8', '#C8712A'];
  const petalCount = 24;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.className = 'p';
    
    // Randomize properties
    const sizeW = 7 + Math.random() * 8;
    const sizeH = 9 + Math.random() * 11;
    const left = Math.random() * 100;
    const duration = 7 + Math.random() * 12;
    const delay = Math.random() * 15;
    const rotation = Math.random() * 360;
    const color = colors[Math.floor(Math.random() * colors.length)];

    petal.style.cssText = `
      left: ${left}%;
      width: ${sizeW}px;
      height: ${sizeH}px;
      background: ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      transform: rotate(${rotation}deg);
    `;
    
    container.appendChild(petal);
  }
})();

/* ── COUNTDOWN TIMER ── */
(function initCountdown() {
  const targetDate = new Date('2026-04-29T10:00:00');
  const elements = {
    d: document.getElementById('cd-d'),
    h: document.getElementById('cd-h'),
    m: document.getElementById('cd-m'),
    s: document.getElementById('cd-s')
  };

  if (!elements.d) return;

  function update() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      const timer = document.getElementById('countdown-timer');
      if (timer && !timer.classList.contains('hidden')) {
        timer.innerHTML = '<div class="match-text">A Match Made in Heaven</div>';
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    elements.d.textContent = String(days).padStart(2, '0');
    elements.h.textContent = String(hours).padStart(2, '0');
    elements.m.textContent = String(mins).padStart(2, '0');
    elements.s.textContent = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
})();

/* ── INTERACTIVE CELEBRATION ── */
function celebrate() {
  const container = document.getElementById('petals');
  const colors = ['#B8862A', '#D4A84B', '#6B1520', '#EDD5B8', '#C8712A'];
  
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'p';
    p.textContent = ['🌸', '✨', '🌼'][Math.floor(Math.random() * 3)];
    
    const left = Math.random() * 100;
    const duration = 3 + Math.random() * 5;
    const size = 20 + Math.random() * 20;

    p.style.cssText = `
      left: ${left}%;
      font-size: ${size}px;
      animation: fall ${duration}s linear forwards;
      z-index: 10001;
    `;
    
    container.appendChild(p);
    setTimeout(() => p.remove(), duration * 1000);
  }
}

/* ── SCROLL REVEAL (Intersection Observer) ── */
(function initReveal() {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
      }
    });
  }, observerOptions);

  // Observe all elements with reveal classes
  document.querySelectorAll('.rev, .ev, .vc, .sg-card').forEach(el => {
    observer.observe(el);
  });

  // Stagger delays for better visual flow
  document.querySelectorAll('.ev').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.13) + 's';
  });
  document.querySelectorAll('.vc').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.1) + 's';
  });
  document.querySelectorAll('.sg-card').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.15) + 's';
  });
})();

/* ── SHAGUN QR GENERATION ── */
/**
 * Uses the 'qrcode' library (node-qrcode) via CDN.
 * Ensure https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js is loaded in HTML.
 */
function initShagunQR() {
  const upiConfigs = {
    yukta: {
      id: 'yuktatelrandhe0@okaxis',
      name: 'Yukta',
      canvasId: 'qr-yukta',
      uidId: 'uid-yukta',
      payBtnId: 'pay-yukta'
    },
    nikhil: {
      id: '8668592044@okaxis',
      name: 'Nikhil',
      canvasId: 'qr-nikhil',
      uidId: 'uid-nikhil',
      payBtnId: 'pay-nikhil'
    }
  };

  function generateUPIUrl(config) {
    // Manual construction is often more reliable for UPI deep links than URLSearchParams
    const pa = config.id;
    const pn = encodeURIComponent(config.name);
    const tn = encodeURIComponent('Wedding Shagun');
    const cu = 'INR';
    
    return `upi://pay?pa=${pa}&pn=${pn}&cu=${cu}&tn=${tn}`;
  }

  function render() {
    // Check if QRCode is available (from the CDN script in index.html)
    const qrLib = window.QRCode || (typeof QRCode !== 'undefined' ? QRCode : null);
    
    if (!qrLib) {
      console.warn('QRCode library not yet loaded. Retrying...');
      return;
    }

    Object.keys(upiConfigs).forEach(key => {
      const config = upiConfigs[key];
      const url = generateUPIUrl(config);
      const canvas = document.getElementById(config.canvasId);
      
      if (canvas) {
        qrLib.toCanvas(canvas, url, {
          width: 160,
          margin: 1,
          color: {
            dark: '#3A0A12',
            light: '#ffffff'
          }
        }, function (error) {
          if (error) console.error('QR Error for ' + key + ':', error);
        });
      }

      // Update UI elements
      const uidEl = document.getElementById(config.uidId);
      if (uidEl) uidEl.textContent = config.id;

      const payBtn = document.getElementById(config.payBtnId);
      if (payBtn) {
        payBtn.href = url;
        // Ensure it doesn't just stay as '#'
        console.log(`Updated ${config.payBtnId} with URL: ${url}`);
      }
    });
  }

  // If QRCode library is already loaded, render immediately, else wait for it.
  if (window.QRCodeLoaded) {
    render();
  } else {
    // We'll call this from the script's onload in index.html if needed, 
    // or just let it run if it's already there.
    // Modern approach: check in a small loop or rely on 'defer' script ordering.
    const checkInterval = setInterval(() => {
      if (typeof QRCode !== 'undefined') {
        render();
        clearInterval(checkInterval);
      }
    }, 100);
  }
}

// Initial call
initShagunQR();
