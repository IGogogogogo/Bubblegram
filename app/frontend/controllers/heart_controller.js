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

  favourite = () => {
    // console.log(this.heartTarget)
    let post_id = this.data.get('id')
    console.log(post_id)

    Rails.ajax({
      url: `/posts/${post_id}/favourite.json`,
      type: "POST",
      data: "",
      success: (result) => {
        console.log(result)
        if (result["status"] == true) {
          this.likeTarget.classList.remove("far")
          this.likeTarget.classList.add("fas")
        } else {
          this.likeTarget.classList.remove("fas")
          this.likeTarget.classList.add("far")
        }
      },
      error: (err) => {
        console.log(err)
      },
    })

  }
}
