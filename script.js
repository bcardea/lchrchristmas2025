const modals = document.querySelectorAll('[data-modal-id]');
const openButtons = document.querySelectorAll('[data-modal-target]');
const closeButtons = document.querySelectorAll('[data-modal-close]');
const yearSpan = document.getElementById('year');

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const lockScroll = (shouldLock) => {
  document.body.style.overflow = shouldLock ? 'hidden' : '';
};

const toggleModal = (modal, show) => {
  if (!modal) return;
  if (show) {
    modal.setAttribute('data-active', 'true');
    modal.setAttribute('aria-hidden', 'false');
    lockScroll(true);
  } else {
    modal.removeAttribute('data-active');
    modal.setAttribute('aria-hidden', 'true');

    const anyActive = Array.from(modals).some(
      (node) => node.getAttribute('data-active') === 'true'
    );

    if (!anyActive) {
      lockScroll(false);
    }
  }
};

openButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.modalTarget;
    const modal = document.querySelector(`[data-modal-id="${targetId}"]`);
    toggleModal(modal, true);
  });
});

closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('[data-modal-id]');
    toggleModal(modal, false);
  });
});

modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target.dataset.modalClose !== undefined) {
      toggleModal(modal, false);
    }
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const activeModal = Array.from(modals).find(
      (node) => node.getAttribute('data-active') === 'true'
    );
    toggleModal(activeModal, false);
  }
});
