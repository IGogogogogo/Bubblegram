document.addEventListener("turbolinks:load", () => {
  const dot = document.querySelector(".owl-dot")
  if(dot){ return }         ///處理輪播點重複出現問題

  $('.owl-carousel').owlCarousel({
    loop: false,
    margin: 0,
    nav: false,
    animateOut: 'fadeOut',
    responsive:{
      0:{
          items:1
      }
    }
  })
})
