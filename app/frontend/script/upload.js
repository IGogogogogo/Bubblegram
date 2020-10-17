window.addEventListener('turbolinks:load', function () {
  let uploadBtn = document.querySelector('.upload-btn')
  if (!uploadBtn) return
  uploadBtn.addEventListener('click', function () {
    let postImg = document.getElementById('post_images')
    let storyImg = document.getElementById('story_picture')
    if (postImg) {
      postImg.click()
    } else {
      storyImg.click()
    }
  })
})
