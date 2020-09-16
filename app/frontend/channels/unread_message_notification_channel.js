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
    console.log(data)
    this.perform("new_message",data)
  },

  received(data) {
    let chatUsers = Array.from(document.querySelectorAll(".chat-user"))
    console.log(data)
    let chatUser = chatUsers.filter((user)=>{
      return Number(user.dataset.chatUser) == data.message.user_id
    })
    if(!data.read_message){
      chatUser[0].querySelector(".notice-dot").classList.add("message-notice-dot")
    }else{
      chatUser[0].querySelector(".notice-dot").classList.remove("message-notice-dot")
    }
    console.log(data.message)
    this.newMessage(data.message)
    // Called when there's incoming data on the websocket for this channel
  }
});
