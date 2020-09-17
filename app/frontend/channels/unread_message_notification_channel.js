import consumer from "./consumer"

document.addEventListener("turbolinks:load",()=>{

  let unreadMessagesDiv= document.createElement("div")
  let unreadMessages = 0
  unreadMessagesDiv.classList.add("unread-messages")
  unreadMessagesDiv.textContent = `您有${unreadMessages}則新訊息`

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
      let chatChannle = this.consumer.subscriptions.subscriptions.filter(sub=> JSON.parse(sub.identifier).channel === "ChatChannel")
      // console.log(chatChannle.length)

      if(chatChannle.length === 1){
        return
      }

      let chatUsers = Array.from(document.querySelectorAll(".chat-user"))
      console.log(data)
      let chatUser = chatUsers.filter((user)=>{
        return Number(user.dataset.chatUser) == data.message.user_id
      })
      // console.log(!chatUser[0])
      if (!!chatUser[0]){
         let childNum = chatUser[0].querySelector(".chat-user-info").childElementCount
         if(childNum === 1){
           chatUser[0].querySelector(".chat-user-info").append(unreadMessagesDiv)
          }
        }else{
          return
        }

        if(!data.read_message){
          let onlineText = chatUser[0].querySelector(".chat-user-info .online-text")
          if(onlineText){
            onlineText.remove()
          }
          chatUser[0].querySelector(".notice-dot").classList.add("message-notice-dot")
          unreadMessagesDiv.textContent = `您有${unreadMessages += 1}則新訊息`
        }else{
          chatUser[0].querySelector(".notice-dot").classList.remove("message-notice-dot")
          unreadMessages = 1
        }
      // console.log(data.message)
      this.newMessage(data.message)
      // Called when there's incoming data on the websocket for this channel
    }
  });
})
