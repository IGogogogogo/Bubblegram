document.addEventListener("turbolinks:load", () => {
  const postShow = document.querySelector(".post-show")

  if(!postShow) return

  document.querySelector(".comment.btn").addEventListener("click", (e)=>{
    e.preventDefault();
    ////點留言 icon 後跳到留言輸入欄位並focus
    document.querySelector("#comment_content").focus()
    document.querySelector("#comment_content").scrollIntoView()
  })

  ///// 成功建立留言時會有 notice 資料，有資料內容跳到最下面
  const notice = document.querySelector(".notice")
  if(notice.textContent != "") {
    document.querySelector("#comment_content").scrollIntoView()
  }
})
