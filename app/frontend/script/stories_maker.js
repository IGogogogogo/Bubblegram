import Rails from '@rails/ujs'
import Swal from 'sweetalert2'

document.addEventListener("turbolinks:load", () => {
  const storiesSection = document.querySelector(".stories")
  const carouselTime = 100000

  if (!storiesSection) return
  // console.log("stories maker")
  // const userName = storiesSection.dataset.userName
  cssSetting()
  requestStories(storiesSection.dataset)
  carouselStart()
  whenCarouselChange()
  renewUserInfoAndStoryTime(storiesSection.dataset)

  function cssSetting() {       ///設定限時動態頁面 css style
    document.querySelector(".container").style.padding = "0"
    document.querySelector(".container").classList.remove("pb-5")
    document.querySelector("body").style.backgroundColor = "#262626"
    document.querySelector(".index-nav").parentNode.style.display = "none"
    storiesSection.classList.add("text-light")
  }

  function requestStories({userName}) {       ///get 請求取得限時動態
    // console.log(userName)
    const url = `/users/${userName}/stories.json`
    Rails.ajax({
      url: url,
      type: "get",
      success: function(data) {
        $('.owl-carousel').owlCarousel({
          onDragged: renderStories(data.stories)
        });
      },
      error: function(errors) {
        console.log(errors)
      }
    })
  }

  function renderStories(stories) {
    // console.log(stories)
    for(let i=0; i<stories.main.length; i++) {
      const newStoryItem = createStoryItem(stories.main[i], i, stories.main.length)
      $('.owl-carousel').trigger('add.owl.carousel', newStoryItem)
    }
    toSelectedStory(stories)
  }

  function toSelectedStory(stories) {
    console.log("toSelectedStory")
    // console.log(stories)
    stories.position.forEach(user => {
      if (user.user.name == stories.user_name) {
        const index = Number(user.index)
        console.log(user.user.name)
        console.log(user.index)
        console.log(Number(index) == 19)
        console.log("toSelectedStory!!!!")
        $('.owl-carousel').trigger("to.owl.carousel", [index, 1])
      }
    });
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
  // console.log(delStory)

  const delStory = (e) => {
    e.preventDefault()
    modalFun.style.display = "none"
    // $("#stories-carousel").carousel('pause')

    // const userId = document.querySelector(".stories").dataset.user // 取得 user id
    // const $activeImg = document.querySelector('.story-img.active')
    // const storyId = $activeImg.dataset.story
    // const url = `/users/${userId}/stories/${storyId}`
    const $activeImg = storiesSection.querySelector(".owl-item.active div")
    const nickName = $activeImg.dataset.userName
    const storyId = $activeImg.dataset.storyId
    const url = `/users/${nickName}/stories/${storyId}`
    console.log(nickName)
    console.log($activeImg)
    console.log(storyId)
    console.log(url)

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
        // if ($activeImg) $activeImg.remove()
        // const $firstImg = document.querySelector('.owl-item')
        // if ($firstImg) $firstImg.classList.add('active')

        // 資料庫刪除
        Rails.ajax({
          url: url,
          type: "DELETE",
          success: function(){
            //刪除會回首頁，待問助教
            // $('.owl-carousel').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
            // $('.owl-carousel').find('.owl-stage-outer').children().unwrap();
            console.log("success:", url)
          }
        })
      }
    })
  }

  function createStoryItem(story, index, count) {      ////建立 story(輪播物件) 資料
    // console.log(stories)
    const newStoryItem = document.createElement("div")
    const img = document.createElement("img")

    newStoryItem.dataset.storyIndex = index
    newStoryItem.dataset.storyCount = count
    newStoryItem.dataset.storyId = story.id
    newStoryItem.dataset.userName = story.user.nick_name
    newStoryItem.dataset.userAvatar = story.user.avatar.url

    img.src = story.picture.url
    img.classList.add("w-100")
    img.style.height = "100vh"
    newStoryItem.dataset.storyTime = story.time
    newStoryItem.appendChild(img)
    // newStoryItem.appendChild(testInfo(newStoryItem))          //////////test 資料 以後拿掉
    newStoryItem.id = `story-id-${story.id}`
    return newStoryItem
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

  function whenCarouselChange() {     ///輪播事件
    $('.owl-carousel').on('changed.owl.carousel', function() {
      // console.log("changed")
      setTimeout(() => {    //////用setTimeout 才找得到 active item
        const storyActive = storiesSection.querySelector(".owl-item.active div")
        console.log(storyActive)
        renewUserInfoAndStoryTime(storyActive.dataset)
        redirectToHomeIfLastStory(storyActive)
      }, 0)
    })
  }

  function renewUserInfoAndStoryTime({userAvatar, userName, storyTime}) {  //更新使用者資料跟限動時間
    storiesSection.querySelector(".user-avatar img").src = userAvatar
    storiesSection.querySelector(".user-name span").textContent = userName
    storiesSection.querySelector(".story-time span").textContent = storyTime
  }

  function redirectToHomeIfLastStory(storyItem) {    ////沒有下個限時動態時加上回首頁事件
    if (storyItem.parentNode == document.querySelector(".owl-stage").lastChild){
      setTimeout(() => {
        document.location.pathname = "/"
      }, carouselTime);

      document.querySelector(".owl-next").addEventListener("click", () => {
        document.location.pathname = "/"
      })
    }
  }

  // function testInfo(newStoryItem) {
  //   const info = document.createElement("div")    //////////
  //   info.innerHTML += `<p>#index: ${newStoryItem.dataset.storyIndex}/${newStoryItem.dataset.storyCount}</p>`
  //   info.innerHTML += `<p>#id: ${newStoryItem.dataset.storyId}</p>`
  //   info.innerHTML += `<p>#name: ${newStoryItem.dataset.userName}</p>`
  //   info.style = "position: absolute;top: 40%;font-size: 50px;background-color: #000;"
  //   return info
  // }

})
