const modal = document.querySelector('.modal');
const openButtons = document.querySelectorAll('[data-modal-open]');
const closeButtons = document.querySelectorAll('[data-modal-close]');
const yearSpan = document.getElementById('year');

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const toggleModal = (show) => {
  if (!modal) return;
  if (show) {
    modal.setAttribute('data-active', 'true');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  } else {
    modal.removeAttribute('data-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
};

openButtons.forEach((button) => {
  button.addEventListener('click', () => toggleModal(true));
});

closeButtons.forEach((button) => {
  button.addEventListener('click', () => toggleModal(false));
});

modal?.addEventListener('click', (event) => {
  if (event.target.dataset.modalClose !== undefined) {
    toggleModal(false);
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    toggleModal(false);
  }
});
