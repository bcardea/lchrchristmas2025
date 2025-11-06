const tourModal = document.getElementById('tour-modal');
const tourTrigger = document.getElementById('tour-trigger');
const tourClose = document.getElementById('tour-close');

if (tourModal && typeof tourModal.showModal === 'function') {
  tourTrigger?.addEventListener('click', () => {
    tourModal.showModal();
  });

  tourClose?.addEventListener('click', () => {
    tourModal.close();
  });

  tourModal.addEventListener('click', (event) => {
    if (event.target === tourModal) {
      tourModal.close();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && tourModal.open) {
      tourModal.close();
    }
  });
}
