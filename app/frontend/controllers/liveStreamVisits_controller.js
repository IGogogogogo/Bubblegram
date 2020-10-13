import { Controller } from "stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
  connect() {
    console.log("js count")
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
          // console.log(data

        }
      }
      );

    }
  disconnect() {
    this.subscription.unsubscribe();
  }
}
