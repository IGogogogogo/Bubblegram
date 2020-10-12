import Rails from '@rails/ujs'

document.addEventListener("turbolinks:load", () => {
  const searchForm = document.querySelector(".search-form")
  const searchInput = document.querySelector(".search-form input")
  const postLoadPage = document.querySelector(".post-load-page")
  const chatUserList = document.querySelector(".chat-user-list")
  const followingsArea = document.querySelector(".user-followings-container")
  const fansArea = document.querySelector(".user-fans-contanier")
  const followForm = document.querySelector(".followings-search-container .search-form")
  const followFormInput = document.querySelector(".followings-search-container .search-form input")
  if (!searchForm) return
  if (postLoadPage) {
    document.querySelector(".container").style.paddingTop = "20px"
  }
  // console.log(searchForm)
  // console.log(followForm)
  // console.log(followingsArea)
  // searchForm.addEventListener("keyup", () => {
  //   Rails.fire(searchForm, "submit")     ///Rails.fire 使用 ajax 方式傳送資料

  //   if(chatUserList){
  //     chatUserList.style.display = "none"
  //     if(searchInput.value === ''){
  //       chatUserList.style.display = "block"
  //     }
  //   }

  //   if (postLoadPage) {
  //     postLoadPage.style.display = "block"
  //     if (searchInput.value != "") {
    //       postLoadPage.style.display = "none"
    //     }
    //   }
    // })



    ///Rails.fire 使用 ajax 方式傳送資料
    searchForm.addEventListener("keyup", () => {
      console.log("fans")
      Rails.fire(searchForm, "submit")
      if(chatUserList){
        chatUserList.style.display = "none"
      }
      if(chatUserList && searchInput.value === ''){
        chatUserList.style.display = "block"
      }


      if (postLoadPage) {
        postLoadPage.style.display = "block"
        if (searchInput.value != "") {
          postLoadPage.style.display = "none"
        }
      }

      if(fansArea){
        fansArea.style.display = "block"
        if (searchInput.value != ""){
          fansArea.style.display = "none"
        }
      }
    })
    if(followForm){
      followForm.addEventListener("keyup",()=>{
        console.log("following")
        Rails.fire(followForm, "submit")
        if(followingsArea){
          followingsArea.style.display = "block"
          if (followFormInput.value != "") {
            followingsArea.style.display = "none"
          }
        }
      })
    }

  })
