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

  let page = 4
  let urlPage = `.json?page=`
  let url = document.location.href
  let chatId = Number(url.split("/").pop())

  function scrolling(e){
    if(e.target.scrollTop == 0){
      page += 1
      axios.get(url + urlPage + page)
      .then(function(response){
        return response.data
      })
      .then(function(datas){
        console.log(datas)
        if(datas.length < 25){
          document.body.removeEventListener('scroll',scroll)
        }else{
          e.target.scrollTop = (e.target.scrollHeight/4)
        }

      })
    }
  }


  function render(messages){
    messages = messages.reverse()
    let renderMessage

    messages.forEach((message) => {

      renderMessage = `<div class= "me">
      <div class= "pic_name">
        <img class="user-avatar" width="50px" style="border-radius: 50%" src="/uploads/user/avatar/${message.user_id}/star-e01.png" />
      </div>
      <div class="content">
        ${message.contnet}
      </div>
    </div>`;

      renderMessage = `<div class= "other">
    <div class= "pic_name">
      <img class="user-avatar" width="50px" style="border-radius: 50%" src="/uploads/user/avatar/${message.user_id}/star-e01.png" />
    </div>
    <div class="content">
      ${message.contnet}
    </div>
  </div>`;

      renderMessage = `<div class= "me">
      <div class= "pic_name">
        <img class="user-avatar" width="50px" style="border-radius: 50%" src="/uploads/user/avatar/${message.user_id}/star-e01.png" />
      </div>
      <div class="pic">
        ${message.image.url}
      </div>
     </div>`;

      renderMessage= `<div class= "other">
<div class= "pic_name">
  <img class="user-avatar" width="50px" style="border-radius: 50%" src="/uploads/user/avatar/${message.user_id}/star-e01.png" />
</div>
<div class="pic">
  ${message.image.url}
</div>
</div>`;

    });

  }

  console.log(url)
  console.log(chatId)

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
  if(unreadLine){
    unreadLine.scrollIntoView();
  }
  message_text_area.scrollTop += message_text_area.scrollHeight
  // text_form.addEventListener("submit",(e)=>{
    //   text_submit.setAttribute("disabled", true)
    //   console.log(text_area.value)
    //   text_submit.classList.add("disappear")
    //   image_form.classList.remove("disappear")
    //   message_text_area.scrollTop += message_text_area.scrollHeight
    // })



})
