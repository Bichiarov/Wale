const CONTACTS = {
  comercial: {
    phone: '5513998067868',
    label: '(13) 99806-7868',
    name: 'Comercial / Suporte'
  },
  plantao: {
    phone: '5513998067868',
    label: '(13) 99806-7868',
    name: 'Suporte / Plantão'
  }
};

const TIMEZONE = 'America/Sao_Paulo';
const DEFAULT_MESSAGE = 'Olá! Vim pelo site da Wale Solutte e gostaria de saber mais sobre automação comercial.';

function getBrazilBusinessHours() {
  const parts = new Intl.DateTimeFormat('pt-BR', {
    timeZone: TIMEZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(new Date());

  const map = Object.fromEntries(parts.map(part => [part.type, part.value]));
  const weekday = (map.weekday || '').toLowerCase();
  const hour = Number(map.hour || 0);
  const isWeekday = !weekday.startsWith('sáb') && !weekday.startsWith('dom');
  return isWeekday && hour >= 9 && hour < 18;
}

function getActiveContact() {
  return getBrazilBusinessHours() ? CONTACTS.comercial : CONTACTS.plantao;
}

function buildWhatsAppUrl(message) {
  const active = getActiveContact();
  return `https://wa.me/${active.phone}?text=${encodeURIComponent(message || DEFAULT_MESSAGE)}`;
}

function updateWhatsAppLinks() {
  document.querySelectorAll('.js-whatsapp').forEach((link) => {
    link.href = buildWhatsAppUrl(DEFAULT_MESSAGE);
    link.target = '_blank';
    link.rel = 'noopener';
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
setInterval(updateWhatsAppLinks, 60000);
