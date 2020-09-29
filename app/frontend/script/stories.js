// 先抓到圖片的ＩＤ
// 再將ＩＤ塞進刪除鈕
// 後端刪除，要有一個contrallor

const Rails = require("@rails/ujs")
import Swal from 'sweetalert2'

document.addEventListener("turbolinks:load", () => {
  const funBtn = document.querySelector('.fun-btn');
  const modalFun = document.querySelector('.modal-fun');
  const modalDel = document.querySelector('.modal-del');
  const modalCancel = document.querySelector('.modal-cancel')

  const storyDelete = document.getElementById('story_delete')
  const userId = document.location.href.split("users/")[1] // 取得url的params user id
  const storyElementId = document.querySelector(".story_id")
  const storyId = storyElementId.getAttribute("story_id")
  // console.log(userId)
  // console.log(storyId)
  let url = `/users/${userId}/${storyId}`
  // console.log(url)

  funBtn.addEventListener('click', function(){
    modalFun.classList.add('open')
  })
  modalCancel.addEventListener('click', function(){
    modalFun.classList.remove('open')
  })

  // 真刪除資料庫story
  if(!storyDelete){return}
  storyDelete.addEventListener("click", (e) => {
    const $activeImg = document.querySelector('.carousel-inner .story-img .active')
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
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
