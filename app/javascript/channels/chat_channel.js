import consumer from "./consumer"

document.addEventListener('turbolinks:load',()=>{
  const chat_id = document.querySelector('.message_box').dataset.chat
  consumer.subscriptions.create({channel:"ChatChannel", chat_id: chat_id}, {
    connected() {
      console.log('connecting'+ chat_id)
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      const user_id = Number(document.querySelector('.message_box').dataset.user)
      const message_text_area = document.querySelector('.message_text_area')
      const form = document.forms[0]
      const input = document.getElementById('message_content')
      console.log(data)
      console.log(data.message.content)
      if(data.message.user_id === user_id){
        if(data.message.content == null){
          message_text_area.innerHTML += data.me_image
        }else{
          message_text_area.innerHTML += data.me
        }
      }else{
        if(data.message.content == null){
          message_text_area.innerHTML += other
        }else{
          message_text_area.innerHTML += data.other
        }
      }
      form.reset()
      // input.value=''
      message_text_area.scrollTop = message_text_area.scrollHeight
        // Called when there's incoming data on the websocket for this channel
    }
  });
})
