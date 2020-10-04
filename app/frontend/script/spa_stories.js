import Rails from '@rails/ujs'

document.addEventListener("turbolinks:load", () => {
  const storiesSection = document.querySelector(".stories")

  if (!storiesSection) return
  console.log("spa stories")

  cssSettiong()
  requestStories()

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
    data.forEach(user => {
      createUserInfo(user)

    });
  }

  function createUserInfo(user) {
    console.log(user.user.avatar.url)
    console.log(user.nick_name)
    console.log(user.stories)
  }

  $('.stories.story-owl-carousel').owlCarousel({
    loop: false,
    margin: 0,
    nav: false,
    responsive:{
      0:{
          items:1
      }
    }
  })


})
