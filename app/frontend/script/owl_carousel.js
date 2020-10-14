document.addEventListener("turbolinks:load", () => {
  ///貼文的輪播////
  $('.post-pic-carousel.owl-carousel').owlCarousel({
    loop: false,
    margin: 0,
    nav: false,
    animateOut: 'fadeOut',
    responsive: {
      0: {
        items: 1
      }
    }
  })

  ///////限時動態連結的輪播
  $('.limit-video-carousel').owlCarousel({
    loop: false,
    margin: 0,
    nav: false,
    dots: false,
    animateOut: 'fadeOut',
    responsive: {
      0: {
        items: 5
      },
      700: {
        items: 6
      },
      800: {
        items: 10
      },
      900: {
        items: 10
      },
      1000: {
        items: 10
      }
    }
  })

})
