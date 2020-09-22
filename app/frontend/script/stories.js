// 先抓到圖片的ＩＤ
// 再將ＩＤ塞進刪除鈕
// 後端刪除，要有一個contrallor

const Rails = require("@rails/ujs")

document.addEventListener("turbolinks:load", () => {
  const storyDelete = document.getElementById('story_delete')

  if(!storyDelete){return}

  Rails.ajax({
    url: "/",
    type: "delete"
    success: function(data){

    }
  })


  storyDelete.addEventListener("click", () => {
    const $activeImg = document.querySelector('.carousel-inner .story-img.active')
    if ($activeImg) $activeImg.remove()
    const $firstImg = document.querySelector('.carousel-inner .story-img')
    if ($firstImg) $firstImg.classList.add('active')
  })

})
