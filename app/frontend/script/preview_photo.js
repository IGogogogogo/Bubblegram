window.addEventListener('turbolinks:load', function () {

  let postImagesInput = document.getElementById('post_images')
  if (!postImagesInput) return
  postImagesInput.addEventListener('change', function () {
    previewPostPhoto(this)
  })

  function previewPostPhoto(input) {
    if (input.files && input.files.length >= 0) {
      let uploadBtn = document.querySelector('.upload-btn')
      uploadBtn.style.display = 'none'
      for (let i = 0; i < input.files.length; i++) {

        let reader = new FileReader(); // 瀏覽器方法可以讀取檔案
        reader.readAsDataURL(input.files[i]); // 讀取 input 傳進去的檔案並轉成 url 格式 (base64 編碼)
        reader.onload = function (e) { // 當讀取完成後觸發
          let image = document.createElement('img')
          image.src = e.target.result // result 是 Filereader 的方法可以把最後的結果送出(取決於用哪種方式讀取檔案)，這邊是使用 readAsDataURL 所以會轉成 url 格式
          image.style.width = 100 + '%'
          image.style.height = 100 + '%'
          image.style.objectFit = 'cover'

          image.onload = function (e) {
            let canvas = document.createElement('canvas')
            let max_width = 500
            //let max_height = 400
            let scaleSize = max_width / e.target.width
            canvas.height = e.target.height * scaleSize
            canvas.width = max_width

            let ctx = canvas.getContext('2d') // 代表我們 canvas 要處理的是 2d圖片
            ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height)
            let srcEncoded = ctx.canvas.toDataURL(e.target, 'image/jpeg', 0.8)
            image.src = srcEncoded
          }

          let div = document.createElement('div')
          div.appendChild(image)
          div.style.width = 100 + '%'
          div.style.height = 100 + '%'
          div.className = 'swiper-slide'

          let swiperWrapper = document.querySelector('.swiper-wrapper')
          swiperWrapper.appendChild(div)
          //$(".swiper-wrapper").append(div);
        }
      }
    }
  }

  var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    observer: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  })
})
