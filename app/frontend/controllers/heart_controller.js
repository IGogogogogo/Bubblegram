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

  switch() {
    var postId = this.data.get("postId")
    //console.log(postId)
    var like = this.likeTarget.dataset.like
    //console.log(like);




    if (like) {
      Rails.ajax({
        url: `/posts/${postId}/favourites`,
        type: "POST",
        data: "",
        success: (result) => {
          console.log(result)
          this.likeTarget.classList.remove('fas');
          this.likeTarget.classList.add('far');
        },
        error: (err) => {
          console.log(err)
        },
      })
    } else {
      Rails.ajax({
        url: `/posts/${postId}/favourites`,
        type: "DELETE",
        data: "",
        success: (result) => {
          console.log(result)
          this.likeTarget.classList.remove('far');
          this.likeTarget.classList.add('fas');

        },
        error: (err) => {
          console.log(err)
        },
      })
    }
  }
}
