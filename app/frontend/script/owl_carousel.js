document.addEventListener("turbolinks:load", () => {
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    animateOut: 'fadeOut',
    dotsEach: true,
    responsive:{
      0:{
          items:1
      }
    }
  })
})
