import Rails from '@rails/ujs'
import Swal from "sweetalert2"

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

  // 打開功能區塊
  const btnDot = document.querySelector('.btn-dot')
  const modalFun = document.querySelector('.modal-fun')
  const modalDel = document.querySelector('.modal-del')
  if(!btnDot){return}

  btnDot.addEventListener("click", function(){
    console.log(btnDot)
    // $("#stories-carousel").carousel('pause')
    if(modalFun.style.display != 'block'){
      modalFun.style.display = 'block'
    }
  })

  //刪除story
  modalDel.addEventListener("click", (e) => delStory(e))

  const delStory = (e) => {
    e.preventDefault()
    modalFun.style.display = "none"
    // $("#stories-carousel").carousel('pause')

    // const userId = document.querySelector(".stories").dataset.user // 取得 user id
    // const $activeImg = document.querySelector('.story-img.active')
    // const storyId = $activeImg.dataset.story
    // const url = `/users/${userId}/stories/${storyId}`

    Swal.fire({
      title: '你確定要刪除嗎？',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '刪除',
      cancelButtonText: '取消'
    }).then((result) => {
      if (result.isConfirmed) {
        //前端畫面刪除
        if ($activeImg) $activeImg.remove()
        const $firstImg = document.querySelector('.carousel-inner .story-img')
        if ($firstImg) $firstImg.classList.add('active')

        //資料庫刪除
        // Rails.ajax({
        //   url: url,
        //   type: "DELETE",
        //   success: function(){
        //     console.log("success:", url)
        //   }
        // })
      }
    })
  }

  function carouselStart() {        ////owl carousel 輪播功能
    $('.stories .owl-carousel').owlCarousel({
      loop: false,
      margin: 0,
      nav: false,
      autoplay: true,
      autoplayTimeout: 5000,
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
      if (document.querySelector(".owl-stage") && document.querySelector(".owl-stage").lastChild) {
        setTimeout(()=>{   ////class active 不會馬上出現，所以用setTimeout
          if (document.querySelector(".owl-stage").lastChild.classList.contains("active")) {
            const nextUser = storiesSection.dataset.nextUser
            console.log(nextUser)
            if (nextUser != "undefined") {  ////沒下一位 user 時回首頁
              console.log("true")
              requestStories(nextUser)
              setNextAndPrevUser(nextUser)
            } else {
              console.log("false")
              document.location.pathname = "/"
            }
          }
        }, 10)
      }
    })
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
