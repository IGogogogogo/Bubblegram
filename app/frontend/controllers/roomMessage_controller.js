import { Controller } from "stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
  connect() {
    let temp =  document.querySelector("#message-template")
    let form = document.forms[0]
    let messageTextArea = document.querySelector(".message-text-area")
    let textContent = document.querySelector("input[type='text']")
    let textSubmit = document.querySelector("input[type='submit']")
    let footer = document.querySelector(".index-nav")
    let roomMessageController = this

    footer.style.display = "none"
    footer.style.opacity = "0"

    this.subscription = consumer.subscriptions.create(
      {
        channel: "LiveStreamChannel",
        room_id: roomMessageController.data.get("id")
      },
      {
        connected() {
          console.log("connected to live_stream_room" + roomMessageController.data.get("id"))
          setTimeout(() => {
            // console.log(message_text_area.scrollHeight)
            messageTextArea.scrollTo(0, messageTextArea.scrollHeight) //捲軸移動到最底部
          }, 100)
          // Called when the subscription is ready for use on the server
        },
        disconnected() {
          // Called when the subscription has been terminated by the server
        },
        async received(data) {


          if(data.message.content === "heart"){
            await createHeart()
            return
            function createHeart(){
              let video = document.querySelector(".video")
              let heart = document.createElement('div')
              // console.log(video.offsetHeight)
              heart.className = 'heart'
              heart.style.bottom = 0 + "px"
              heart.style.opacity = "1"
              // heart.style.animation = "heart-rising 3s"
              video.appendChild(heart)
              Animate(heart)

              function Animate(){
                $(heart).animate({
                  bottom: "+=" + 500 + "px",
                  opacity: 0
                }, 2000,()=>{
                  document.querySelector(".heart").remove()
                })
              }
            }
          }

          let message = renderTemplate(data)
          messageTextArea.append(message)
          let currentUser = Number(roomMessageController.data.get("user"))

          if(messageTextArea.scrollHeight - window.innerHeight <= messageTextArea.scrollTop){
            //判斷捲軸是不是在最底部
            setTimeout(() => {
              // console.log(message_text_area.scrollHeight)
              messageTextArea.scrollTo(0, messageTextArea.scrollHeight) //捲軸移動到最底部
            }, 100)
          }
          if(currentUser === data.user.id){
            form.reset();
            textSubmit.setAttribute("disabled", true)
            setTimeout(() => {
              // console.log(message_text_area.scrollHeight)
              messageTextArea.scrollTo(0, messageTextArea.scrollHeight) //捲軸移動到最底部
            }, 100)
          }

          function renderTemplate(message){
            let clone = document.importNode(temp.
            content,true)
              clone.querySelector(".user-avatar img").src = message.user.avatar.url
              clone.querySelector(".name").textContent = message.user.nick_name
              clone.querySelector(".text-content").textContent = message.message.content
              return clone
          }
        }
      }
      );

      console.log(textContent)
      console.log(textSubmit)
      textContent.addEventListener("keyup",(e)=>{
        console.log(e)
        if(textContent.value.split(" ").join("") !== ""){
          textSubmit.removeAttribute("disabled", false)
        }else{
          textSubmit.setAttribute("disabled", true)
        }
      })
    }

    disconnect() {
      this.subscription.unsubscribe();
    }
}
