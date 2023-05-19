import animateCSS from "./animations.js";

const catalogItemsContainer = document.querySelector('.catalog__grid');
catalogItemsContainer.addEventListener('click', function(e) {
  const isButton = e.target.classList.contains('catalog__item-more-btn')
  if(!isButton) return;

  const item = e.target.closest('.catalog__item');
  const button = e.target;
  const back = item.querySelector('.catalog__item-back');
  const front = item.querySelector('.catalog__item-front');

  const backIsActive = !back.classList.contains('hidden');

  const showSide = backIsActive ? front : back; 
  const hideSide = backIsActive ? back : front;

  front.classList.add('hidden');
  back.classList.add('hidden');

  hideSide.classList.remove('hidden');
  animateCSS(hideSide, 'fadeOutLeft' ,'0.4s')
      .then(() => {
        hideSide.classList.add('hidden')
        showSide.classList.remove('hidden');
        animateCSS(showSide, 'fadeInLeft', '0.4s');
      });

  button.textContent = backIsActive ? 'подробнее' : 'назад';
})