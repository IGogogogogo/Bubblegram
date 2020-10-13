document.addEventListener("turbolinks:load", () => {
  const postFormTag = document.querySelector("form .post-tags")
  const alertMessage = document.querySelector(".alert")

  if(!postFormTag) return
  ////select2 表單多選套件
  $(".taged_users").select2({
    tags: true,
    tokenSeparators: [',', ' '],
  })

  if(alertMessage.textContent != ""){   ////controller 有flash alert時會有alert內容
    const tagLabel = postFormTag.querySelector("label").textContent
    const errorMessageEl = document.createElement("small")
    errorMessageEl.textContent = alertMessage.textContent
    errorMessageEl.classList = "text-danger"
    postFormTag.querySelector("label").appendChild(errorMessageEl)
    postFormTag.addEventListener("click", () => { ///移除錯誤訊息
      postFormTag.querySelector("label").textContent = tagLabel
    })
  }
})
