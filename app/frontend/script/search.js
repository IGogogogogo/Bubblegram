import Rails from '@rails/ujs'

document.addEventListener("turbolinks:load", () => {
  console.log("start")
  const searchForm = document.querySelector(".search-form")

  if(searchForm){
    ///Rails.fire 使用 ajax 方式傳送資料
    searchForm.addEventListener("keyup", () => Rails.fire(searchForm, "submit"))
  }
})
