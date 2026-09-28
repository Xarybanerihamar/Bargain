const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.copy-phone').forEach(button => {
  button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText(value);
      status.textContent = 'Phone number copied.';
    } catch {
      status.textContent = `Wholesale sales: ${value}`;
    }
    setTimeout(() => { status.textContent = ''; }, 3000);
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
