// Lucide icons
window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();

  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Contact form -> Web3Forms (działa od razu z przeglądarki, bez backendu)
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('submit-btn');
  const status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (btn) { btn.disabled = true; btn.innerHTML = 'Wysyłanie…'; }
      if (status) { status.textContent = ''; status.className = 'form-status'; }
      try {
        const data = new FormData(form);
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        });
        const json = await res.json();
        if (res.ok && json.success) {
          form.reset();
          if (status) { status.textContent = 'Dziękuję! Wiadomość została wysłana.'; status.classList.add('ok'); }
          if (btn) btn.innerHTML = 'Wysłano ✓';
        } else {
          throw new Error(json.message || 'Błąd wysyłki');
        }
      } catch (err) {
        if (status) { status.textContent = 'Nie udało się wysłać. Napisz na piotrzawada.kontakt@gmail.com'; status.classList.add('err'); }
        if (btn) { btn.disabled = false; btn.innerHTML = 'Spróbuj ponownie'; }
      } finally {
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('animate-fade-up');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.section .h2, .skill, .service, .reason, .contact-item, .form-card, .cta-card')
    .forEach((el) => { el.style.opacity = '0'; io.observe(el); });
});
