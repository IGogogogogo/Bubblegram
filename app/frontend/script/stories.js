import Rails from "@rails/ujs"
import Swal from "sweetalert2"

document.addEventListener("turbolinks:load", () => {
  console.log("stories")
  const storiesSection = document.querySelector('.stories')
  if(!storiesSection){ return }
  document.querySelector(".container").style.padding = "0"
  document.querySelector("body").style.backgroundColor = "#262626"
  document.querySelector(".index-nav").parentNode.style.display = "none"

  // 輪播秒數
  $('.carousel').carousel({
    interval: 1000000
  })

  ////打開功能區塊
  const headerBtn = document.querySelector('.header-btn')
  const modalFun = document.querySelector('.modal-fun')
  const modalDel = document.querySelector('.modal-del')
  const modalCancel = document.querySelector('.modal-cancel')
  if(!headerBtn){return}

  headerBtn.addEventListener("click", function(){
    $("#stories-carousel").carousel('pause')
    if(modalFun.style.display != 'block'){
      modalFun.style.display = 'block'
    }
  })

  // headerBtn.addEventListener('click', function(){
  //   modalFun.classList.add('open')
  // })
  // modalCancel.addEventListener('click', function(){
  //   modalFun.classList.remove('open')
  // })


  //刪除story
  modalDel.addEventListener("click", (e) => delStory(e))

  const delStory = (e) => {
    e.preventDefault()
    modalFun.style.display = "none"
    $("#stories-carousel").carousel('pause')

    const userId = document.querySelector(".stories").dataset.user // 取得 user id
    const $activeImg = document.querySelector('.story-img.active')
    const storyId = $activeImg.dataset.story
    const url = `/users/${userId}/stories/${storyId}`

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
        Rails.ajax({
          url: url,
          type: "DELETE",
          success: function(){
            console.log("success:", url)
          }
        })
      }
    })
  }

  ///切換上一個人使用這限時動態
  // const prevBtn = document.querySelector(".carousel-control-prev")
  // prevBtn.addEventListener("click", function(){
  //   console.log("123")
  //   const $activeImg = document.querySelector('.story-img.active')
  //   const carouselIndex = $activeImg.dataset.index
  //   const prevUser = storiesSection.dataset.prevUser
  //   console.log(carouselIndex)
  //   console.log(prevUser != "")
  //   const isFirstImg = Number(carouselIndex) - 1 == 0
  //   const users = storiesSection.dataset.users
  //   console.log(users)
  //   if (isFirstImg) {
  //     console.log(isFirstImg)
  //     $("#stories-carousel").carousel('pause')
  //     if (prevUser == ""){
  //       console.log("back")
  //       prevBtn.pathname = "/"
  //     } else {
  //       console.log("prev")
  //       prevBtn.pathname = `/users/${prevUser}/stories`
  //     }
  //   }


  // })

  // ///切換下一個使用者的限時動態
  // console.log($("#stories-carousel"))
  // $("#stories-carousel").on('slide.bs.carousel', function () {
  //   //第二個人不能進來這個事件
  //   console.log("change")
  //   // checkLastStory()
  // })

  // const checkLastStory = () => {
  //   console.log("checkLastStory")
  //   const $activeImg = document.querySelector('.story-img.active')
  //   const carouselIndex = $activeImg.dataset.index
  //   const storiesCount = $activeImg.dataset.storiesCount
  //   const nextUser = storiesSection.dataset.nextUser
  //   if (Number(carouselIndex) + 1 == Number(storiesCount)) {
  //     $("#stories-carousel").carousel('pause')

  //     if (nextUser != "") {
  //       document.location.pathname = `/users/${nextUser}/stories`
  //     } else if (nextUser == "") {
  //       document.location.pathname = "/"
  //     }
  //   }
  // }



  ///顯示時間
  ////////輪播的事件
  // $('#stories-carousel').on('slide.bs.carousel', function () {
  //   // console.log("change")

  //   const $activeImg = document.querySelector('.story-img.active')
  //   const storyId = $activeImg.dataset.story
  //   Array.from(document.querySelectorAll(".member-time")).forEach((el) => {
  //     el.style.display = "none"
  //   })
  //   document.querySelector(`.member-time.story-${storyId}`).style.display = "block"
  // })
})
