import Rails from '@rails/ujs'
document.addEventListener("turbolinks:load", () => {
  const postsForm = document.querySelector(".post-load-target")
  const postNav = document.querySelector(".posts-nav")
  let page = 1
  let tagPage = 1
  let myPage = 1
  let type = ""

  if (postsForm) {
    checkLoadType()
    document.body.addEventListener("scroll", loadPosts)      //加入捲軸滾動事件
  }

  if (postNav) {
    postNav.addEventListener("click", (e) => switchPosts(e))  //user show 個人/tag貼文切換
  }

  function checkLoadType() {                  //依照目前位置改變請求目標
    // console.log("checkLoadType")
    const followingPosts = document.querySelector(".following-posts")
    const mainPosts = document.querySelector(".main-posts")
    const myBtn = document.querySelector(".my-posts-btn")
    const tagBtn = document.querySelector(".tag-posts-btn")
    if (followingPosts) {
      type = "following_posts"
    } else if (mainPosts) {
      type = "my_posts"
    } else if (myBtn.classList.contains("active")) {
      type = "post_img"
    } else if (tagBtn.classList.contains("active")) {
      type = "tag_img"
    }
  }

  const scrollToBottom = () => { document.body.scrollHeight - window.innerHeight - 2 <= document.body.scrollTop }

  function loadPosts() {                           //滑動到畫面底部會請求載入更多post
    if (scrollToBottom) {
      // console.log("loadPosts.........................")
      page += 1
      const user_id = document.location.href.split("users/")[1]  //從目前網址取得params user id
      let url = ""
      if (type == "following_posts") {
        url = `/users/load_posts?page=${page}&type=${type}`
      } else if (type == "my_posts") {
        url = `/users/${user_id}/load_posts?page=${page}&type=${type}`
      } else {
        url = `/users/${user_id}/posts/load_posts?page=${page}&type=${type}`
      }

      Rails.ajax({
        url: url,
        type: "get",
        success: function(data) {
          const postsEl = data.querySelector("body").innerHTML
          // switch (type) {
          //   case "my_posts":
          //   case "following_posts":
          //     document.querySelector(".post-load-target").innerHTML += postsEl
          //     break
          //   case "post_img":
          //     document.querySelector(".post-img").innerHTML += postsEl
          //     break
          //   case "tag_img":
          //     document.querySelector(".tag-img").innerHTML += postsEl
          //     break
          // }

          if (type == "following_posts" || type == "my_posts") {
            document.querySelector(".post-load-target").innerHTML += postsEl
          } else if (type == "post_img") {
            document.querySelector(".post-img").innerHTML += postsEl
          } else if (type == "tag_img") {
            document.querySelector(".tag-img").innerHTML += postsEl
          }

          if (postsEl == "") {
            document.body.removeEventListener("scroll", loadPosts)
          }
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

    checkLoadType()
    // console.log("type: " + type)
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
