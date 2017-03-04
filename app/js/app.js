(function() {
  const durationByDefault = 250;

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

  const scrollToBlock2 = document.getElementById("scroll-to-block-2");

  scrollToBlock2.addEventListener("click", (e) => {
    e.preventDefault();
    scrollTo(document.body, scrollToBlock2.offsetTop, durationByDefault);
  });


})();