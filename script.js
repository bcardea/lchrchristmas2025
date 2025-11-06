const modal = document.querySelector('.modal');
const openButtons = document.querySelectorAll('[data-modal-open]');
const closeButtons = document.querySelectorAll('[data-modal-close]');
const yearSpan = document.getElementById('year');
const tourStepTitle = document.getElementById('tour-step-title');
const tourStepAddress = document.getElementById('tour-step-address');
const tourStepDescription = document.getElementById('tour-step-description');
const tourStepNumber = document.getElementById('tour-step-number');
const tourStepTotal = document.getElementById('tour-step-total');
const tourStepFmNote = document.getElementById('tour-step-fm');
const tourNextButton = document.querySelector('[data-tour-next]');
const tourPrevButton = document.querySelector('[data-tour-prev]');

const tourStops = [
  {
    title: 'Stop 1: The Dock Landing Corner',
    address: '4107 Woodland Drive, Chesapeake, VA 23321',
    description:
      'A beautifully decorated corner lot that anchors a neighborhood full of festive spirit. Take a drive through nearby streets for bonus displays!'
  },
  {
    title: 'Stop 2: The Garden of Wonders',
    address: '4319 Topsail Landing, Chesapeake, VA 23321',
    description:
      'Explore a whimsical garden packed with unique characters, including flying reindeer and a giant abominable snowman.'
  },
  {
    title: 'Stop 3: Matson Family Lights',
    address: '3316 Dietz Drive, Chesapeake, VA 23320',
    description:
      "A beloved tradition featuring about 35,000 lights synchronized to a festive playlist.",
    hasFm: true
  },
  {
    title: 'Stop 4: The Waterside Spectacle (#1!)',
    address: '1337 Simon Drive, Chesapeake, VA 23320',
    description:
      'The main event! Thousands of lights reflect on the water for a magical, shimmering show.'
  },
  {
    title: 'Stop 5: The Shore Road Show',
    address: '1109 Shore Road, Chesapeake, VA 23323',
    description:
      'A popular music-synced display blending light and sound for the whole family.',
    hasFm: true
  },
  {
    title: 'Stop 6: A Frozen Wonderland',
    address: '801 Pin Oak Pl, Chesapeake, VA 23322',
    description:
      'Perfect for families, featuring a yard filled with Frozen-themed characters.'
  },
  {
    title: "Stop 7: Pine Level Lane's Classic Christmas",
    address: '909 Pine Level Ln, Chesapeake, VA 23322',
    description:
      'A bright and energetic display with colorful lights and charming inflatables.'
  },
  {
    title: 'Stop 8: The Snowman Sanctuary',
    address: '910 Weeping Willow Dr, Chesapeake, VA 23322',
    description:
      "A cohesive, snowman-themed display that Frosty fans won't want to miss."
  },
  {
    title: "Stop 9: Chattanooga Street's Elegant Glow",
    address: '919 Chattanooga St, Chesapeake, VA 23322',
    description:
      'Serene white lights nestled among the trees for a tasteful, naturalistic design.'
  },
  {
    title: "Stop 10: North Haven Circle's Dynamic Display",
    address: '966 North Haven Circle, Chesapeake, VA 23322',
    description:
      "A high-energy light show synchronized to music that's broadcast out loud. Roll down your windows and enjoy!"
  }
];

let currentTourStop = 0;

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (tourStepTotal) {
  tourStepTotal.textContent = tourStops.length;
}

const updateTourStep = () => {
  if (!tourStepTitle || !tourStepAddress || !tourStepDescription || !tourStepNumber) {
    return;
  }

  const stop = tourStops[currentTourStop];
  tourStepTitle.textContent = stop.title;
  tourStepAddress.textContent = stop.address;
  tourStepDescription.textContent = stop.description;
  tourStepNumber.textContent = currentTourStop + 1;

  if (tourStepFmNote) {
    if (stop.hasFm) {
      tourStepFmNote.hidden = false;
    } else {
      tourStepFmNote.hidden = true;
    }
  }

  if (tourPrevButton) {
    tourPrevButton.disabled = currentTourStop === 0;
  }

  if (tourNextButton) {
    if (currentTourStop === tourStops.length - 1) {
      tourNextButton.textContent = 'Restart Tour';
    } else {
      tourNextButton.textContent = 'Next Stop';
    }
  }
};

updateTourStep();

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

tourNextButton?.addEventListener('click', () => {
  if (currentTourStop === tourStops.length - 1) {
    currentTourStop = 0;
  } else {
    currentTourStop += 1;
  }
  updateTourStep();
});

tourPrevButton?.addEventListener('click', () => {
  if (currentTourStop === 0) return;
  currentTourStop -= 1;
  updateTourStep();
});
