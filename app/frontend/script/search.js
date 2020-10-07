import Rails from '@rails/ujs'

document.addEventListener("turbolinks:load", () => {
  const searchForm = document.querySelector(".search-form")
  const searchInput = document.querySelector(".search-form input")
  let chatUserList = document.querySelector(".chat-user-list")
  if (searchForm) {
    ///Rails.fire 使用 ajax 方式傳送資料
    searchForm.addEventListener("keyup", () => {
      Rails.fire(searchForm, "submit")
      if(chatUserList){
        chatUserList.style.display = "none"
      }
      if(chatUserList && searchInput.value === ''){
        chatUserList.style.display = "block"
      }
  })
  }
})
