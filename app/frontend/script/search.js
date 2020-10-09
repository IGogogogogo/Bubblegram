import Rails from '@rails/ujs'

document.addEventListener("turbolinks:load", () => {
  const searchForms = document.querySelectorAll(".search-form")
  const searchInput = document.querySelector(".search-form input")
  const postLoadPage = document.querySelector(".post-load-page")
  let chatUserList = document.querySelector(".chat-user-list")
<<<<<<< HEAD

  if (!searchForm) return

  if (postLoadPage) {
    document.querySelector(".container").style.paddingTop = "20px"
  }

  searchForm.addEventListener("keyup", () => {
    Rails.fire(searchForm, "submit")     ///Rails.fire 使用 ajax 方式傳送資料

    if(chatUserList){
      chatUserList.style.display = "none"
      if(searchInput.value === ''){
        chatUserList.style.display = "block"
      }
    }

    if (postLoadPage) {
      postLoadPage.style.display = "block"
      if (searchInput.value != "") {
        postLoadPage.style.display = "none"
      }
    }
  })
=======
  if (searchForms) {
    ///Rails.fire 使用 ajax 方式傳送資料
      searchForms.forEach((searchForm)=>{
        searchForm.addEventListener("keyup", () => {
          Rails.fire(searchForm, "submit")
          if(chatUserList){
            chatUserList.style.display = "none"
          }
          if(chatUserList && searchInput.value === ''){
            chatUserList.style.display = "block"
          }
        })
      })
  }
>>>>>>> 14710c8... create fans and following search
})
