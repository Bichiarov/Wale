const WHATSAPP_NUMBER = '5513998067868';
const DEFAULT_MESSAGE = 'Olá! Vim pelo site da Wale Solutte e gostaria de saber mais sobre automação comercial.';

function buildWhatsAppUrl(message = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function updateWhatsAppLinks() {
  document.querySelectorAll('.js-whatsapp').forEach((link) => {
    link.href = buildWhatsAppUrl();
    link.target = '_blank';
    link.rel = 'noopener';
    link.setAttribute('aria-label', 'Falar no WhatsApp da Wale Solutte pelo contato (13) 99806-7868');
  });
}

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const year = document.getElementById('year');

menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  mainNav?.classList.toggle('open');
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

if (year) year.textContent = new Date().getFullYear();
updateWhatsAppLinks();
