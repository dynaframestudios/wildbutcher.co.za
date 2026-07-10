document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach((link) => {
    const linkPage = link.getAttribute('href').split('#')[0] || 'index.html';
    if (linkPage === currentPage) {
      link.classList.add('nav-links--active');
    } else {
      link.classList.remove('nav-links--active');
    }
  });
  const waFloat = document.querySelector('.whatsapp-float');
  if (waFloat) {
    const toggleWaVisibility = () => {
      const shouldHide = document.body.classList.contains('nav-open');
      waFloat.style.display = shouldHide ? 'none' : '';
    };

    const observer = new MutationObserver(toggleWaVisibility);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    toggleWaVisibility();
  }
});
