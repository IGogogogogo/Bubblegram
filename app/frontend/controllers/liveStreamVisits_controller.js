import { Controller } from "stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
  connect() {


    this.subscription = consumer.subscriptions.create(
      {
        channel: "",
      },
      {
        connected() {

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
