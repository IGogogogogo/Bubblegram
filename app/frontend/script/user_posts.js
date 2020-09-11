document.addEventListener("turbolinks:load", () => {
  const postBtn = document.querySelector(".post-btn")
  const tagBtn = document.querySelector(".tag-btn")

  if(!postBtn) return
  postBtn.addEventListener("click", (e) => showPosts(e))
  tagBtn.addEventListener("click", (e) => showPosts(e))

  const showPosts = (e) => {
    e.preventDefault()
    postBtn.classList.toggle("active")
    tagBtn.classList.toggle("active")

    $(".my-posts").toggle()
    $(".taged-posts").toggle()
  }
})
