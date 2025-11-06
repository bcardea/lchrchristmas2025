const modal = document.getElementById('tourModal');
const trigger = document.getElementById('tourTrigger');
const yearEl = document.getElementById('year');

const focusableSelector = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
let lastFocusedElement = null;

const openModal = () => {
  lastFocusedElement = document.activeElement;
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const focusable = modal.querySelectorAll(focusableSelector);
  if (focusable.length) {
    focusable[0].focus();
  }
};

const closeModal = () => {
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
};

if (trigger) {
  trigger.addEventListener('click', openModal);
}

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-close')) {
      closeModal();
    }
  });

  const closeButton = modal.querySelector('.modal__close');
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  modal.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const focusable = [...modal.querySelectorAll(focusableSelector)].filter((el) => !el.hasAttribute('disabled'));
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

yearEl.textContent = new Date().getFullYear();

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
});
