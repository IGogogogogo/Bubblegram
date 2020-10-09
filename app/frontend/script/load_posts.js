import Rails from '@rails/ujs'
document.addEventListener("turbolinks:load", () => {
  const postLoadPage = document.querySelector(".post-load-page")
  const postNav = document.querySelector(".posts-nav")
  const postImg = document.querySelector(".post-img")
  const tagImg = document.querySelector(".tag-img")
  let page = 1
  let tagPage = 1
  let myPage = 1

  if (postLoadPage) { postLoadPage.addEventListener("scroll", loadPosts) }  //加入捲軸滾動事件

  if (postNav) { postNav.addEventListener("click", (e) => switchPosts(e)) }  //user show 個人/tag貼文切換

  function getType() {                  //依照目前位置改變請求目標類型
    // console.log("checkLoadType")
    const followingPosts = document.querySelector(".following-posts")
    const userPosts = document.querySelector(".user-posts")
    const myBtn = document.querySelector(".my-posts-btn")
    const tagBtn = document.querySelector(".tag-posts-btn")
    const randPosts = document.querySelector(".rand-posts")

    if (followingPosts) {
      return "following_posts"
    } else if (userPosts) {
      return "my_posts"
    } else if (randPosts) {
      return "rand_img"
    }else if (myBtn.classList.contains("active")) {
      return "post_img"
    } else if (tagBtn.classList.contains("active")) {
      return "tag_img"
    }
  }

  function getUrl(type) {
    if (type == "rand_img") {
      return "/load_rand_img"
    } else if (type == "post_img" || type == "tag_img") {
      return "/users/load_img"
    } else {
      return "/users/load_posts"
    }
  }

  function scrollToBottom() { return postLoadPage.scrollHeight - window.innerHeight - 2 <= postLoadPage.scrollTop }

  function loadPosts() {                           //滑動到畫面底部會請求載入更多post
    if (scrollToBottom()) {
      // console.log("loadPosts.........................")

      page += 1
      const user_id = document.location.pathname.split("users/")[1].split("/")[0]  //從目前網址取得params user id
      let type = getType()
      let url = getUrl(type) + `?page=${page}&type=${type}`

      if (user_id) { url += `&user_id=${user_id}` }

      Rails.ajax({
        url: url,
        type: "get",
        success: function(data) {
          const postsEl = data.querySelector("body").innerHTML
          const postLoadTarget = document.querySelector(".post-load-target")
          const oldLoadingEls = document.querySelectorAll(".loading")
          const newLoadingEl = document.createElement("div")
          const loadImg = document.createElement("img")
          loadImg.src = "/loading.gif"
          loadImg.classList = "w-100"
          newLoadingEl.classList = "loading"
          newLoadingEl.style = "padding: 0 40%;"
          newLoadingEl.appendChild(loadImg)

          if (oldLoadingEls) {
            Array.from(oldLoadingEls).forEach(el => {
              el.remove()
            });
          }
          if (!postsEl || postsEl == "") {   //沒有新資料時移除事件監聽
            postLoadPage.removeEventListener("scroll", loadPosts)
            return
          }

          if (type == "post_img") {
            postImg.innerHTML += postsEl
            postImg.appendChild(newLoadingEl)
          } else if (type == "tag_img") {
            tagImg.innerHTML += postsEl
            tagImg.appendChild(newLoadingEl)
          } else {
            postLoadTarget.innerHTML += postsEl
            postLoadTarget.appendChild(newLoadingEl)
          }
        },
        error: function(errors) {
          console.log(errors)
        }
      })
    }
  }

  const switchPosts = (e) => {                  //showPosts: 切換我的貼文/我被標記的貼文
    e.preventDefault()

    const type = getType()
    if (type == "post_img") {
      tagPage = page
      page = myPage
    } else if (type == "tag_img") {
      myPage = page
      page = tagPage
    }

    postLoadPage.addEventListener("scroll", loadPosts)
  }
})
