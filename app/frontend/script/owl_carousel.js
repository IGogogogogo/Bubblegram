document.addEventListener("turbolinks:load", () => {
  ///////加入class用來判斷以執行過的輪播屬性
  $('.post-pic-carousel.owl-carousel:not(.owl-carousel-loaded)').addClass('owl-carousel-loaded').owlCarousel({
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
      },
      1000: {
        items: 10
      }
    }
  })

})
