import Rails from '@rails/ujs'
document.addEventListener("turbolinks:load", () => {
  const postsEl = document.querySelector(".load-posts")
  if (!postsEl) return
  let page = 1

  document.body.addEventListener("scroll", loadPosts)

  function loadPosts(e) {                                        //滑動到畫面90%位置會載入更多post
    if (e.target.scrollTop * 2 >= e.target.scrollHeight * 9 / 10) {
      // console.log("loadPosts...")
      page += 1
      postsEl.page.value = page
      postsEl.type.value = "my_posts"

      Rails.fire(postsEl, "submit")                              //rails ajax 請求 posts#load_posts
      if (document.querySelector(".main-posts").dataset.isEnd == "end") {
        document.body.removeEventListener("scroll", loadPosts)
      }
    }
  }
})
