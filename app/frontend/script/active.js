window.addEventListener('turbolinks:load', function () {
  let homeBtn = document.querySelectorAll('.footer-btn')[0]
  let searchBtn = document.querySelectorAll('.footer-btn')[1]
  let addBtn = document.querySelectorAll('.footer-btn')[2]
  let likeBtn = document.querySelectorAll('.footer-btn')[3]
  let profileBtn = document.querySelectorAll('.footer-btn')[4]
  let userId = location.href.split("/")[4]



  if (location.href === "http://localhost:3000/") {
    homeBtn.classList.add('active')
  } else if (location.href === "http://localhost:3000/searches") {
    searchBtn.classList.add('active')
  } else if (location.href === `http://localhost:3000/users/${userId}/posts/new`) {
    addBtn.classList.add('active')
  } else if (location.href === "http://localhost:3000/#") {
    likeBtn.classList.add('active')
  } else if (location.href === `http://localhost:3000/users/${userId}`) {
    profileBtn.classList.add('active')
  }
})
