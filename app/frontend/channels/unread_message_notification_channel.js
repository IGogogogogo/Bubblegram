import consumer from "./consumer"

document.addEventListener("turbolinks:load",()=>{
  // console.log(consumer.subscriptions)
 let unreadChannel = consumer.subscriptions.subscriptions.filter(sub=> JSON.parse(sub.identifier).channel === "UnreadMessageNotificationChannel") //找有沒有在unreadchannel
 if(unreadChannel.length === 1)return


  let unreadMessagesDiv= document.createElement("div")
  let unreadMessages = 0
  unreadMessagesDiv.classList.add("unread-messages")
  // unreadMessagesDiv.textContent = `您有${unreadMessages}則新訊息`

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
      // debugger
      // console.log(!chatUser[0])
      if (!!chatUser[0]){
         let onelineText = chatUser[0].querySelector(".chat-user-info .online-text")
         if(!!onelineText){
           chatUser[0].querySelector(".chat-user-info").append(unreadMessagesDiv)
          }
        }

        if(!data.read_message){
          let onlineText = chatUser[0].querySelector(".chat-user-info .online-text")
          chatUser[0].querySelector(".notice-dot").classList.add("message-notice-dot")
          unreadMessagesDiv.textContent = `您有${unreadMessages += 1}則新訊息`
          if(onlineText){
            onlineText.remove()
          }
        }else{
          unreadMessages = 0
          if(chatUser.length === 0)return
          chatUser[0].querySelector(".notice-dot").classList.remove("message-notice-dot")
          chatUser[0].querySelector(".chat-user-info .unread-messages").remove()
        }
      // console.log(data.message)
      // Called when there's incoming data on the websocket for this channel
    }
  });
})
