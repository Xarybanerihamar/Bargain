const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}

document.querySelectorAll('.copy-phone').forEach(button => {
  button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText(value);
      if (status) status.textContent = 'Phone number copied.';
    } catch {
      if (status) status.textContent = `Wholesale sales: ${value}`;
    }
    if (status) setTimeout(() => { status.textContent = ''; }, 3000);
  });
});

const inquiryForm = document.getElementById('wholesale-inquiry-form');
const formSuccess = document.getElementById('form-success');
if (inquiryForm) {
  inquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!inquiryForm.checkValidity()) {
      inquiryForm.reportValidity();
      return;
    }
    if (formSuccess) {
      formSuccess.hidden = false;
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    inquiryForm.reset();
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
