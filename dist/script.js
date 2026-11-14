const EVENT = {
  title: 'Mis Quince Años — Luciana',
  startLocal: '20261128T200000',
  endLocal: '20261129T010000',
  start: new Date('2026-11-28T20:00:00-04:00'),
  location: 'Los Lotes, Villa Mercedes Sur, calle Naranjal N.º 33',
  description: 'Acompañanos a celebrar los quince años de Luciana. ¡No faltes!'
};

const opening = document.querySelector('#opening');
const invitation = document.querySelector('#invitation');
const openButton = document.querySelector('#openInvitation');
const toast = document.querySelector('#toast');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

function makeSparkles(amount = 28) {
  const holder = document.querySelector('.sparkles');
  for (let i = 0; i < amount; i += 1) {
    const star = document.createElement('span');
    star.className = 'sparkle';
    star.textContent = i % 4 === 0 ? '✦' : '·';
    star.style.left = `${Math.random() * 100}%`;
    star.style.fontSize = `${8 + Math.random() * 16}px`;
    star.style.setProperty('--duration', `${2.8 + Math.random() * 3.5}s`);
    star.style.animationDelay = `${Math.random() * 1.2}s`;
    holder.append(star);
    setTimeout(() => star.remove(), 7500);
  }
}

openButton.addEventListener('click', () => {
  opening.classList.add('opening-now');
  makeSparkles();
  setTimeout(() => {
    opening.classList.add('opened');
    invitation.classList.add('visible');
    invitation.setAttribute('aria-hidden', 'false');
    document.body.classList.remove('locked');
    document.querySelector('.hero-content').classList.add('seen');
  }, 900);
});

function pad(value) { return String(value).padStart(2, '0'); }
function updateCountdown() {
  const remaining = EVENT.start - new Date();
  if (remaining <= 0) {
    document.querySelector('#countdown').innerHTML = '<div style="grid-column:1/-1"><strong>¡Llegó el gran día!</strong><span>Te esperamos</span></div>';
    return;
  }
  const totalSeconds = Math.floor(remaining / 1000);
  document.querySelector('#days').textContent = pad(Math.floor(totalSeconds / 86400));
  document.querySelector('#hours').textContent = pad(Math.floor(totalSeconds % 86400 / 3600));
  document.querySelector('#minutes').textContent = pad(Math.floor(totalSeconds % 3600 / 60));
  document.querySelector('#seconds').textContent = pad(totalSeconds % 60);
}
updateCountdown();
setInterval(updateCountdown, 1000);

function escapeIcs(value) {
  return value.replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n');
}

function addToCalendar() {
  const now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Luciana XV//Invitacion//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:luciana-xv-20261128@invitacion`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=America/La_Paz:${EVENT.startLocal}`,
    `DTEND;TZID=America/La_Paz:${EVENT.endLocal}`,
    `SUMMARY:${escapeIcs(EVENT.title)}`,
    `DESCRIPTION:${escapeIcs(EVENT.description)}`,
    `LOCATION:${escapeIcs(EVENT.location)}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Recordatorio: mañana son los quince de Luciana',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Quince-de-Luciana.ics';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1200);
  showToast('Abrí el archivo para guardarlo en tu calendario ✦');
}
document.querySelector('#addCalendar').addEventListener('click', addToCalendar);
document.querySelector('#addCalendarTime').addEventListener('click', addToCalendar);

document.querySelector('#shareInvitation').addEventListener('click', async () => {
  const shareData = { title: EVENT.title, text: 'Te invito a compartir conmigo una noche muy especial ✨', url: location.href };
  try {
    if (navigator.share) await navigator.share(shareData);
    else {
      await navigator.clipboard.writeText(location.href);
      showToast('Enlace copiado para compartir');
    }
  } catch (error) {
    if (error.name !== 'AbortError') showToast('Podés copiar el enlace desde el navegador');
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('seen');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
