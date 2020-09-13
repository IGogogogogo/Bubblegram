import axios from "axios"

document.addEventListener("turbolinks:load", () => {
  const postNav = document.querySelector(".posts-nav")
  const url = "http://localhost:3000"   //上線後要改成正式網址
  const loadCount = 21                  //每次請求post筆數
  const userId = window.location.href.split("users/")[1]
  let myPage = 1
  let tagPage = 1
  let page = 1
  let type = "my_posts"

  if(!postNav) return
  postNav.addEventListener("click", (e) => showPosts(e))

  const showPosts = (e) => {                               //showPosts: 切換我的貼文/我被標記的貼文
    e.preventDefault()
    postNav.querySelectorAll("li a").forEach((btn) => {
      btn.classList.remove("active")
    })
    e.target.classList.add("active")                       //active: bootstrap的使用中項目

    const myBtn = document.querySelector(".my-posts-btn")
    const tagBtn = document.querySelector(".tag-posts-btn")
    if (myBtn.classList.contains("active")) {
      type = "my_posts"
      tagPage = page
      page = myPage
    } else if (tagBtn.classList.contains("active")) {
      type = "tag_posts"
      myPage = page
      page = tagPage
    }
    document.body.addEventListener("scroll", loadPosts)
  }

  document.body.addEventListener("scroll", loadPosts)

  function loadPosts(e) {                                        //滑動到畫面90%位置會載入更多post
    if (e.target.scrollTop * 2 >= e.target.scrollHeight * 9 / 10) {
      // console.log("loadPosts...")
      page += 1

      const path = `${url}/users/${userId}/posts/load.json?page=${page}&type=${type}`
      axios.get(path)
      .then((response) => response.data)
      .then((posts) => {
        if(posts.length < loadCount) {
          document.body.removeEventListener("scroll", loadPosts)
        }
        posts.forEach((post) => {                                //使用post_img template 加入新元素
          createPostImg(post)
        })
      })
    }
  }

  const createPostImg = (post) => {
    const t = document.querySelector("#post-template")
    const clone = document.importNode(t.content, true)
    clone.querySelector("img").src = post.image.url
    if (type == "my_posts") {
      document.querySelector(".my-posts").appendChild(clone)
    } else if (type == "tag_posts") {
      document.querySelector(".taged-posts").appendChild(clone)
    }
  }
})
