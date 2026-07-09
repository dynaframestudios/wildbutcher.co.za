const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
const closeButton = document.querySelector('.nav-close');
const backdrop = document.querySelector('.nav-backdrop');

if (nav && toggle) {
  const setMenuState = (isOpen) => {
    nav.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  };

  toggle.addEventListener('click', () => {
    setMenuState(!nav.classList.contains('is-open'));
  });

  if (closeButton) {
    closeButton.addEventListener('click', () => setMenuState(false));
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => setMenuState(false));
  }

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });
}
