document.addEventListener("turbolinks:load", () => {
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
