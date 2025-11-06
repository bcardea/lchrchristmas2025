const tourButton = document.getElementById('tourButton');
const tourModal = document.getElementById('tourModal');
const yearEl = document.getElementById('year');

const toggleModal = (show) => {
  if (!tourModal) return;
  const isVisible = show ?? tourModal.getAttribute('aria-hidden') === 'true';
  tourModal.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
  tourModal.setAttribute('aria-modal', isVisible ? 'true' : 'false');
  document.body.style.overflow = isVisible ? 'hidden' : '';

  if (isVisible) {
    const focusable = tourModal.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();
  }
};

const closeModal = (event) => {
  if (!tourModal || !(event.target instanceof HTMLElement)) return;
  if (event.target.dataset.close === 'modal' || event.target.closest('[data-close="modal"]')) {
    toggleModal(false);
  }
};

const handleKey = (event) => {
  if (event.key === 'Escape' && tourModal?.getAttribute('aria-hidden') === 'false') {
    toggleModal(false);
  }
};

if (tourButton && tourModal) {
  tourButton.addEventListener('click', () => toggleModal(true));
  tourModal.addEventListener('click', closeModal);
  document.addEventListener('keydown', handleKey);
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
