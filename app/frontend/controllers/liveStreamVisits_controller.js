import { Controller } from "stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
  connect() {
    // console.log("js count")
    let countsArea = document.querySelector(".visits .counts")
    let liveStreamVisitsController = this
    this.subscription = consumer.subscriptions.create(
      {
        channel: "LiveStreamVisitsChannel",
        room_id: liveStreamVisitsController.data.get("id")
      },
      {
        connected() {
          // console.log("counts")
          // Called when the subscription is ready for use on the server
        },
        disconnected() {
          // Called when the subscription has been terminated by the server
        },
        received(data) {
          // console.log(data.counts)

          countsArea.textContent = data.counts

        }
      }
      );

    }
  disconnect() {
    this.subscription.unsubscribe();
  }
}
