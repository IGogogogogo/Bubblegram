window.addEventListener('turbolinks:load', function () {
  let homeBtn = document.querySelectorAll('.footer-btn')[0]
  let searchBtn = document.querySelectorAll('.footer-btn')[1]
  let addBtn = document.querySelectorAll('.footer-btn')[2]
  let likeBtn = document.querySelectorAll('.footer-btn')[3]
  let profileBtn = document.querySelectorAll('.footer-btn')[4]

  if(!homeBtn)return

  if (location.href === homeBtn.href) {
    homeBtn.classList.add('active')
  } else if (location.href === searchBtn.href) {
    searchBtn.classList.add('active')
  } else if (location.href === addBtn.href) {
    addBtn.classList.add('active')
  } else if (location.href === likeBtn.href) {
    likeBtn.classList.add('active')
  } else if (location.href === profileBtn.href) {
    profileBtn.classList.add('active')
  }

})
