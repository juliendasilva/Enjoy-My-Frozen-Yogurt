(function() {
  const durationByDefault = 325;

  function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    const difference = to - element.scrollTop;
    const perTick    = difference / duration * 2;

    setTimeout(() => {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) return;
      scrollTo(element, to, duration - 2);
    }, 2);
  }

  const scrollToBlock2 = document.getElementById('scroll-to-block-2');

  scrollToBlock2.addEventListener('click', (e) => {
    e.preventDefault();
    scrollTo(document.body, scrollToBlock2.offsetTop, durationByDefault);
  });

  const btn_left  = document.getElementById('contact_left'),
        btn_right = document.getElementById('contact_right');

  btn_left.addEventListener('click', () => {
    console.log('btn left clicked');
  });

  btn_right.addEventListener('click', () => {
    console.log('btn right clicked');
  });

  // Swiper initialization

  const mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // Navigation arrows
    nextButton: '.slider_right_img',
    prevButton: '.slider_left_img',

    // And if we need scrollbar
    scrollbar: '.swiper-scrollbar',
  });

})();