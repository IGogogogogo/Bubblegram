import "axios"
import "popper.js"
import "bootstrap"
import "select2"
import "select2/dist/css/select2.css"
import "../stylesheets/application"
import "@fortawesome/fontawesome-free/js/all";

import "./stories.js"
import "owl.carousel"
import "./search.js"
import "./preview_photo"
import "./bubble"
import "./chat_message_view"
import "./post_form.js"
import "./load_posts.js"
import "./owl_carousel.js"
import "./active"
import "./footer_ disappear"
import "./upload"
import "./user_pic_upload"
import "./validation"
import "./reset_container.js"
import "./post_comment"
import "./prev_and_reload_page"

import Swiper, { Pagination } from 'swiper';
import gsap from "gsap"

Swiper.use([Pagination]);
window.gsap = gsap
window.Swiper = Swiper

document.addEventListener("turbolinks:load", () => {
  $('[data-toggle="tooltip"]').tooltip()
  $('[data-toggle="popover"]').popover()
})
