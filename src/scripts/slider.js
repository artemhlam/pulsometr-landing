const slider = document.querySelector('.slider');
const prevBtn = slider.querySelector('.slider__control-prev');
const nextBtn = slider.querySelector('.slider__control-next');
const items = slider.querySelectorAll('.slider__item');
const itemsContainer = slider.querySelector('.slider__items');

let currentIndex = 0;

prevBtn.onclick = () => changeItem(currentIndex - 1)
nextBtn.onclick = () => changeItem(currentIndex + 1)

function changeItem(index) {
  if(index > items.length - 1) index = 0;
  if(index < 0) index = items.length - 1;

  const transformChange = (index * items[index].clientWidth);
  currentIndex = index;

  itemsContainer.style.transform = `translateX(${-transformChange}px)`;
}