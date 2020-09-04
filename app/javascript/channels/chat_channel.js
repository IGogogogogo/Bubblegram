import consumer from "./consumer"

document.addEventListener('turbolinks:load',()=>{
  const chat_id = document.querySelector('.message_box').dataset.chat
  const user_id = Number(document.querySelector('.message_box').dataset.user)
  const message_text_area = document.querySelector('.message_text_area')
  const input = document.getElementById('message_content')
  consumer.subscriptions.create({channel:"ChatChannel", chat_id: chat_id}, {
   connected() {
     console.log('connecting'+ chat_id)
     // Called when the subscription is ready for use on the server
   },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      console.log(data)

      if(data.message.user_id === user_id){
        message_text_area.innerHTML += data.me
      }else{
        message_text_area.innerHTML += data.other
      }

      input.value=''
        // Called when there's incoming data on the websocket for this channel
    }
  });
})
