import Rails from "@rails/ujs"
import Swal from "sweetalert2"

document.addEventListener("turbolinks:load", () => {
  const storiesSection = document.querySelector('.stories')
  if(!storiesSection){ return }
  document.querySelector(".container").style.padding = "0"

  ////刪除story
  const headerBtn = document.querySelector('.header-btn')
  if(!headerBtn){return}

  headerBtn.addEventListener("click", (e) => {
    e.preventDefault()
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
  })

  ///顯示時間
  ////////輪播的事件
  $('#stories-carousel').on('slide.bs.carousel', function () {
    // console.log("change")

    const $activeImg = document.querySelector('.story-img.active')
    const storyId = $activeImg.dataset.story
    Array.from(document.querySelectorAll(".member-time")).forEach((el) => {
      el.style.display = "none"
    })
    document.querySelector(`.member-time.story-${storyId}`).style.display = "block"
  })
})
