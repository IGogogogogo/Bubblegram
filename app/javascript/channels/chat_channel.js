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
      console.log(data)
      // Called when there's incoming data on the websocket for this channel
    }
  });
})
