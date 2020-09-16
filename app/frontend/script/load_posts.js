import Rails from '@rails/ujs'
document.addEventListener("turbolinks:load", () => {
  const userPosts = document.querySelector(".user-posts")
  const followingPosts = document.querySelector(".following-posts")
  const postNav = document.querySelector(".posts-nav")
  const postImg = document.querySelector(".post-img")
  const tagImg = document.querySelector(".tag-img")
  let page = 1
  let tagPage = 1
  let myPage = 1
  // let type = ""

  if (userPosts || followingPosts || postNav) {
    document.body.addEventListener("scroll", loadPosts)      //加入捲軸滾動事件
  }

  if (postNav) {
    postNav.addEventListener("click", (e) => switchPosts(e))  //user show 個人/tag貼文切換
  }

  function getType() {                  //依照目前位置改變請求目標
    // console.log("checkLoadType")
    const myBtn = document.querySelector(".my-posts-btn")
    const tagBtn = document.querySelector(".tag-posts-btn")

    if (followingPosts) {
      return "following_posts"
    } else if (userPosts) {
      return "my_posts"
    } else if (myBtn.classList.contains("active")) {
      return "post_img"
    } else if (tagBtn.classList.contains("active")) {
      return "tag_img"
    }
  }

  const scrollToBottom = () => { document.body.scrollHeight - window.innerHeight - 2 <= document.body.scrollTop }

  function loadPosts() {                           //滑動到畫面底部會請求載入更多post
    if (scrollToBottom) {
      // console.log("loadPosts.........................")
      page += 1
      const user_id = document.location.href.split("users/")[1]  //從目前網址取得params user id
      const type = getType()
      let url = `/users/load_posts?page=${page}&type=${type}`

      if (user_id) { url += `&user_id=${user_id}` }

      Rails.ajax({
        url: url,
        type: "get",
        success: function(data) {
          const postsEl = data.querySelector("body").innerHTML

          if (type == "following_posts" || type == "my_posts") {
            document.querySelector(".post-load-target").innerHTML += postsEl
          } else if (type == "post_img") {
            postImg.innerHTML += postsEl
          } else if (type == "tag_img") {
            tagImg.innerHTML += postsEl
          }

          if (postsEl == "") { document.body.removeEventListener("scroll", loadPosts) } //沒有新資料時移除事件監聽
        },
        error: function(errors) {
          console.log(errors)
        }
      })
      // console.log("send rails ajax resquest!!!!!!!!!!")
    }
  }

  const switchPosts = (e) => {                               //showPosts: 切換我的貼文/我被標記的貼文
    e.preventDefault()
    postNav.querySelectorAll("li a").forEach((btn) => {
      btn.classList.remove("active")
    })
    e.target.classList.add("active")           //active: bootstrap的使用中項目

    const type = getType()
    // console.log("type: " + type)
    if (type == "post_img") {
      tagImg.style.display = "none"
      postImg.style.display = "flex"
      tagPage = page
      page = myPage
    } else if (type == "tag_img") {
      postImg.style.display = "none"
      tagImg.style.display = "flex"
      myPage = page
      page = tagPage
    }

    document.body.addEventListener("scroll", loadPosts)
  }
})
