import { Controller } from "stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
  connect() {
    let followingController = this
    let followings = document.querySelector(".followings")
    this.subscription = consumer.subscriptions.create(
      {
        channel: "FollowingChannel",
        user_id: followingController.data.get("id")
      },
      {
        connected() {
          // console.log("follow page")
          // Called when the subscription is ready for use on the server
        },
        disconnected() {
          // Called when the subscription has been terminated by the server
        },
        received(data) {
          // console.log(data)
          followings.textContent = data.count + "追蹤名單"
          // console.log(data)



            //判斷捲軸是不是在最底部

        }
      });

  }
  disconnect() {
    this.subscription.unsubscribe();
  }
}
