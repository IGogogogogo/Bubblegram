import consumer from "./consumer"

document.addEventListener('turbolinks:load',()=>{
  let chatchannel = consumer.subscriptions.subscriptions.filter(sub=> JSON.parse(sub.identifier).channel === "ChatChannel") //找有沒有chatchannel

  const chat_room = document.querySelector('.message_box')
  if(!chat_room){       // 判斷是不是在聊天室內 如果不是 把chatchannel關掉
    if(chatchannel.length === 1){
      consumer.subscriptions.remove(chatchannel[0])
    }
    return
  }



  const chat_id = chat_room.dataset.chat

  // const unreadChannel = consumer.subscriptions.subscriptions.filter(sub=> JSON.parse(sub.identifier).channel === "UnreadMessageNotificationChannel")

  if(chatchannel.length === 1)return; //預防turbolink 重複註冊

  consumer.subscriptions.create({channel:"ChatChannel", chat_id: chat_id}, {
    connected() {
      console.log('connecting'+ chat_id)

      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      console.log("disconneted....")
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      const user_id = Number(document.querySelector('.message_box').dataset.user)
      const message_text_area = document.querySelector('.message_text_area')
      const form = document.forms[0]
      const image_form =document.forms[1]
      const text_submit = document.querySelector("input[type='submit']")
      let temp = document.querySelector("template")
      let tempDiv = temp.content.querySelector(".message")

      // console.log(message_text_area.scrollHeight)
      // message_text_area.scrollTo(0, message_text_area.scrollHeight)


      if(data.message.user_id === user_id){
        form.reset()
        isContentNull(data.my_image, data.my_message)
      }else{
        isContentNull(data.other_image, data.other_message)
      }

      function tempRender(message){
        let clone;
        tempDiv.innerHTML = message
        clone = document.importNode(temp.content,true)
        message_text_area.append(clone)
      }

      function isContentNull(image, message){
        if(data.message.content == null){
          tempRender(image)
        }else{
          tempRender(message)
        }
      }


      // if(data.message.user_id === user_id){
      //   form.reset()
      //   if(data.message.content == null){
      //     message_text_area.innerHTML += data.my_image
      //   }else{
      //     message_text_area.innerHTML += data.my_message
      //   }
      // }else{
      //   if(data.message.content == null){
      //     message_text_area.innerHTML += data.other_image
      //   }else{
      //     message_text_area.innerHTML += data.other_message
      //   }
      // }


      text_submit.setAttribute("disabled", true)
      text_submit.classList.add("disappear")
      image_form.classList.remove("disappear")

      // console.log(message_text_area.scrollHeight)

      // debugger
      // setTimeout(() => {
        // console.log(message_text_area.scrollHeight)
        message_text_area.scrollTo(0, message_text_area.scrollHeight)
      // }, 500)
      // message_text_area.scrollTop += message_text_area.scrollHeight



    }
  });
})
