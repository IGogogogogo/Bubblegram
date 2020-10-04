import Rails from '@rails/ujs'

document.addEventListener("turbolinks:load", () => {
  const storiesSection = document.querySelector(".stories")

  if (!storiesSection) return
  console.log("spa stories")

  cssSettiong()
  requestStories()
  carouselStart()
  whenCarouselChange()

  function cssSettiong () {
    document.querySelector(".container").style.padding = "0"
    document.querySelector(".container").classList.remove("pb-5")
    document.querySelector("body").style.backgroundColor = "#262626"
    document.querySelector(".index-nav").parentNode.style.display = "none"
    storiesSection.classList.add("text-light")
  }

  function requestStories () {
    const selfName = storiesSection.dataset.selfName
    console.log(selfName)
    const url = `/users/${selfName}/stories.json`
    Rails.ajax({
      url: url,
      type: "get",
      success: function(data) {
        console.log(data)
        renderStories(data)
      },
      error: function(errors) {
        console.log(errors)
      }
    })
  }

  function renderStories(data) {
      ///////之後再改成當前user

    createUserInfo(data[0])

    createStories(data[0].user.stories)
  }

  function createUserInfo(info) {
    document.querySelector(".user-avatar img").src = info.user.avatar.url
    document.querySelector(".user-name span").textContent = info.user.nick_name
  }

  function createStories(info) {
    console.log(info)
    document.querySelector(".story-time span").textContent = info[0].time
    const storiesMain = document.querySelector(".stories-main")
    info.forEach(story => {
      const newStory = document.createElement("div")
      const img = document.createElement("img")
      img.src = story.picture.url
      img.classList.add("w-100")
      img.style.height = "100vh"
      newStory.dataset.time = story.time
      newStory.appendChild(img)
      $('.owl-carousel').trigger('add.owl.carousel', newStory)
    })
    storiesMain.classList.add("owl-carousel")
  }

  function carouselStart() {
    $('.stories.story-owl-carousel').owlCarousel({
      loop: false,
      margin: 0,
      nav: false,
      responsive:{
        0:{
            items:2
        }
      }
    })
  }

  function whenCarouselChange() {
    $('.owl-carousel').on('changed.owl.carousel', function() {
      const storyTime = document.querySelector(".story-time span")
      const storyActive = document.querySelector(".owl-item.active div")
      if (storyActive) storyTime.textContent = storyActive.dataset.time
    })
  }


})
