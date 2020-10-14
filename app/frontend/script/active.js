window.addEventListener('turbolinks:load', function () {
  let homeBtn = document.querySelectorAll('.footer-btn')[0]
  let searchBtn = document.querySelectorAll('.footer-btn')[1]
  let addBtn = document.querySelectorAll('.footer-btn')[2]
  let likeBtn = document.querySelectorAll('.footer-btn')[3]
  let profileBtn = document.querySelectorAll('.footer-btn')[4]
  let btnBg = document.getElementById('btn-bg')


  if (!homeBtn) return

  if (location.href === homeBtn.href) {
    homeBtn.classList.add('active')
  } else if (location.href === searchBtn.href) {
    searchBtn.classList.add('active')
  } else if (location.href === likeBtn.href) {
    likeBtn.classList.add('active')
  } else if (location.href === profileBtn.href) {
    profileBtn.classList.add('active')
  }
  // 選到黑色透明背景取消並收合按鈕
  btnBg.addEventListener('click', () => {
    if (btnBg.classList.contains('open')) {
      let checkBox = document.getElementById('spread-btn')
      checkBox.checked = false
      btnBg.classList.remove('open')
    }
  })
  // 自動開關按鈕背景以及 nav 新增按鈕閃爍功能
  addBtn.addEventListener('click', function () {
    btnBg.classList.toggle('open')
    addBtn.classList.add('active')
    setTimeout(function () {
      addBtn.classList.remove('active')
    }, 100);
  })
})
