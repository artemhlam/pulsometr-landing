import animateCSS from "./animations.js";

const TAB_BTN_ACTIVE_CLASS = 'catalog__tabs-btn--active';
const catalogTabsContainer = document.querySelector('.catalog__tabs');
let lastTabBtn;

catalogTabsContainer.addEventListener('click', function(e) {
  const tabBtn = e.target;
  if(!tabBtn.dataset.targetType) return;

  if(lastTabBtn) {
    lastTabBtn.classList.remove(TAB_BTN_ACTIVE_CLASS);
  }

  const isAlreadyActive = lastTabBtn === tabBtn;

  if(isAlreadyActive) {
    showAllItems();
    tabBtn.classList.remove(TAB_BTN_ACTIVE_CLASS)
    lastTabBtn = null;
    return;
  }

  const activeType = tabBtn.dataset.targetType;
  showItemsByType(activeType);
  tabBtn.classList.add(TAB_BTN_ACTIVE_CLASS)
  lastTabBtn = tabBtn;
})

function showAllItems() {
  const catalogItems = document.querySelectorAll('.catalog__item.hidden');

  catalogItems.forEach(async item => {
    item.classList.remove('hidden');
    animateCSS(item, 'fadeIn', '0.5s');
  })

}

function showItemsByType(type) {
  const catalogItems = document.querySelectorAll('.catalog__item');

  catalogItems.forEach(async item => {
    item.classList.add('hidden');

    if(item.dataset.type === type) {
      item.classList.remove('hidden');
      animateCSS(item, 'fadeIn', '0.5s');
    }
  })

}