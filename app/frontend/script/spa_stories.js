import Rails from '@rails/ujs'

document.addEventListener("turbolinks:load", () => {
  const storiesSection = document.querySelector(".stories")

  if (!storiesSection) return
  console.log("spa stories")
  const selfName = storiesSection.dataset.selfName
  console.log(selfName)
  cssSetting()
  requestStories(selfName)
  carouselStart()
  whenCarouselChange()
  setNextAndPrevUser(selfName)

  function cssSetting() {       ///設定限時動態頁面 css style
    document.querySelector(".container").style.padding = "0"
    document.querySelector(".container").classList.remove("pb-5")
    document.querySelector("body").style.backgroundColor = "#262626"
    document.querySelector(".index-nav").parentNode.style.display = "none"
    storiesSection.classList.add("text-light")
  }

  function requestStories(selfName) {       ///get 請求取得限時動態
    // console.log(selfName)
    const url = `/users/${selfName}/stories.json`
    Rails.ajax({
      url: url,
      type: "get",
      success: function(data) {
        // console.log(data)
        renderStories(data)
      },
      error: function(errors) {
        console.log(errors)
      }
    })
  }

  function renderStories(data) {
    createUserInfo(data.user)
    document.querySelector(".story-time span").textContent = data.stories[0].time

    data.stories.forEach(story => {
      const newStory = createStories(story)
      $('.owl-carousel').trigger('add.owl.carousel', newStory)
    })
  }

  function createUserInfo(user) {    ////建立 user 資料
    document.querySelector(".user-avatar img").src = user.avatar.url
    document.querySelector(".user-name span").textContent = user.nick_name
  }

  function createStories(story) {      ////建立 story(輪播) 資料
    // console.log(stories)
    const newStory = document.createElement("div")
    const img = document.createElement("img")
    img.src = story.picture.url
    img.classList.add("w-100")
    img.style.height = "100vh"
    newStory.dataset.time = story.time
    newStory.appendChild(img)
    return newStory
  }

  function carouselStart() {        ////owl carousel 輪播功能
    $('.stories .owl-carousel').owlCarousel({
      center: true,
      loop: false,
      margin: 0,
      nav: true,
      touchDrag: true,
      autoplay: true,
      autoplayTimeout: 2000,
      responsive:{
        0:{
            items:1
        }
      }
    })
  }

  function whenCarouselChange() {     ///輪播事件
    $('.owl-carousel').on('changed.owl.carousel', function() {
      const storyTime = document.querySelector(".story-time span")
      const storyActive = document.querySelector(".owl-item.active div")
      if (storyActive) { storyTime.textContent = storyActive.dataset.time }

      // 如果是當前 user最後的限動就跳下一位 user的限動
      const owlStage = document.querySelector(".owl-stage")   ////owl-item 的外層 div
      if (owlStage && owlStage.lastChild) {
        const nextUser = storiesSection.dataset.nextUser
        toAnotherUserStories(owlStage.lastChild, nextUser)
      }

      // 如果是當前 user 第一個限動就跳上一位 user的限動
      if (owlStage && owlStage.firstChild) {
        // const prevUser = storiesSection.dataset.prevUser
        // toFirstUserStories(owlStage.firstChild, prevUser)
      }
    })
  }

  function toAnotherUserStories(storyDiv, user) {
    setTimeout(()=>{   ////class active 不會馬上出現，所以用setTimeout
      if (storyDiv.classList.contains("active")) {
        console.log(user)
        if (user != "undefined") {  ////沒下一位 user 時回首頁
          console.log("true")
          requestStories(user)
          setNextAndPrevUser(user)
        } else {
          console.log("false")
          document.location.pathname = "/"
        }
      }
    }, 10)
  }

  function setNextAndPrevUser(selfName) {     //////設定上一位/下一位 限動 user
    const viewableUsers = JSON.parse(storiesSection.dataset.viewableUsers)
    const selfIndex = viewableUsers.indexOf(selfName)
    console.log(viewableUsers)
    console.log(selfIndex)
    if (selfIndex + 1 != viewableUsers.length) {
      storiesSection.dataset.nextUser = viewableUsers[selfIndex + 1]
    } else {
      console.log("THE END!")
    }

    if (selfIndex != 0 ) {
      storiesSection.dataset.nextUser = viewableUsers[selfIndex + 1]
    } else {
      console.log("THE START!")
    }

  }
})
