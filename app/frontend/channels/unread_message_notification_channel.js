import consumer from "./consumer"

document.addEventListener("turbolinks:load",()=>{
  // console.log(consumer.subscriptions)

  let unreadChannel = consumer.subscriptions.subscriptions.filter(sub=> JSON.parse(sub.identifier).channel === "UnreadMessageNotificationChannel") //找有沒有在unreadchannel
  if(unreadChannel.length === 1){
    // consumer.subscriptions.remove(unreadChannel[0])
    return
  }

  let unreadMessagesDiv= document.createElement("div")
  unreadMessagesDiv.classList.add("unread-messages")


  consumer.subscriptions.create("UnreadMessageNotificationChannel", {
    connected() {
      console.log("unread_message........")
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      console.log("disconnected")
      // Called when the subscription has been terminated by the server
    },

    newMessage(data){
      console.log(data)
      this.perform("new_message",data)
    },

    received(data) {
      let chatChannle = this.consumer.subscriptions.subscriptions.filter(sub=> JSON.parse(sub.identifier).channel === "ChatChannel") //找有沒有在chatchannel

      // // console.log(chatChannle.length)

      if(chatChannle.length === 1){
        return
      }

      this.newMessage(data.message)

      let chatUsers = Array.from(document.querySelectorAll(".chat-user"))
      console.log(data)
      let chatUser = chatUsers.filter((user)=>{
        return Number(user.dataset.chatUser) == data.message.user_id
      })


      if (!!chatUser[0]){ // 有傳新訊息的user 給他
         let onlineText = chatUser[0].querySelector(".chat-user-info .online-text")
         if(onlineText){
           chatUser[0].querySelector(".chat-user-info").append(unreadMessagesDiv)
           onlineText.remove()
          }
        }

        if(!data.read_message){
          if(!!chatUser[0]){
            let newMessages = chatUser[0].querySelector(".chat-user-info .unread-messages")

            if(!!newMessages){
              chatUser[0].querySelector(".notice-dot").classList.add("message-notice-dot")
              newMessages.textContent = `您有${data.new_messages += 1}則新訊息`
            }
          }
        }else{
          if(chatUser.length === 0)return

          chatUser[0].querySelector(".notice-dot").classList.remove("message-notice-dot")
          chatUser[0].querySelector(".chat-user-info .unread-messages").remove()
        }
      // console.log(data.message)
      // Called when there's incoming data on the websocket for this channel
    }
  });
})
