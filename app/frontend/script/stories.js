// 先抓到圖片的ＩＤ
// 再將ＩＤ塞進刪除鈕
// 後端刪除，要有一個contrallor

const Rails = require("@rails/ujs")
import Swal from 'sweetalert2'

document.addEventListener("turbolinks:load", () => {
  const storyDelete = document.getElementById('story_delete')

  const userId = document.location.href.split("users/")[1] // 取得url的params user id
  const storyElementId = document.querySelector(".story_id")
  const storyId = storyElementId.getAttribute("story_id")
  // console.log(userId)
  // console.log(storyId)

  let url = `/users/${userId}/${storyId}`
  // console.log(url)

  if(!storyDelete){return}

  storyDelete.addEventListener("click", () => {
    const $activeImg = document.querySelector('.carousel-inner .story-img.active')

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        if ($activeImg) $activeImg.remove()
        const $firstImg = document.querySelector('.carousel-inner .story-img')
        if ($firstImg) $firstImg.classList.add('active')

        Rails.ajax({
          url: url,
          type: "DELETE",
          success: function(data){
            // console.log("success:", url)
          }
        })
      }
    })
  })
})
