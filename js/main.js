/**
 * ============================================================================
 * COYTECH — High-Ticket B2B Landing Page Controller (Regra 60-30-10)
 * ============================================================================
 */

const {
  WHATSAPP_CONFIG,
  renderBenefits,
  renderMethodologyTimeline,
  renderFaqAccordion
} = window.CoyTechComponents;

document.addEventListener('DOMContentLoaded', () => {
  // 1. Renderiza Seções Modulares
  renderBenefits();
  renderMethodologyTimeline();
  renderFaqAccordion();

  // 2. Inicializa Interações de UI/UX
  initHeaderScrollEffect();
  initHeroCodeRain();
  initMobileNavigation();
  initScrollReveal();
  initDynamicCardHover();
  initFaqEvents();
  initLeadFormAndWhatsApp();
  initActiveNavHighlight();
});

/**
 * Header Flutuante:
 * - No topo (scrollY <= 20): 100% transparente, sem bordas e sem sombra (exibe a animação Code Rain atrás)
 * - Ao rolar (scrollY > 20): aplica .header-scrolled (#080D16 com 88% de opacidade + backdrop-filter: blur)
 */
function initHeaderScrollEffect() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const updateHeaderState = () => {
    const isScrolled = window.scrollY > 20;
    header.classList.toggle('header-scrolled', isScrolled);
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
}

/**
 * Menu Mobile Responsivo
 */
function initMobileNavigation() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const openIcon = document.getElementById('menu-icon-open');
  const closeIcon = document.getElementById('menu-icon-close');

  if (!menuBtn || !mobileMenu) return;

  const toggleMenu = (forceClose = false) => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    const nextState = forceClose ? false : !isExpanded;

    menuBtn.setAttribute('aria-expanded', String(nextState));
    mobileMenu.classList.toggle('hidden', !nextState);
    if (openIcon && closeIcon) {
      openIcon.classList.toggle('hidden', nextState);
      closeIcon.classList.toggle('hidden', !nextState);
    }
  };

  menuBtn.addEventListener('click', () => toggleMenu());

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => toggleMenu(true));
  });
}

/**
 * Scroll Suave e Animação de Entrada (IntersectionObserver)
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -35px 0px'
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/**
 * Hover Dinâmico nos Cards (.card-b2b)
 */
function initDynamicCardHover() {
  document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.card-b2b');
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * Animação "Code Rain" (Estilo Matrix Coytech) na Hero Section (#inicio)
 * - Fundo sólido base: #080D16
 * - Caracteres dinâmicos (letras, números e binários) em tons de azul claro e cyan (#0066FF, #0EA5E9, #22D3EE)
 * - Cabeça da linha brilhante (#E0F2FE / #67E8F9) com rastro de opacidade gradualmente decrescente para cima
 * - Velocidade moderada, densidade média e pausa automática fora da viewport
 */
function initHeroCodeRain() {
  const canvas = document.getElementById('hero-code-rain');
  const heroSection = document.getElementById('inicio');
  if (!canvas || !heroSection) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const glyphs = '010101COYTECHAI0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]+=-*';
  const trailPalette = ['#0066FF', '#0ea5e9', '#22d3ee', '#38bdf8'];
  const fontSize = 15;
  const columnSpacing = 28; // Densidade média e sofisticada
  const stepIntervalMs = 60; // Ritmo suave e contemplativo

  let width = 0;
  let height = 0;
  let columns = 0;
  let drops = [];
  let lastRows = [];
  let prevChars = [];
  let prevColors = [];
  let speeds = [];
  let animationFrameId = null;
  let lastFrameTime = 0;
  let isHeroVisible = true;

  const setupCanvas = () => {
    const rect = heroSection.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));

    canvas.width = width;
    canvas.height = height;

    columns = Math.floor(width / columnSpacing);
    drops = [];
    lastRows = [];
    prevChars = [];
    prevColors = [];
    speeds = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -40);
      lastRows[i] = Math.floor(drops[i]);
      prevChars[i] = '';
      prevColors[i] = trailPalette[i % trailPalette.length];
      // Velocidade reduzida em ~45-50% para queda lenta, fluida e contemplativa
      speeds[i] = 0.34 + Math.random() * 0.28;
    }

    // Preenchimento inicial sólido #080D16
    ctx.fillStyle = '#080D16';
    ctx.fillRect(0, 0, width, height);
  };

  const renderFrame = (timestamp) => {
    if (!isHeroVisible) return;

    if (timestamp - lastFrameTime >= stepIntervalMs) {
      lastFrameTime = timestamp;

      // Rastro gradual suave proporcional à velocidade mais lenta
      ctx.fillStyle = 'rgba(8, 13, 22, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `600 ${fontSize}px "JetBrains Mono", monospace`;
      ctx.textBaseline = 'top';

      for (let i = 0; i < columns; i++) {
        const x = i * columnSpacing + 6;
        drops[i] += speeds[i];
        const currentRow = Math.floor(drops[i]);
        const y = currentRow * fontSize;

        // Só desenha um novo caractere quando a gota avança de linha, evitando cintilação rápida
        if (currentRow !== lastRows[i]) {
          lastRows[i] = currentRow;

          // 1. Redesenha o caractere imediatamente anterior na cor azul/cyan da marca (sem o brilho da cabeça)
          if (prevChars[i] && currentRow > 0) {
            const prevY = (currentRow - 1) * fontSize;
            if (prevY >= 0 && prevY < height) {
              ctx.shadowBlur = 0;
              ctx.fillStyle = prevColors[i];
              ctx.fillText(prevChars[i], x, prevY);
            }
          }

          // 2. Desenha a "cabeça" brilhante da linha de código que cai
          if (y >= 0 && y < height) {
            const char = glyphs.charAt(Math.floor(Math.random() * glyphs.length));
            const trailColor = trailPalette[Math.floor(Math.random() * trailPalette.length)];

            ctx.shadowColor = '#22d3ee';
            ctx.shadowBlur = 8;
            ctx.fillStyle = '#e0f2fe';
            ctx.fillText(char, x, y);

            prevChars[i] = char;
            prevColors[i] = trailColor;
          }
        }

        // Reinicia a coluna no topo com probabilidade suave após cruzar a altura da seção
        if (y > height && Math.random() > 0.965) {
          drops[i] = Math.floor(Math.random() * -20);
          lastRows[i] = Math.floor(drops[i]);
          prevChars[i] = '';
        }
      }

      ctx.shadowBlur = 0;
    }

    animationFrameId = window.requestAnimationFrame(renderFrame);
  };

  setupCanvas();
  animationFrameId = window.requestAnimationFrame(renderFrame);

  // Redimensionamento responsivo com debounce leve
  let resizeTimer = null;
  window.addEventListener(
    'resize',
    () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setupCanvas, 150);
    },
    { passive: true }
  );

  // Pausa a animação quando a Hero Section sai da tela para máxima performance
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isHeroVisible = entry.isIntersecting;
          if (isHeroVisible) {
            window.cancelAnimationFrame(animationFrameId);
            animationFrameId = window.requestAnimationFrame(renderFrame);
          } else {
            window.cancelAnimationFrame(animationFrameId);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(heroSection);
  }
}

/**
 * Acordeão de FAQ
 */
function initFaqEvents() {
  const container = document.getElementById('faq-accordion');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const trigger = e.target.closest('.faq-trigger');
    if (!trigger) return;

    const card = trigger.parentElement;
    const content = card.querySelector('.faq-content');
    const icon = trigger.querySelector('.faq-icon');
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

    container.querySelectorAll('.faq-trigger').forEach((otherTrigger) => {
      if (otherTrigger !== trigger) {
        otherTrigger.setAttribute('aria-expanded', 'false');
        otherTrigger.parentElement.querySelector('.faq-content')?.classList.add('hidden');
        otherTrigger.querySelector('.faq-icon')?.classList.remove('rotate-180');
      }
    });

    trigger.setAttribute('aria-expanded', String(!isExpanded));
    content?.classList.toggle('hidden', isExpanded);
    icon?.classList.toggle('rotate-180', !isExpanded);
  });
}

/**
 * Formulário de Contato Limpo High-Ticket B2B (Nome, E-mail corporativo, Cargo, WhatsApp)
 */
function initLeadFormAndWhatsApp() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodeURIComponent(
    WHATSAPP_CONFIG.defaultMessage
  )}`;

  document.querySelectorAll('[data-whatsapp-direct]').forEach((link) => {
    link.setAttribute('href', whatsappUrl);
  });

  const form = document.getElementById('b2b-contact-form');
  const feedbackBox = document.getElementById('form-feedback');
  const sendWhatsappBtn = document.getElementById('btn-form-whatsapp');

  if (!form) return;

  const getFormValues = () => {
    const name = document.getElementById('contact-name')?.value.trim() || '';
    const email = document.getElementById('contact-email')?.value.trim() || '';
    const role = document.getElementById('contact-role')?.value.trim() || '';
    const phone = document.getElementById('contact-whatsapp')?.value.trim() || '';
    const roi = window.__lastSimulatedROI || null;
    return { name, email, role, phone, roi };
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getFormValues();

    if (!data.name || !data.email || !data.role || !data.phone) {
      if (feedbackBox) {
        feedbackBox.className =
          'mt-4 p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 text-sm font-medium block';
        feedbackBox.textContent =
          'Por favor, preencha Nome, E-mail corporativo, Cargo e WhatsApp para agendar seu diagnóstico.';
      }
      return;
    }

    sessionStorage.setItem('coytech_b2b_lead', JSON.stringify({ ...data, submittedAt: new Date().toISOString() }));

    if (feedbackBox) {
      feedbackBox.className =
        'mt-4 p-5 rounded-xl bg-[#0066ff]/10 border border-[#0066ff] text-[#080D16] text-sm block';
      feedbackBox.innerHTML = `
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-[#0066ff] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <strong class="block font-extrabold text-[#080D16] mb-1">Diagnóstico solicitado com sucesso, ${data.name}!</strong>
            <span class="text-[#3d5a73]">Nossa equipe de especialistas recebeu seus dados (${data.role}) e entrará em contato via WhatsApp (<strong>${data.phone}</strong>) e e-mail em até 2 horas úteis.</span>
          </div>
        </div>
      `;
    }

    form.reset();
  });

  if (sendWhatsappBtn) {
    sendWhatsappBtn.addEventListener('click', () => {
      const data = getFormValues();
      const roiNote = data.roi
        ? `\n*Custo Oculto Simulado:* ${data.roi.annualWaste}/ano (${data.roi.weeklyHours}h/semana)`
        : '';

      const customText = data.name
        ? `Olá! Sou *${data.name}* (*${data.role || 'Executivo'}*).\n` +
          `*E-mail:* ${data.email || '-'}\n` +
          `*WhatsApp:* ${data.phone || '-'}` +
          roiNote +
          `\n\nGostaria de falar com um especialista da CoyTech.`
        : WHATSAPP_CONFIG.defaultMessage;

      const targetUrl = `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodeURIComponent(customText)}`;
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    });
  }
}

/**
 * Destaque Ativo nos Links do Header Fixo
 */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener(
    'scroll',
    () => {
      const scrollY = window.scrollY + 150;
      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach((link) => {
            const isMatch = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('text-white', isMatch);
            link.classList.toggle('text-[#b8cadb]', !isMatch);
          });
        }
      });
    },
    { passive: true }
  );
}
