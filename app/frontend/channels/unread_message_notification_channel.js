import consumer from "./consumer"

document.addEventListener("turbolinks:load",()=>{
  // console.log(consumer.subscriptions)

  let unreadChannels = consumer.subscriptions.subscriptions.filter(sub=> JSON.parse(sub.identifier).channel === "UnreadMessageNotificationChannel") //找有沒有在unreadchannel
  // console.log(unreadChannels)
  if(unreadChannels.length >= 1){
    return
  }
  //如果有直接return避免多訂閱


  let unreadMessagesDiv= document.createElement("div")
  unreadMessagesDiv.classList.add("unread-messages")
  let currentUser = document.querySelector(".chat-path")
  if(!currentUser)return
  let currentUserId = currentUser.dataset.user

  consumer.subscriptions.create("UnreadMessageNotificationChannel", {
    connected() {
      console.log("unread_message........")
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      console.log("disconnected")
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      if(!data.read_message && (data.message.user_id == Number(currentUserId))){

        //比對user是不是傳送訊息的user
        this.perform("new_message",{message: data.message, current_user: currentUserId})
      }
      let chatChannle = this.consumer.subscriptions.subscriptions.filter(sub=> JSON.parse(sub.identifier).channel === "ChatChannel") //找有沒有在chatchannel


      if(chatChannle.length === 1)return //有的話代表正在聊天室中，不發通知
      // console.log(data.read_message)

      let chatUsers = Array.from(document.querySelectorAll(".chat-user")) //選取訊息盒的所有聊天的人
      // console.log(data)
      let chatUser = chatUsers.filter((user)=>{
        return Number(user.dataset.chatUser) == data.message.user_id
      }) // 比對這則訊息是誰傳的

      // console.log(data.opposed_user)
      // console.log(Number(currentUserId))
      if(data.opposed_user === Number(currentUserId)){ //確認傳訊息給的對象是接收的人
        this.perform("chat_message_notice",{message: data.message, current_user: currentUserId})
      }

      if (!!chatUser[0] && data.opposed_user === Number(currentUserId)){ //判斷chat index有沒傳這則訊息的人 並且傳的對方確定是接收方
        // 如果有人傳新訊息把目前上線的div換成新訊息的div
        let clone
        let chatContainer = document.querySelector(".chat-user-container")
        let newMessages = chatUser[0].querySelector(".chat-user-info .unread-messages")
        let onlineText = chatUser[0].querySelector(".chat-user-info .online-text")
         if(onlineText){
           onlineText.classList.add("off-line")
         }
         if(!newMessages){
           chatUser[0].querySelector(".chat-user-info").append(unreadMessagesDiv)
           newMessages = chatUser[0].querySelector(".chat-user-info .unread-messages")
         }
         // 找有沒有新訊息的字
         chatUser[0].querySelector(".notice-dot").classList.add("message-notice-dot")
         newMessages.textContent = `您有${data.new_message_counts += 1}則新訊息`
         clone = document.importNode(chatUser[0].parentNode, true)
         chatContainer.insertAdjacentElement('afterbegin', clone)
         chatUser[0].parentNode.remove()
         this.perform("has_any_new_message_room",{sender: data.message.user_id, recipient: Number(currentUserId)})
      }

        if(!!data.read_message && data.current_user === Number(currentUserId)){
          // 判斷有無讀取訊息且讀訊息的人確定是進入聊天室的使用者
          if(chatUser.length === 0)return //避免其他頁面出現錯誤訊息
          let unreadMessageText = chatUser[0].querySelector(".chat-user-info .unread-messages")
          chatUser[0].querySelector(".notice-dot").classList.remove("message-notice-dot")
            if(unreadMessageText){
              unreadMessageText.remove()
            }
        }
      // console.log(data.message)
      // Called when there's incoming data on the websocket for this channel
    }
  });
})
