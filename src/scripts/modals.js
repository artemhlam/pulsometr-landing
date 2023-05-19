import animateCSS from "./animations.js";

const targetButtons = document.querySelectorAll('button[data-target-modal]');
const overlay = document.querySelector('.overlay');
let currentModal;

targetButtons.forEach(btn => {
  btn.onclick = () => {
    const modalSelector = btn.dataset.targetModal;
    const modal = document.querySelector(modalSelector);
    openModal(modal);
  }
})

async function openModal(modal) {
  currentModal = modal;

  overlay.classList.add('overlay--show');
  animateCSS(overlay, 'fadeIn', '0.4s')

  modal.classList.remove('modal--hidden');
  await animateCSS(modal, 'backInLeft', '0.4s');

  overlay.onclick = function(e) {
    if(!e.target.closest('.modal')) closeModal(modal);
  }


  document.addEventListener('keydown', closeModalByButton);

  const modalCloseBtn = modal.querySelector('.modal__close-btn');
  modalCloseBtn.onclick = () => closeModal(modal);
}
async function closeModal(modal) {

  await animateCSS(overlay, 'fadeOut', '0.25s')

  overlay.classList.remove('overlay--show');
  modal.classList.add('modal--hidden');

  overlay.onclick = null;
  document.removeEventListener('keydown', closeModalByButton);
  modal.querySelector('.modal__form').onclose();
}

const catalogItemsContainer = document.querySelector('.catalog__grid');
catalogItemsContainer.addEventListener('click', function(e) {
  const buyBtn = e.target;
  if(!buyBtn.classList.contains('catalog__item-btn-buy')) return;
  const item = buyBtn.closest('.catalog__item');

  const buyModal = document.querySelector('.buy-modal');
  const itemName = item.dataset.name;
  buyModal.querySelector('.buy-modal__name').textContent = itemName;

  openModal(buyModal);
})

function closeModalByButton(e) {
  if(e.code === 'Escape') closeModal(currentModal);
}