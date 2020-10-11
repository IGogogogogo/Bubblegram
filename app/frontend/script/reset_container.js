document.addEventListener("turbolinks:load", () => {
  const postShow = document.querySelector(".post-show")

  if (postShow) {
    document.querySelector(".container").style.paddingTop = "5px"
  }
})
