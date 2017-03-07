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
  const cursor      = document.querySelector('.cursor');
  for (let li of topping_lis) {
    li.addEventListener('click', (e) => {
      let el = e.target;
      // Select the second class, on this second class we retrieve the last index
      // which is an number.
      let current_position = cursor.classList[1][cursor.classList[1].length - 1];
      let wanted_position  = el.classList[1][el.classList[1].length - 1];
      if (wanted_position !== current_position) {
        cursor.classList.remove('position-' + current_position);
        cursor.classList.add('position-' + wanted_position);
      }
    })
  }

  /*   ---------  Functions to Handle button submit contact. ---------   */

  // When clicking to one of these field
  // if necesary, we change the button state to the 'standby' one.
  const fields = document.querySelectorAll('.contact-field');
  for (const field of fields) {
    field.addEventListener('click', goStandby);
  }
  // Handle click button Send.
  let handleSubmitClick = function(e) {
    e.preventDefault();
    const btn     = e.target,
          name    = document.querySelector('.field-name'),
          email   = document.querySelector('.field-email'),
          message = document.querySelector('.field-message'),
          fields  = [name, email, message];
    // if succeed before, return.
    if (e.target.classList.contains('submit-success')) return;
    // Test if all fields aren't empty.
    if (!name.value || !email.value || !message.value) {
      // if error aren't already display, we do.
      if (!btn.classList.contains('.submit-error')) {
        fireError(btn, 0);
        return;
      }
    }
    // Fields are filled.
    // Test email adress.
    if (!isValidEmail(email.value)) {
      console.log('email non valide');
      fireError(btn, 1);
      return;
    }
    // Ready to send.
    fireSuccess(btn, fields);
  };

  function isValidEmail(emailStr) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(emailStr);
  }

  function fireError(element, causeIndex) {
    const errors = ["Veuillez remplir tous les champs", "Merci d'entrer une adresse e-mail valide"];
    element.classList.remove('submit-standby');
    element.classList.add('submit-error');
    element.value = errors[causeIndex];
  }

  function fireSuccess(element, fieldsArr) {
    element.classList.remove('submit-standby');
    element.classList.add('submit-success');
    element.value = "Votre message à bien été envoyé, merci !";
    // Clear inputs
    if (fieldsArr) {
      for (const field of fieldsArr) {
        field.value = "";
      }
    }
  }

  function goStandby() {
    let element = document.querySelector('.contact-submit-btn');
    element.classList.remove(element.classList[1]);
    element.classList.add('submit-standby');
    element.value = "Envoyer";
  }

  document.querySelector('.contact-submit-btn').addEventListener('click', handleSubmitClick);

  // We prevent default when submit, because there is no back-end
  // in this project to handle data shared.
  document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault()
  });

//modal

  document.querySelector('.modal-button-toppings').addEventListener('click', () => {
    console.log('btn left clicked');
    document.querySelector('.blocks-modal').style.display = "flex";
  });

  document.querySelector('.modal-close').addEventListener('click', () => {
    console.log('btn left clicked');
    document.querySelector('.blocks-modal').style.display = "none";
  });


})();
