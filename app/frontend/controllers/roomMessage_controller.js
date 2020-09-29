import { Controller } from "stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
  connect() {
    console.log("room connect")
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

        }
      }
    );
  }

  disconnect() {
    this.subscription.unsubscribe();
  }


}
