document.addEventListener("turbolinks:load", () => {
  const postShow = document.querySelector(".post-show")

  if(!postShow) return

  document.querySelector(".comment.btn").addEventListener("click", (e)=>{
    e.preventDefault();
    ////點留言 icon 後跳到留言輸入欄位並focus
    document.querySelector("#comment_content").focus()
    document.querySelector("#comment_content").scrollIntoView()
  })

  document.querySelector("form").addEventListener("submit", ()=> {
    window.location.reload()   /////重新整理頁面後才會看到自己新增的留言
  })
})
