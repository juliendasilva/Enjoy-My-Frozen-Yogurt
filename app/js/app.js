(function() {
  const durationByDefault = 450;

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

    const btn_left = document.getElementById('contact_left'),
        btn_right = document.getElementById('contact_right');

    btn_left.addEventListener('click', () => {
        console.log('btn left clicked');
    });

    btn_right.addEventListener('click', () => {
        console.log('btn right clicked');
    });

    // Swiper initialization

    var mySwiper = new Swiper ('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        // Navigation arrows
        nextButton: '.slider_right_img',
        prevButton: '.slider_left_img',

        // And if we need scrollbar
        scrollbar: '.swiper-scrollbar',
    });

    // frame 1 <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d656.4831145760571!2d2.328281!3d48.840427!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUwJzQ3LjUiTiAywrAyMCcyNi43IkU!5e0!3m2!1sfr!2sus!4v1488679004597" width="100%" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>
    // frame 2 <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d168612.52968630558!2d2.362342!3d48.675451!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDQ1JzIyLjYiTiAywrAyMicwOC41IkU!5e0!3m2!1sfr!2sus!4v1488678962964" width="100%" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>

})();