const EMAILJS_PUBLIC_KEY  = 'rrFfmbZymSOKhTxg3';   // Account > API Keys
const EMAILJS_SERVICE_ID  = 'service_pws0nkl';   // Email Services
const EMAILJS_TEMPLATE_ID = 'template_ileql58';  // Email Templates

emailjs.init(EMAILJS_PUBLIC_KEY);


/* ══ BUBBLES ══ */
(function initBubbles() {
  const container = document.getElementById('bubblesContainer');
  for (let i = 0; i < 18; i++) {
    const b   = document.createElement('div');
    b.className = 'bubble';
    const size = Math.random() * 70 + 20;
    const left = Math.random() * 100;
    const dur  = Math.random() * 12 + 10;
    const del  = Math.random() * 15;
    const dx   = (Math.random() - .5) * 120 + 'px';
    b.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      --dx: ${dx};
      animation-duration: ${dur}s;
      animation-delay: -${del}s;
    `;
    container.appendChild(b);
  }
})();


/* ══ SKILLS DATA & RENDER ══ */
const skills = [
  { icon: '🐍', name: 'Python',       pct: 90 },
  { icon: '☕', name: 'Java',          pct: 85 },
  { icon: '⚡', name: 'JavaScript',    pct: 88 },
  { icon: '⚛️', name: 'React',         pct: 75 },
  { icon: '🟢', name: 'Node.js',       pct: 72 },
  { icon: '🗄️', name: 'SQL',           pct: 85 },
  { icon: '🐳', name: 'Docker',        pct: 50 },
  { icon: '🐙', name: 'Git & GitHub',  pct: 92 },
  { icon: '☁️', name: 'Cloud',         pct: 68 },
  { icon: '🌐', name: 'HTML & CSS',    pct: 90 },
  { icon: '🔧', name: 'REST APIs',     pct: 87 },
  { icon: '🧪', name: 'Testing',       pct: 70 },
];

(function renderSkills() {
  const list = document.getElementById('skillsList');
  skills.forEach(s => {
    list.insertAdjacentHTML('beforeend', `
      <div class="skill-row">
        <div class="skill-label">
          <span class="skill-icon">${s.icon}</span>
          <span class="skill-name">${s.name}</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" data-pct="${s.pct}"></div>
        </div>
        <div class="skill-pct">${s.pct}%</div>
      </div>
    `);
  });
})();


/* ══ TYPEWRITER ══ */
let twIndex   = 0;
let twDelete  = false;
let twPause   = false;
let currentLang = 'ar';

const twEl  = document.getElementById('typewriter');
const words = { ar: 'I am Yahya Nour', en: 'I am Yahya Nour' };

function typeWriter() {
  if (twPause) return;
  const word = words[currentLang];

  if (!twDelete) {
    twEl.textContent = word.slice(0, ++twIndex);
    if (twIndex === word.length) {
      twPause = true;
      setTimeout(() => { twPause = false; twDelete = true; typeWriter(); }, 2500);
      return;
    }
    setTimeout(typeWriter, 90);
  } else {
    twEl.textContent = word.slice(0, --twIndex);
    if (twIndex === 0) {
      twDelete = false;
      setTimeout(typeWriter, 600);
      return;
    }
    setTimeout(typeWriter, 50);
  }
}

typeWriter();


/* ══ DARK / LIGHT MODE ══ */
const html      = document.documentElement;
const themeBtn  = document.getElementById('themeBtn');

themeBtn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
});


/* ══ LANGUAGE TOGGLE (AR / EN) ══ */
const langBtn = document.getElementById('langBtn');
const navCta  = document.getElementById('navCta');

langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  const isAr  = currentLang === 'ar';

  // اتجاه الصفحة واللغة
  html.setAttribute('lang', isAr ? 'ar' : 'en');
  html.setAttribute('dir',  isAr ? 'rtl' : 'ltr');
  langBtn.textContent = isAr ? 'EN' : 'عر';
  navCta.textContent  = isAr ? 'تواصل معي' : 'Contact Me';

  // تبديل النصوص بـ data-ar / data-en
  document.querySelectorAll('[data-ar][data-en]').forEach(el => {
    el.textContent = isAr ? el.dataset.ar : el.dataset.en;
  });

  // إعادة تشغيل الـ typewriter
  twIndex = 0; twDelete = false; twPause = false;
  twEl.textContent = '';
  setTimeout(typeWriter, 300);
});


/* ══ HAMBURGER MENU ══ */
const ham        = document.getElementById('ham');
const mobileMenu = document.getElementById('mobileMenu');

ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

function closeMenu() {
  ham.classList.remove('open');
  mobileMenu.classList.remove('open');
}


/* ══ SCROLL: PROGRESS BAR + BACK TO TOP ══ */
const backTop   = document.getElementById('backTop');
const scrollBar = document.getElementById('scroll-bar');
let   skillsAnimated = false;

window.addEventListener('scroll', () => {
  // شريط التقدم
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  scrollBar.style.width = pct + '%';

  // زرار الرجوع لأعلى
  backTop.classList.toggle('show', window.scrollY > 400);

  // Nav active link
  updateActiveNav();
});


/* ══ NAV ACTIVE STATE ══ */
const sections = ['about', 'skills', 'projects', 'contact'];

function updateActiveNav() {
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 80) current = id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.section === current);
  });
}


/* ══ INTERSECTION OBSERVER (Fade-up + Skills bars) ══ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');

    // تحريك progress bars مرة واحدة
    if (e.target.id === 'skillsList' && !skillsAnimated) {
      skillsAnimated = true;
      setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(bar => {
          bar.style.width = bar.dataset.pct + '%';
        });
      }, 200);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


/* ══ TOAST NOTIFICATION ══ */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}


/* ══ CONTACT FORM + EMAILJS ══ */
function sendForm() {
  const nameEl  = document.getElementById('fname');
  const emailEl = document.getElementById('femail');
  const msgEl   = document.getElementById('fmsg');
  const neErr   = document.getElementById('fnameErr');
  const eeErr   = document.getElementById('femailErr');
  const meErr   = document.getElementById('fmsgErr');

  // reset errors
  [nameEl, emailEl, msgEl].forEach(f => f.classList.remove('error'));
  [neErr, eeErr, meErr].forEach(e => e.classList.remove('show'));

  let valid = true;

  if (!nameEl.value.trim()) {
    nameEl.classList.add('error');
    neErr.classList.add('show');
    valid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
    emailEl.classList.add('error');
    eeErr.classList.add('show');
    valid = false;
  }
  if (!msgEl.value.trim()) {
    msgEl.classList.add('error');
    meErr.classList.add('show');
    valid = false;
  }
  if (!valid) return;

  const btn     = document.getElementById('sendBtn');
  const btnSpan = btn.querySelector('span');

  btn.disabled      = true;
  btnSpan.textContent = currentLang === 'ar' ? '⏳ جاري الإرسال...' : '⏳ Sending...';

  // ✅ إرسال عبر EmailJS
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name:  nameEl.value.trim(),
    from_email: emailEl.value.trim(),
    message:    msgEl.value.trim(),
    to_email:   'ya7ia99@gmail.com',
  })
  .then(() => {
    nameEl.value  = '';
    emailEl.value = '';
    msgEl.value   = '';
    showToast(currentLang === 'ar' ? '✅ تم إرسال رسالتك بنجاح!' : '✅ Message sent successfully!');
  })
  .catch(err => {
    console.error('EmailJS error:', err);
    showToast(currentLang === 'ar' ? '❌ حصل خطأ، حاول تاني' : '❌ Something went wrong, try again');
  })
  .finally(() => {
    btn.disabled      = false;
    btnSpan.textContent = currentLang === 'ar' ? 'إرسال الرسالة ✉️' : 'Send Message ✉️';
  });
}