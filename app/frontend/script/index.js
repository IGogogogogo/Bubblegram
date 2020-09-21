import "axios"
import "popper.js"
import "bootstrap"
import "select2"
import "select2/dist/css/select2.css"
import "../stylesheets/application"
import "@fortawesome/fontawesome-free/js/all";

import "./stories.js"
import "./search.js"
import "./preview_photo"
import "./bubble"
import "./chat_message_view"
import "./post_form.js"
import "./load_posts.js"
import gsap from "gsap";


window.$ = $
window.gsap = gsap

document.addEventListener("turbolinks:load", () => {
  $('[data-toggle="tooltip"]').tooltip()
  $('[data-toggle="popover"]').popover()
})
