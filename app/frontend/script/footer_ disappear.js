window.addEventListener('turbolinks:load', function () {
  $(window).scroll(function () {
    $(".index-nav").stop().hide().fadeIn('fast');
  });
})
