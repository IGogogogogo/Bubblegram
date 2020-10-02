window.addEventListener('turbolinks:load', function () {
  let uploadBtn = document.querySelector('.upload-btn')
  uploadBtn.addEventListener('click', function () {
    document.getElementById('post_images').click()
  })
})
