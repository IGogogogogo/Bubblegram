import "axios"
import "./search.js"
import "bootstrap";
import "../stylesheets/application"
import "@fortawesome/fontawesome-free/js/all";
import "./preview_photo"
import "./bubble"
import "./chat_message_view"

window.$ = $

document.addEventListener("turbolinks:load", () => {
  $('[data-toggle="tooltip"]').tooltip()
  $('[data-toggle="popover"]').popover()
})
