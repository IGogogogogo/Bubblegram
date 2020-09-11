// Visit The Stimulus Handbook for more details
// https://stimulusjs.org/handbook/introduction
//
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from "stimulus"
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = ["like"]

  favorite() {
    // console.log(this.heartTarget)
    let post_id = this.data.get("id")

    Rails.ajax({
      url: `/posts/${post_id}/favorite.json`,
      type: "post",
      data: "",
      success: (result) => {
        console.log(result)
        if (result["status"] == true) {
          this.heartTarget.classList.remove("far")
          this.heartTarget.classList.add("fas")
        } else {
          this.heartTarget.classList.remove("far")
          this.heartTarget.classList.add("fas")
        }
      },
      error: (err) => {
        console.log(err)
      },
    })

  }
}
