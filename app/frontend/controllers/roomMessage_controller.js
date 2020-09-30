import { Controller } from "stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
  connect() {
    let temp =  document.querySelector("#message-template")
    let form = document.forms[0]
    let messageTextArea = document.querySelector(".message-text-area")
    let roomMessageController = this;

    this.subscription = consumer.subscriptions.create(
      {
        channel: "LiveStreamChannel",
        room_id: roomMessageController.data.get("id")
      },
      {
        connected() {
          console.log("connected to live_stream_room" + roomMessageController.data.get("id"))
          // Called when the subscription is ready for use on the server
        },
        disconnected() {
          // Called when the subscription has been terminated by the server
        },
        received(data) {
          // console.log(data)
          let message = renderTemplate(data)
          messageTextArea.append(message)
          let currentUser = Number(roomMessageController.data.get("user"))

          if(currentUser === data.user.id){
            form.reset();
          }

          function renderTemplate(message){
            let clone = document.importNode(temp.content,true)
              clone.querySelector(".name").textContent = message.user.nick_name
              clone.querySelector(".content").textContent = message.message.content
              return clone
          }
        }
      }
      );
    }

    disconnect() {
      this.subscription.unsubscribe();
    }
}
