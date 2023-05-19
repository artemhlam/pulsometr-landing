import animateCSS from "./animations.js";

const scrollUpBtn = document.querySelector('.scroll-up-btn');
scrollUpBtn.classList.add('hidden');

scrollUpBtn.onclick = () => {
  scrollTo({
    top: 0,
    behavior: "smooth"
  })
}

document.addEventListener('scroll', function() {
  const show = scrollY > document.documentElement.offsetHeight / 2;
  const btnIsHidden = scrollUpBtn.classList.contains('hidden');

  if(show && btnIsHidden) {

    scrollUpBtn.classList.remove('hidden')
    animateCSS(scrollUpBtn, 'fadeInRight', '0.3s')
        .then(() => animateCSS(scrollUpBtn, 'bounce', '1s'))

  } else if(!show && !btnIsHidden) {
    animateCSS(scrollUpBtn, 'fadeOutRight', '0.3s')
        .then(() => scrollUpBtn.classList.add('hidden'))
  }
})