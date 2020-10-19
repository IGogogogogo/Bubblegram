import axios from 'axios'

document.addEventListener("turbolinks:load",()=>{
  const message_box = document.querySelector(".message_box")
  if(!message_box)return
  const text_form = document.forms[0]
  const image_form =document.forms[1]
  const text_area = document.getElementById("message_content")
  const image_value= image_form.elements["message[image]"]
  const text_submit = document.querySelector("input[type='submit']")
  const message_text_area = document.querySelector(".message_text_area")
  const unreadLine = document.getElementById("unread-line")
  let temp = document.querySelector("#message-template")
  let searchBar
  // let temp = document.querySelector("template")
  // let tempDiv = temp.content.querySelector(".message")

  let pageCount = 4
  let url = document.location.href
  let urlPage = `.json?page=`
  // let chatId = Number(url.split("/").pop())

  function scrolling(e){
    if(e.target.scrollTop == 0){
      pageCount += 1
      axios.get(url + urlPage + pageCount)
      .then(function(response){
        return response.data
      })
      .then(async function(datas){
        console.log(datas)
        let topMessage = document.querySelector(".message_text_area div")
        if(datas.length < 25){
          message_text_area.removeEventListener('scroll',scrolling) //取消監聽捲軸
        }
        await appendMessage(datas) //等待訊息全部載入完
        topMessage.scrollIntoView() //將捲軸移動至載入前的第一則訊息
      })
    }
  }


  function appendMessage(datas){
    datas = datas.reverse()
    let firstNode = document.querySelector(".message_text_area div")
    datas.forEach((message) => {
      let newMessage = createMessage(message)
      message_text_area.insertBefore(newMessage, firstNode)
    })
  }

  function createMessage(message) {
    let clone = document.importNode(temp.content, true)
    // console.log(clone)
    let headPhoto = document.createElement("img")
    headPhoto.src = message.user.avatar_url
    headPhoto.classList = ["user-avatar"]
    clone.querySelector(".avatar").appendChild(headPhoto)
    clone.querySelector(".user-name").textContent = message.user.nick_name

    if (message.current_user === message.user.id){
      clone.querySelector(".sender").classList = ["me"]
    } else {
      clone.querySelector(".sender").classList = ["other"]
    }

    let typeDiv = clone.querySelector(".type")
    if (message.image.url === null) {
      typeDiv.classList = ["content"]
      typeDiv.textContent = message.content
    } else {
      typeDiv.classList = ["pic"]
      let img = document.createElement("img")
      img.src = message.image.url
      typeDiv.appendChild(img)
    }

    return clone
  }

  message_text_area.addEventListener("scroll", scrolling) //監聽訊息範圍捲軸

  text_area.addEventListener("keyup",(e)=>{
    searchBar = document.querySelector(".searchbar")
    text_area.style.height = calcTextAreaHeight(text_area.value) + "px"

    // console.log( text_area.value.match(/\n/g).length > 0)
    console.log()
    if(text_area.value.match(/\S/)){
      text_submit.classList.remove("disappear")
      image_form.classList.add("disappear")
      text_submit.removeAttribute("disabled", false)
    }else{
      text_submit.setAttribute("disabled", true)
      text_submit.classList.add("disappear")
      image_form.classList.remove("disappear")
    }
  })

  // text_area.addEventListener("keypress",(e)=>{ //按enter會送出不會換行
  //   if(text_area.value.match(/\S/)){
  //     if (event.keyCode == 13 && !event.shiftKey) {
  //       e.preventDefault()
  //       text_form.submit()
  //     }
  //   }
  // })

  // function noEmptyWord(value){     //判斷空白字元
  //   return (value.split(" ").join("") !== "")
  // }
  // function noBreakLine(value){    //判斷換行
  //   return (value.split("\n").join("") !== "")
  // }

  function calcTextAreaHeight(value){
    let lines = (value.match(/\n/g) || []).length
    if (lines >= 5 ){
      lines = 5
    }
    let newHeight = 33 + lines * 20;
    return newHeight;
  }
  image_value.addEventListener("change",()=>{
    image_form.submit()
    image_value.value = ""

  })
  if(!!unreadLine){
    unreadLine.scrollIntoView(); //如果有未讀線的div捲軸移動至那個div
  }else{
    message_text_area.scrollTo(0, message_text_area.scrollHeight) //沒有的話移至最底部
  }
  // text_form.addEventListener("submit",(e)=>{
    //   text_submit.setAttribute("disabled", true)
    //   console.log(text_area.value)
    //   text_submit.classList.add("disappear")
    //   image_form.classList.remove("disappear")
    //   message_text_area.scrollTop += message_text_area.scrollHeight
    // })



})
