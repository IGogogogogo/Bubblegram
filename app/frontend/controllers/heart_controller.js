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

let timeId
export default class extends Controller {
  static targets = ["like"]

  favourite() {
    // console.log(this.heartTarget)
    let post_id = this.data.get('id')
    let strongNum = this.data.element.querySelector(".thumb-up strong")
    let thumbNum = strongNum.textContent

    Rails.ajax({
      url: `/posts/${post_id}/favourite.json`,
      type: "POST",
      data: "",
      success: (result) => {
        // console.log(result)
        if (result["status"] == true) {
          this.likeTarget.classList.remove("far")
          this.likeTarget.classList.add("fas")
          strongNum.textContent = `${parseInt(thumbNum) + 1} 個讚`
        } else {
          this.likeTarget.classList.remove("fas")
          this.likeTarget.classList.add("far")
          strongNum.textContent = `${parseInt(thumbNum) - 1} 個讚`
        }
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
  like(){
    if(timeId){
      clearTimeout(timeId);
      timeId = undefined
      this.doubleFavorite()

    }else{
      timeId = setTimeout(() => {
      timeId = undefined
        console.log("single")
      }, 250);
    }
  }
  doubleFavorite(){
    let post_id = this.data.get('id')
    let strongNum = this.data.element.querySelector(".thumb-up strong")
    let thumbNum = strongNum.textContent
    let heart = this.data.element.querySelector(".post-pic .heart")
    let heartPrefix = this.likeTarget.dataset.prefix



      if (heartPrefix === "fas") {
        heart.style.animation = "enlarge 1.5s"
        heart.addEventListener("animationend",()=>{
          heart.style.animation = ""
        })
      }else {
        heart.style.animation = "enlarge 1.5s"
        heart.addEventListener("animationend",()=>{
          heart.style.animation = ""
        })
        this.likeTarget.classList.remove("far")
        this.likeTarget.classList.add("fas")
        strongNum.textContent = `${parseInt(thumbNum) + 1} 個讚`
        Rails.ajax({
          url: `/posts/${post_id}/favourite.json`,
          type: "POST",
        })
      }
  }
}
