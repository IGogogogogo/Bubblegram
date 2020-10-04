window.addEventListener('turbolinks:load', function () {
  let uploadBtn = document.querySelector('.upload-btn')
  if (!uploadBtn) return
  uploadBtn.addEventListener('click', function () {
    document.getElementById('post_images').click()
  })
})
