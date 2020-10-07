import Rails from '@rails/ujs'
import Swal from "sweetalert2"

document.addEventListener("turbolinks:load", () => {
  const storiesSection = document.querySelector(".stories")
  const carouselTime = 100000

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
        console.log(data)
        // renderStories(data)

        $('.owl-carousel').owlCarousel({
          onDragged: renderStories(data)
        });
      },
      error: function(errors) {
        console.log(errors)
      }
    })
  }

  function renderStories(data) {
    // createUserInfo(data.user)
    document.querySelector(".story-time span").textContent = data.stories[0].time

    // data.stories.forEach(story => {
    //   const newStory = createStories(story)
    //   $('.owl-carousel').trigger('add.owl.carousel', newStory)
    // })

    for(let i=0; i<data.stories.length; i++) {
      const newStory = createStories(data.stories[i], i, data.stories.length)
      $('.owl-carousel').trigger('add.owl.carousel', newStory)
    }
    carouselStart()
  }

  function createUserInfo(user) {    ////建立 user 資料
    document.querySelector(".user-avatar img").src = user.avatar.url
    document.querySelector(".user-name span").textContent = user.nick_name
  }

  function createStories(story, index, count) {      ////建立 story(輪播) 資料
    // console.log(stories)
    createUserInfo(story.user)
    const newStory = document.createElement("div")
    const img = document.createElement("img")
    const info = document.createElement("div")    //////////

    newStory.dataset.storyIndex = index
    newStory.dataset.storyCount = count
    newStory.dataset.storyId = story.id
    newStory.dataset.author = story.user.nick_name
    info.innerHTML += `<p>#index: ${newStory.dataset.storyIndex}/${newStory.dataset.storyCount}</p>`
    info.innerHTML += `<p>#id: ${newStory.dataset.storyId}</p>`
    info.innerHTML += `<p>#author: ${newStory.dataset.author}</p>`
    info.style = "position: absolute;top: 40%;font-size: 50px;background-color: #000;"

    img.src = story.picture.url
    img.classList.add("w-100")
    img.style.height = "100vh"
    newStory.dataset.time = story.time
    newStory.appendChild(img)
    newStory.appendChild(info)          //////////
    newStory.id = `story-id-${story.id}`
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
      nav: true,
      touchDrag: true,
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
      // console.log(event)
      const storyTime = document.querySelector(".story-time span")
      const storyActive = document.querySelector(".owl-item.active div")
      if (storyActive) { storyTime.textContent = storyActive.dataset.time }

      // 如果是當前 user 最後的限動就跳下一位 user 的限動
      const owlStage = document.querySelector(".owl-stage")   ////owl-item 的外層 div
      if (owlStage && owlStage.lastChild) {
        // const nextUser = storiesSection.dataset.nextUser
        $('.owl-carousel').owlCarousel({   ////class active 不會馬上出現，用 callback 事件
          onDragged: addJumpToNextEvent()
        })
      }
    })
  }

  function addJumpToNextEvent() {
    // const owlStage = document.querySelector(".owl-stage")
    const nextUser = storiesSection.dataset.nextUser
    // console.log("?:" + isTailStory())
    if (isLastStory()) {
      console.log(nextUser)
      document.querySelector(".owl-next").addEventListener("click", toNextUserStories)
      setTimeout(() => { toNextUserStories(nextUser) }, carouselTime);
    }
  }

  function isLastStory() {
    console.log("isLastStory?")
    // setTimeout(() => {
      if (document.querySelector(".owl-item.active")) {
        const index = document.querySelector(".owl-item.active").firstChild.dataset.storyIndex
        const StoryCount = document.querySelector(".owl-item.active").firstChild.dataset.storyCount
        console.log("index: " + Number(index))
        console.log("StoryCount: " + StoryCount)

        if (StoryCount - 2 == Number(index)) {
          return true
        }
      }
  }

  const toNextUserStories = () => {
    console.log("toNextUserStories")
    const _user = storiesSection.dataset.nextUser
    console.log(_user)

    if (_user != "nobody") {  ////沒 user 時回首頁
      requestStories(_user)
      setNextAndPrevUser(_user)
      setTimeout(() => {
        $('.owl-carousel').trigger('next.owl.carousel')
      }, 50)
      // const usersCount = JSON.parse(storiesSection.dataset.viewableUsers).length
      // $('.owl-carousel').trigger("to.owl.carousel", [0, 1])
    } else {
      document.location.pathname = "/"
    }
    document.querySelector(".owl-next").removeEventListener("click", toNextUserStories)
  }


  // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  // console.log(document.querySelector(".owl-prev"))
  // document.querySelector(".owl-prev").addEventListener("click", toPrevUserStories)


  // function toPrevUserStories(){
  // }

  function setNextAndPrevUser(selfName) {     //////設定上一位/下一位 限動 user
    const viewableUsers = JSON.parse(storiesSection.dataset.viewableUsers)
    const selfIndex = viewableUsers.indexOf(selfName)

    if (selfIndex + 1 != viewableUsers.length) {
      storiesSection.dataset.nextUser = viewableUsers[selfIndex + 1]
    } else {
      storiesSection.dataset.nextUser = "nobody"
    }

    if (selfIndex >= 0 ) {
      storiesSection.dataset.prevUser = viewableUsers[selfIndex - 1]
    } else {
      storiesSection.dataset.nextUser = "nobody"
    }
  }
})
