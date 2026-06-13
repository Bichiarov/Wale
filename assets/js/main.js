const WHATSAPP_NUMBER = '5513998067868';
const DEFAULT_MESSAGE = 'Olá! Vim pelo site da Wale Solutte e gostaria de saber mais sobre automação comercial.';

function buildWhatsAppUrl(message = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll('.js-whatsapp').forEach((link) => {
  link.href = buildWhatsAppUrl();
  link.target = '_blank';
  link.rel = 'noopener';
  link.setAttribute('aria-label', 'Falar no WhatsApp da Wale Solutte pelo contato (13) 99806-7868');
});
