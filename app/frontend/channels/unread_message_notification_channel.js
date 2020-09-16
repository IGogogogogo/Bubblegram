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
    newMessage(data.message)
    let chatUsers = Array.from(document.querySelectorAll(".chat-user"))
    console.log(chatUsers)
    let chatUser = chatUsers.filter((user)=>{
      return Number(user.dataset.chatUser) == data.user_id
    })

    // Called when there's incoming data on the websocket for this channel
  }
});
