document.addEventListener("turbolinks:load", () => {
  const prevBtn = document.querySelector(".prev-btn")

  if (!prevBtn) return
  prevBtn.addEventListener("click", () => {
    history.back()
  })
})
