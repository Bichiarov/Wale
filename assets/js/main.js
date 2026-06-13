/*
  Wale Solutte - site institucional
  WhatsApp automático:
  - Segunda à Sexta, das 9h às 18h: Comercial / Suporte
  - Após as 18h, finais de semana e fora do horário: Suporte Plantão
*/
const WHATSAPP_CONTACTS = {
  commercial: {
    number: '5513981434489',
    label: '(13) 98143-4489',
    name: 'Comercial / Suporte',
    info: 'De Segunda à Sexta, das 9h às 18h'
  },
  afterHours: {
    number: '5513996924357',
    label: '(13) 99692-4357',
    name: 'Suporte (Plantão após as 18h)',
    info: 'Atendimento fora do horário comercial'
  }
};

const TIME_ZONE = 'America/Sao_Paulo';
const menuButton = document.querySelector('#menuButton');
const mainNav = document.querySelector('#mainNav');
const year = document.querySelector('#year');
const phoneLabel = document.querySelector('#phoneLabel');
const phoneInfo = document.querySelector('#phoneInfo');
const whatsappLinks = document.querySelectorAll('.js-whatsapp');
const contactForm = document.querySelector('#contactForm');

function getSaoPauloDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat('pt-BR', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(date);

  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const weekday = (map.weekday || '').toLowerCase();
  const hour = Number(map.hour || 0);
  const minute = Number(map.minute || 0);

  return { weekday, hour, minute };
}

function getActiveContact(date = new Date()) {
  const { weekday, hour } = getSaoPauloDateParts(date);
  const isWeekday = !weekday.startsWith('sáb') && !weekday.startsWith('dom');
  const isBusinessHours = isWeekday && hour >= 9 && hour < 18;
  return isBusinessHours ? WHATSAPP_CONTACTS.commercial : WHATSAPP_CONTACTS.afterHours;
}

const defaultMessage = 'Olá! Vim pelo site da Wale Solutte e gostaria de saber mais sobre automação comercial.';
const makeWhatsAppUrl = (message = defaultMessage, contact = getActiveContact()) => `https://wa.me/${contact.number}?text=${encodeURIComponent(message)}`;

function updateWhatsAppTargets() {
  const activeContact = getActiveContact();

  if (phoneLabel) phoneLabel.textContent = `${activeContact.name}: ${activeContact.label}`;
  if (phoneInfo) phoneInfo.textContent = `${activeContact.info}. O direcionamento é automático pelo horário de São Paulo.`;

  whatsappLinks.forEach((link) => {
    link.setAttribute('href', makeWhatsAppUrl(defaultMessage, activeContact));
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
    link.setAttribute('aria-label', `Falar no WhatsApp com ${activeContact.name}`);
  });
}

if (year) year.textContent = new Date().getFullYear();
updateWhatsAppTargets();
setInterval(updateWhatsAppTargets, 60 * 1000);

menuButton?.addEventListener('click', () => {
  const isOpen = mainNav?.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const nome = data.get('nome') || '';
  const empresa = data.get('empresa') || '';
  const segmento = data.get('segmento') || '';
  const mensagem = data.get('mensagem') || '';
  const activeContact = getActiveContact();

  const text = [
    'Olá! Vim pelo site da Wale Solutte.',
    `Nome: ${nome}`,
    empresa ? `Empresa: ${empresa}` : '',
    segmento ? `Segmento: ${segmento}` : '',
    mensagem ? `Mensagem: ${mensagem}` : '',
    `Atendimento direcionado para: ${activeContact.name}`,
    'Gostaria de receber atendimento sobre automação comercial.'
  ].filter(Boolean).join('\n');

  window.open(makeWhatsAppUrl(text, activeContact), '_blank', 'noopener');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
