document.addEventListener("turbolinks:load", () => {
  ///////加入class用來判斷以執行過的輪播屬性
  $('.owl-carousel').addClass('owl-carousel-loaded').owlCarousel({
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
