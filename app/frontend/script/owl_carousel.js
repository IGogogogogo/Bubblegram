document.addEventListener("turbolinks:load", () => {
  const dot = document.querySelector(".owl-dot")
  if (dot) { return }         ///處理輪播點重複出現問題

  $('.post-pic-carousel').owlCarousel({
    loop: false,
    margin: 0,
    nav: false,
    animateOut: 'fadeOut',
    responsive: {
      0: {
        items: 1
      }
    }
  });


  $('.limit-video-carousel').owlCarousel({
    loop: false,
    margin: 0,
    nav: false,
    dots: false,
    animateOut: 'fadeOut',
    responsive: {
      0: {
        items: 5
      }
    }
  })

})
