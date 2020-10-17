document.addEventListener("turbolinks:load", () => {
  const prevBtn = document.querySelector(".prev-btn")

  window.onpopstate = function() {    /////按瀏覽器上一頁/下一頁時重新整理頁面
    location.reload()
  }

  if (!prevBtn) return
  prevBtn.addEventListener("click", () => {
    history.back()    ////按頁面上的上一頁時回到上一個歷史紀錄頁面
  })
})
