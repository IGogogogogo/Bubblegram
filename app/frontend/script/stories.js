// 先抓到圖片的ＩＤ
// 再將ＩＤ塞進刪除鈕
// 後端刪除，要有一個contrallor



document.addEventListener("turbolinks:load", () => {

  const storyDelete = document.getElementById('story_delete')

  if(!storyDelete){return}

  storyDelete.addEventListener("click", () => {
    // const allStories = document.querySelectorAll(".story-img")
    // console.log(allStories)

    // const active = document.querySelectorAll(".active")
    // console.log(active)

    // active.classList.remove("active")
    // allStories.forEach(() => {})

    const $activeImg = document.querySelector('.carousel-inner .story-img.active')
    if ($activeImg) $activeImg.remove()
    const $firstImg = document.querySelector('.carousel-inner .story-img')
    if ($firstImg) $firstImg.classList.add('active')
  })

})
