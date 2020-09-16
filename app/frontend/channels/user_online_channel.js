import consumer from "./consumer"



consumer.subscriptions.create({channel: "UserOnlineChannel"}, {
  connected() {
    console.log('user_online is connecting...')
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    let chatUsers = Array.from(document.querySelectorAll(".chat-user"))
    console.log(chatUsers)
    let chatUser = chatUsers.filter((user)=>{
      return Number(user.dataset.chatUser) == data.user_id
    })

    if (data.is_online){
      chatUser[0].querySelector(".chat-user-pic .dot").classList.add("online-dot")
      chatUser[0].querySelector(".chat-user-info .online-text").textContent = data.online
    }else{
      chatUser[0].querySelector(".chat-user-pic .dot").classList.remove("online-dot")
      chatUser[0].querySelector(".chat-user-info .online-text").textContent = ""
    }

    // Called when there's incoming data on the websocket for this channel
  }
});
