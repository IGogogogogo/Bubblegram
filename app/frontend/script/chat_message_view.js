import axios from 'axios'

document.addEventListener("turbolinks:load",()=>{
  const message_box = document.querySelector(".message_box")
  if(!message_box)return
  // const text_form = document.forms[0]
  const image_form =document.forms[1]
  const text_area = document.getElementById("message_content")
  const image_value= image_form.elements["message[image]"]
  const text_submit = document.querySelector("input[type='submit']")
  const message_text_area = document.querySelector(".message_text_area")
  const unreadLine = document.getElementById("unread-line")
  let temp = document.querySelector("template")
  let tempDiv = temp.content.querySelector(".message")

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
        // console.log(datas)
        let topMessage = document.querySelector(".message_text_area div")
        if(datas.length < 25){
          message_text_area.removeEventListener('scroll',scrolling)
        }
        await render(datas)
        topMessage.scrollIntoView()
      })
    }
  }


  function render(messages){
    let renderMessage

    messages.forEach((message) => {
      if (message.current_user === message.user.id){
        if (message.image.url === null){
          renderMessage = `<div class= "me">
          <div class= "pic_name">
            <img class="user-avatar" width="50px" style="border-radius: 50%" src=${message.user.avatar.url}>
            ${message.user.nick_name}
          </div>
          <div class="content">
            ${message.content}
          </div>
        </div>`;
        }else{
          renderMessage = `<div class= "me">
      <div class= "pic_name">
        <img class="user-avatar" width="50px" style="border-radius: 50%" src=${message.user.avatar.url}>
        ${message.user.nick_name}
      </div>
      <div class="pic">
        <img src=${message.image.url}>
      </div>
     </div>`;
        }
      }else{
        if (message.image.url === null){
        renderMessage = `<div class= "other">
          <div class= "pic_name">
              <img class="user-avatar" width="50px" style="border-radius: 50%" src=${message.user.avatar.url}>
              ${message.user.nick_name}
          </div>
          <div class="content">
            ${message.content}
          </div>
        </div>`;
        }else{
          renderMessage= `<div class= "other">
          <div class= "pic_name">
              <img class="user-avatar" width="50px" style="border-radius: 50%" src=${message.user.avatar.url}>
              ${message.user.nick_name}
          </div>
          <div class="pic">
            <img src=${message.image.url}>
          </div>
          </div>`;
        }
      }
      appendMessage(renderMessage)
    });

  }
  function appendMessage(message){
    let clone;
    let fisrtNode = document.querySelector(".message_text_area div")
    tempDiv.innerHTML = message
    clone = document.importNode(temp.content,true)
    message_text_area.insertBefore(clone,fisrtNode)
  }
  // console.log(url)
  // console.log(chatId)

  message_text_area.addEventListener("scroll", scrolling)
  text_area.addEventListener("keyup",()=>{
    // console.log(text_area.value.split(" ").join(""))
    if(text_area.value.split(" ").join("") !== ""){
      text_submit.classList.remove("disappear")
      image_form.classList.add("disappear")
      text_submit.removeAttribute("disabled", false)
    }else{
      text_submit.setAttribute("disabled", true)
      text_submit.classList.add("disappear")
      image_form.classList.remove("disappear")
    }
  })

  image_value.addEventListener("change",()=>{
    image_form.submit()
    image_value.value = ""

  })
  if(!!unreadLine){
    unreadLine.scrollIntoView();
  }else{
    message_text_area.scrollTo(0, message_text_area.scrollHeight)
  }
  // text_form.addEventListener("submit",(e)=>{
    //   text_submit.setAttribute("disabled", true)
    //   console.log(text_area.value)
    //   text_submit.classList.add("disappear")
    //   image_form.classList.remove("disappear")
    //   message_text_area.scrollTop += message_text_area.scrollHeight
    // })



})
