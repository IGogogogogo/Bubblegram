window.addEventListener('turbolinks:load', function () {
  var imageInput = document.querySelector("#post_image")
  imageInput.addEventListener("change", function (event) {
    imageInput.style.display = 'none';
    var reader = new FileReader();
    reader.onload = function () {
      var output = document.getElementById('output');

      output.src = reader.result;
      output.style.width = '300px';
      output.style.height = '300px';
    };
    reader.readAsDataURL(event.target.files[0]); // 類似addEventListener 監聽input裡面的屬性，當input有東西進來之後就會跑去執行onload方法
  })

  $().ready(function () {
    console.log("You're so sweet!")
  })
})