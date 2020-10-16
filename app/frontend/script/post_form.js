document.addEventListener("turbolinks:load", () => {
  const postFormTag = document.querySelector("form .post-tags")
  const tagMessage = document.querySelector(".tag")

  if(!postFormTag) return
  ////select2 表單多選套件
  $(".taged_users").select2({
    tags: true,
    tokenSeparators: [',', ' '],
  })

  if(tagMessage.textContent != ""){   ////controller 有 flash tag 時會有內容
    const tagLabel = postFormTag.querySelector("label").textContent
    const errorMessageEl = document.createElement("span")
    errorMessageEl.textContent = tagMessage.textContent
    errorMessageEl.style.color = "red"
    postFormTag.querySelector("label").appendChild(errorMessageEl)
    postFormTag.querySelector("label").classList = "d-flex justify-content-between"
    postFormTag.addEventListener("click", () => { ///移除錯誤訊息
      postFormTag.querySelector("label").textContent = tagLabel
    })
  }
})
