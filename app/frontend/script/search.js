import Rails from '@rails/ujs'

document.addEventListener("turbolinks:load", () => {
  const searchForm = document.querySelector(".search-form")

  if (searchForm) {
    ///Rails.fire 使用 ajax 方式傳送資料
    searchForm.addEventListener("keyup", () => Rails.fire(searchForm, "submit"))
  }
})
