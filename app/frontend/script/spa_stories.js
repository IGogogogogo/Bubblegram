import Rails from '@rails/ujs'
import Swal from "sweetalert2"

document.addEventListener("turbolinks:load", () => {
  console.log("123")
  const carouselTime = 3000 ////限動輪播時間
  const storiesSection = document.querySelector(".stories")

  if(!storiesSection) return
  const userName = storiesSection.dataset.userName

  cssSetting()
  requestStories(userName)

  ////請求個人現動json
  function requestStories(name, index=0) {
    if(name == "null") {
      document.location.pathname ="/"
    }
    const url = `/stories.json?user=${name}`

    Rails.ajax({
      url: url,
      type: "get",
      success: function(data) {
        document.querySelector(".story-pic").innerHTML = ""
        storiesSection.dataset.userName = data.stories.user_name
        storiesSection.dataset.prevUser = data.stories.prev_user
        storiesSection.dataset.nextUser = data.stories.next_user
        storiesSection.dataset.storiesCount = data.stories.stories_count
        storiesSection.dataset.storyId = data.stories.main[0].id
        storiesSection.dataset.storyIndex = index

        renderStories(data.stories)

        if (index == "last") {    ////如果是請求上一個使用者限動會跳到他最後的現動
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
    createHeaderBtn()
    document.querySelector(".owl-prev").addEventListener("click", toPrevUserLastStory)
    // document.querySelector(".owl-next").addEventListener("click", toNextUserStories)
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

   ///輪播事件////////////////////////////////////////
  function addCarouselChangeEvent() {
    $('.owl-carousel').on('changed.owl.carousel', function() {
      console.log("changed")
      changeActiveDot()

      setTimeout(() => {  //////用setTimeout 才找得到 active item
        const storyActive = storiesSection.querySelector(".owl-item.active div")

        storiesSection.dataset.storyIndex = storyActive.dataset.storyIndex   ////設定index 用於判斷要不要請求另一個使用者限動
        storiesSection.dataset.storyId = storyActive.dataset.storyId   //////設定story id 用於刪除路徑
        changeStoryTime(storyActive.dataset)
        const isLastStory = Number(storyActive.dataset.storyIndex) + 1 == Number(storiesSection.dataset.storiesCount)

        if(isLastStory){
          document.querySelector(".owl-next").addEventListener("click", toNextUserStories)
        }
      }, 0)
    })
  }

  /////替換成下個使用者限動
  function toNextUserStories() {
    // console.log(storiesSection.dataset)
    const storyActive = storiesSection.querySelector(".owl-item.active div")
    const isLastStory = Number(storyActive.dataset.storyIndex) + 1 == Number(storiesSection.dataset.storiesCount)

    if (isLastStory){
      const nextUser = storiesSection.dataset.nextUser
      requestStories(nextUser)
    }

    document.querySelector(".owl-next").removeEventListener("click", toNextUserStories)
  }

  ////如果是第一則限動，按上一個限動時替換成上一個使用者最後的限動
  function toPrevUserLastStory() {
    let storyIndex = storiesSection.dataset.storyIndex
    let prevUserName = storiesSection.dataset.prevUser
    if (storyIndex == "0") {
      requestStories(prevUserName, "last")
      document.querySelector(".owl-prev").removeEventListener("click", toPrevUserLastStory)
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

  function cssSetting() {       ///設定限時動態頁面 css style
    document.querySelector(".container").style.padding = "0"
    document.querySelector(".container").classList.remove("pb-5")
    document.querySelector("body").style.backgroundColor = "#262626"
    document.querySelector(".index-nav").parentNode.style.display = "none"
    storiesSection.classList.add("text-light")
  }

  /////啟動輪播套件功能
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

  //////建立功能按鈕
  function createHeaderBtn() {
    const btnDot = document.querySelector('.btn-dot')
    const modalFun = document.querySelector('.modal-fun')
    const modalDel = document.querySelector('.modal-del')
    const isOwner = storiesSection.dataset.userName == storiesSection.dataset.currentUser

    if(isOwner) {
      btnDot.style.display = "block"   // 顯示點點點
    }

    btnDot.addEventListener("click", function(){
      $('.stories .owl-carousel').trigger('stop.owl.autoplay')

      if(modalFun.style.display != "block"){
        modalFun.style.display = "block"      // 打開功能區塊
      }
    })
    // //刪除story
    modalDel.addEventListener("click", (e) => delStory(modalFun, e))
  }

  ////刪除自己特定限動
  function delStory(modalFun, e) {
    e.preventDefault()
    modalFun.style.display = "none"
    console.log("del")

    const storyId = storiesSection.dataset.storyId
    const storyIndex = storiesSection.dataset.storyIndex
    const userName = storiesSection.dataset.userName

    const url = `/users/${userName}/stories/${storyId}`
    console.log(url)

    Swal.fire({
      title: '你確定要刪除嗎？',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '刪除',
      cancelButtonText: '取消'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result)
        //前端畫面刪除
        $(".owl-carousel").trigger('remove.owl.carousel', [storyIndex]).trigger('refresh.owl.carousel');

        // 資料庫刪除
        Rails.ajax({
          url: url,
          type: "DELETE",
          success: function(){
            console.log("success:", url)
          }
        })
      } else {
        $('.stories .owl-carousel').trigger('play.owl.autoplay')
      }
    })
  }


  //////測試資訊
  function testInfo(newStoryItem) {
    const info = document.createElement("div")    //////////

    info.innerHTML += `<p>#index: ${newStoryItem.dataset.storyIndex}</p>`
    info.innerHTML += `<p>#id: ${newStoryItem.dataset.storyId}</p>`
    info.innerHTML += `<p>#storyTime: ${newStoryItem.dataset.storyTime}</p>`
    info.style = "position: absolute;top: 40%;font-size: 50px;background-color: #000;"
    return info
  }
})
