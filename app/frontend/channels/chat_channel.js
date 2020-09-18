import consumer from "./consumer"

document.addEventListener('turbolinks:load',()=>{
  let chatchannel = consumer.subscriptions.subscriptions.filter(sub=> JSON.parse(sub.identifier).channel === "ChatChannel") //找有沒有chatchannel

  const chat_room = document.querySelector('.message_box')
  if(!chat_room){
    if(chatchannel.length === 1){
      consumer.subscriptions.remove(chatchannel[0])
    }
    return
  }

  const chat_id = chat_room.dataset.chat

  // const unreadChannel = consumer.subscriptions.subscriptions.filter(sub=> JSON.parse(sub.identifier).channel === "UnreadMessageNotificationChannel")

 if(chatchannel.length === 1)return;

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



      if(data.message.user_id === user_id){
        form.reset()
        if(data.message.content == null){
          message_text_area.innerHTML += data.my_image
        }else{
          message_text_area.innerHTML += data.my_message
        }
      }else{
        if(data.message.content == null){
          message_text_area.innerHTML += data.other_image
        }else{
          message_text_area.innerHTML += data.other_message
        }
      }


      message_text_area.scrollTop = message_text_area.scrollHeight

    }
  });
})
