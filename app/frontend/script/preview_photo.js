window.addEventListener('turbolinks:load', function () {
  $("#post_images").change(function () {
    readURL(this);
  });
  function readURL(input) {
    if (input.files && input.files.length >= 0) {
      $('.swiper-pagination').css('display', 'block')
      for (var i = 0; i < input.files.length; i++) {
        var reader = new FileReader();
        reader.onload = function (e) {
          var img = $("<img>").attr('src', e.target.result);
          var div = $("<div></div>").append(img)
          div.addClass("swiper-slide").css('height', '400px')
          $(".swiper-wrapper").append(div);
        }
        reader.readAsDataURL(input.files[i]);
      }
    }
  }

  var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    autoplay: true,
    observer: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  })
})
