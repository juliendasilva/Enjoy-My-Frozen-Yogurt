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

  // Topping list selected.
  const topping_lis = document.querySelectorAll('.select-topping');
  const cursor = document.querySelector('.cursor');
  for (let li of topping_lis) {
    li.addEventListener('click', (e) => {
      let el = e.target;
        // Select the second class, on this second class we retrieve the last index
        // which is an number.
        let current_position = cursor.classList[1][cursor.classList[1].length-1];
        let wanted_position =  el.classList[1][el.classList[1].length-1];
        if (wanted_position !== current_position) {
            cursor.classList.remove('position-' + current_position);
            cursor.classList.add('position-' + wanted_position);
        }
    })
  }

  function isValidEmail (emailStr) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(emailStr);
  }
  // Handle button submit
  let btn = document.querySelector('.contact-submit-btn').addEventListener('click', () => {
    const name = document.querySelector('.field-name').value,
        email = document.querySelector('.field-email').value,
        message = document.querySelector('.field-message').value,
        fields = [name, email, message];
        // Test if all fields aren't empty.
        if (!name && !email && !message) return;
        // Test email adress.
        if (!isValidEmail(email)) return;
        

  })
})();
