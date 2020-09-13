import Rails from '@rails/ujs'
document.addEventListener("turbolinks:load", () => {
  const postsForm = document.querySelector(".load-posts")
  const postNav = document.querySelector(".posts-nav")
  let page = 1
  let tagPage = 1
  let myPage = 1
  let type = ""

  if (postsForm) {
    checkLoadType()
    document.body.addEventListener("scroll", loadPosts)
  }

  if (postNav) {
    postNav.addEventListener("click", (e) => switchPosts(e))
  }

  function checkLoadType() {
    console.log("checkLoadType")
    const mainPosts = document.querySelector(".main-posts")
    const myBtn = document.querySelector(".my-posts-btn")
    const tagBtn = document.querySelector(".tag-posts-btn")
    if (mainPosts) {
      type = "my_posts"
    } else if (myBtn.classList.contains("active")) {
      type = "post_img"
    } else if (tagBtn.classList.contains("active")) {
      type = "tag_img"
    }
  }


  function loadPosts(e) {                                        //滑動到畫面70%位置會載入更多post
    if (e.target.scrollTop * 2 >= e.target.scrollHeight * 7 / 10) {
      console.log("loadPosts...")
      page += 1
      postsForm.page.value = page
      postsForm.type.value = type
      console.log(postsForm)
      console.log(postsForm.page.value)
      console.log(postsForm.type.value)
      Rails.fire(postsForm, "submit")
      setTimeout(() => {
        console.log("rails ajax send")
        Rails.fire(postsForm, "submit")  //rails ajax 請求 posts#load_posts
        document.body.addEventListener("scroll", loadPosts)
      }, 100)

      if (document.querySelector(".load-posts").dataset.isEnd == "end") {
        document.body.removeEventListener("scroll", loadPosts)
      }
    }
  }

  const switchPosts = (e) => {                               //showPosts: 切換我的貼文/我被標記的貼文
    e.preventDefault()
    postNav.querySelectorAll("li a").forEach((btn) => {
      btn.classList.remove("active")
    })
    e.target.classList.add("active")           //active: bootstrap的使用中項目

    checkLoadType()
    console.log("type: " + type)
    if (type == "post_img") {
      document.querySelector(".tag-img").style.display = "none"
      document.querySelector(".post-img").style.display = "flex"
      tagPage = page
      page = myPage
    } else if (type == "tag_img") {
      document.querySelector(".post-img").style.display = "none"
      document.querySelector(".tag-img").style.display = "flex"
      myPage = page
      page = tagPage
    }

    document.body.addEventListener("scroll", loadPosts)
  }
})
