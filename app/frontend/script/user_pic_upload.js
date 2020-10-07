window.addEventListener('turbolinks:load', function () {
  let editUserPicBtn = document.querySelector('#user-edit-pic')
  let userAvatar = document.getElementById('user_avatar')
  if (!userAvatar) return
  editUserPicBtn.addEventListener('click', function () {
    userAvatar.click()
  })

  userAvatar.addEventListener('change', function () {
    previewPhoto(this)
  })

  function previewPhoto(input) {
    if (input.files && input.files[0]) {
      let reader = new FileReader
      let previewTarget = document.getElementById('user-preview')
      reader.readAsDataURL(input.files[0])
      reader.onload = function (e) {
        previewTarget.setAttribute('src', e.target.result)
      }
    }
  }
})
