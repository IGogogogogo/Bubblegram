import Rails from '@rails/ujs'
import Swal from "sweetalert2"

document.addEventListener("turbolinks:load", () => {
  console.log("123")
  const carouselTime = 1000000 ////限動輪播時間
  // 功能:
  // 1. 可以載入限動
  // 2. 可以輪播（自動，按鈕，滑動）
  // 3. 可以換上下使用者
  // 4. 可以刪除
  // 5. 有白線提示目前限動


  // 步驟：
  // 請求 [當前使用者] 限動
  //   [id]
  //   [picture]
  //   [create time]
  //   [限動數量]

  const storiesSection = document.querySelector(".stories")
  if(!storiesSection) return
  const userName = storiesSection.dataset.userName

  cssSetting()
  requestStories(userName)

  ////請求個人現動json
  function requestStories(name, index=0) {
    const url = `/stories.json?user=${name}`

    Rails.ajax({
      url: url,
      type: "get",
      success: function(data) {
        document.querySelector(".story-pic").innerHTML = ""
        storiesSection.dataset.userName = data.stories.user_name
        storiesSection.dataset.prevUser = data.stories.prev_user
        storiesSection.dataset.nextUser = data.stories.next_user
        storiesSection.dataset.storyIndex = index

        renderStories(data.stories)

        if (index == "last") {
          console.log(data.stories.main.length)
          index = data.stories.main.length - 1
          $('.owl-carousel').trigger("to.owl.carousel", [index, 1])
        }

      },
      error: function(errors) {
        console.log(errors)
      }
    })
  }

  ////加入元素與事件（建立現動+白線+啟動輪播套件+輪播事件）
  function renderStories(stories){
    const storyPic = document.querySelector(".story-pic")
    const owlCarousel = document.createElement("div")
    owlCarousel.classList = "owl-carousel"

    for(let i=0; i<stories.main.length; i++) {
      const newStoryItem = createStoryItem(stories.main[i], i)
      owlCarousel.appendChild(newStoryItem)
    }
    storyPic.appendChild(owlCarousel)
    addUserInfoAndStoryTime(stories)
    carouselStart()
    createDots()
    addCarouselChangeEvent()
    replacePrevUserWhenFirstStory()
  }

  /////加入 使用者資料和現動時間
  function addUserInfoAndStoryTime(stories){
    const memberImg = document.querySelector(".member-pic img")
    const memberName = document.querySelector(".member-name span")
    const storyTime = document.querySelector(".story-time span")
    memberImg.src = stories.user_avatar
    memberName.textContent = stories.user_name
    storyTime.textContent = stories.main[0].time
  }

  /////建立限動元素
  function createStoryItem(story, index) {
    // console.log(stories)
    const newStoryItem = document.createElement("div")
    const img = document.createElement("img")

    newStoryItem.dataset.storyIndex = index
    newStoryItem.dataset.storyId = story.id
    newStoryItem.dataset.storyTime = story.time
    img.src = story.picture.url
    img.classList = "w-100"
    img.style.height = "100vh"

    newStoryItem.appendChild(img)
    newStoryItem.appendChild(testInfo(newStoryItem))          //////////test 資料 以後拿掉
    newStoryItem.id = `story-id-${story.id}`
    return newStoryItem
  }

  //////建立上方動態白線
  function createDots() {
    const dots = document.querySelector(".owl-dots")
    dots.style.position = "absolute"
    dots.style.top = "20%"
    dots.style.width = "100%"
    dots.style.display = "flex"

    const dotsArray = Array.from(document.querySelectorAll(".owl-dot"))
    for(let i = 0; i< dotsArray.length; i++) {
      dotsArray[i].style.flexGrow = "1"
      dotsArray[i].style.height = "3px"
      dotsArray[i].style.backgroundColor = "#aaa"
      dotsArray[i].style.margin = "0 2px"
    }

    dotsArray[0].style.backgroundColor = "#fff"
  }

   ///輪播事件
  function addCarouselChangeEvent() {
    $('.owl-carousel').on('changed.owl.carousel', function() {
      console.log("changed")
      changeActiveDot()

      setTimeout(() => {  //////用setTimeout 才找得到 active item
        const storyActive = storiesSection.querySelector(".owl-item.active div")
        const lastStory = document.querySelector(".owl-stage").lastChild.firstChild
        // console.log(storyActive.dataset)

        storiesSection.dataset.storyIndex = storyActive.dataset.storyIndex
        console.log(storyActive.dataset.storyIndex)
        console.log("index: " + storiesSection.dataset.storyIndex)

        changeStoryTime(storyActive.dataset)

        if(storyActive == lastStory){
          document.querySelector(".owl-next").addEventListener("click", () => replaceToNextUserStories())
          setTimeout(() => replaceToNextUserStories(), carouselTime);
        }
      }, 0)
    })
  }

  /////替換成下個使用者限動
  function replaceToNextUserStories() {
    console.log(storiesSection.dataset)
    const nextUser = storiesSection.dataset.nextUser
    requestStories(nextUser)
  }

  ////如果是第一則限動，按上一個限動時替換成上一個使用者最後的限動
  function replacePrevUserWhenFirstStory() {
    console.log(storiesSection.dataset.storyIndex)
    const storyIndex = storiesSection.dataset.storyIndex
    const prevUserName = storiesSection.dataset.prevUser
    console.log(storyIndex)
    console.log(storiesSection.dataset)
    console.log(prevUserName)
    if (storyIndex == "0") {
      console.log("true")
      document.querySelector(".owl-prev").addEventListener("click", () => requestStories(prevUserName, "last"))
    }

  }

  //////////改變現動白線顏色
  function changeActiveDot() {
    const dotsArray = Array.from(document.querySelectorAll(".owl-dot"))
    dotsArray.forEach((dot) => {
      dot.style.backgroundColor = "#aaa"
    })
    document.querySelector(".owl-dot.active").style.backgroundColor = "#fff"
  }

  ////改變現動時間
  function changeStoryTime({storyTime}) {
    const timeItem = document.querySelector(".story-time span")
    timeItem.textContent = storyTime
  }

  function testInfo(newStoryItem) {
    const info = document.createElement("div")    //////////

    info.innerHTML += `<p>#index: ${newStoryItem.dataset.storyIndex}</p>`
    info.innerHTML += `<p>#id: ${newStoryItem.dataset.storyId}</p>`
    info.innerHTML += `<p>#storyTime: ${newStoryItem.dataset.storyTime}</p>`
    info.style = "position: absolute;top: 40%;font-size: 50px;background-color: #000;"
    return info
  }


  // 請求 [使用者與所有追蹤人名字]
  //   所有人[nick name]

  // 建立 [使用者] 限動
  //   限動有 [id] 作為刪除判斷
  //   當前現動有 [active]
  //   限動外層加入 [user name]

  // 到目前 [使用者] [最後的限動][按下一個]時
  //   有[下個使用者]
  //     有[下個使用者]限動
  //       跳到[下個使用者][第一個]限動
  //     沒有[下個使用者]限動
  //       請求[下個使用者]限動
  //       隱藏目前限動外層
  //       建立[新使用者]限動
  //       跳到[下個使用者][第一個]限動
  //   沒有[下個使用者]
  //     回首頁


  // 目前是[使用者][第一個現動][按上一個]時
  // 有[上個使用者]
  //   有[上個使用者]限動
  //     跳到[上個使用者][最後的]限動
  //   沒有[上個使用者]限動
  //     請求[上個使用者]限動
  //     隱藏目前限動外層
  //     建立[新使用者]限動
  //     跳到[上個使用者][最後的]限動
  // 沒有[上個使用者]
  //   回首頁

  // [使用者]是本人時
  //   加入刪除選項

  // 限動刪除時
  //   取得id
  //   刪除

  function cssSetting() {       ///設定限時動態頁面 css style
    document.querySelector(".container").style.padding = "0"
    document.querySelector(".container").classList.remove("pb-5")
    document.querySelector("body").style.backgroundColor = "#262626"
    document.querySelector(".index-nav").parentNode.style.display = "none"
    storiesSection.classList.add("text-light")
  }

  function carouselStart() {        ////owl carousel 輪播功能
    $('.stories .owl-carousel').owlCarousel({
      center: true,
      loop: false,
      margin: 0,
      nav: true,
      touchDrag: true,
      autoplay: true,
      autoplayTimeout: carouselTime,
      responsive:{
        0:{
            items:1
        }
      }
    })
  }
})
