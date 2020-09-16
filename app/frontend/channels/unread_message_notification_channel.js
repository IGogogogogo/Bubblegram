import consumer from "./consumer"

consumer.subscriptions.create("UnreadMessageNotificationChannel", {
  connected() {
    console.log("unread_message........")
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  newMessage(data){
    this.perform("new_message",{unread_message: data})
  },

  received(data) {
    let chatUsers = Array.from(document.querySelectorAll(".chat-user"))
    console.log(data.message.user_id)
    let chatUser = chatUsers.filter((user)=>{
      return Number(user.dataset.chatUser) == data.message.user_id
    })
    chatUser[0].querySelector(".notice-dot").classList.add("message-notice-dot")
    this.newMessage(data.message)
    // Called when there's incoming data on the websocket for this channel
  }
});
