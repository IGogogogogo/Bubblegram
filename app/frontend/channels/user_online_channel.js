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
    let chatUsers = Array.from(document.querySelectorAll(".chat-user"))   //撈出訊息盒所有聊天過的人
    // console.log(chatUsers)
    let chatUser = chatUsers.filter((user)=>{    //找除聊天的人中有誰上線
      return Number(user.dataset.chatUser) == data.user_id
    })

    if (data.is_online){
      if(chatUser.length === 0)return //避免在其他頁有錯誤訊息
      chatUser[0].querySelector(".chat-user-pic .dot").classList.add("online-dot")  //給他綠點
      if(chatUser[0].querySelector(".chat-user-info .unread-messages"))return
      if(chatUser[0].querySelector(".chat-user-info .online-text") === null){
        chatUser[0].querySelector(".chat-user-info").appendChild(onlineTextDiv())//以及上線中
      }
      chatUser[0].querySelector(".chat-user-info .online-text").classList.remove("off-line")
    }else{
      if(chatUser.length === 0)return
      chatUser[0].querySelector(".chat-user-pic .dot").classList.remove("online-dot")
      chatUser[0].querySelector(".chat-user-info .online-text").classList.add("off-line")
    }
    function onlineTextDiv(){
      let onlineDiv = document.createElement("div")
      onlineDiv.className = "online-text"
      onlineDiv.textContent = "目前在線上"
      return onlineDiv
    }
    // Called when there's incoming data on the websocket for this channel
  }
});
