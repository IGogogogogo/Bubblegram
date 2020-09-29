// Load all the channels within this directory and all subdirectories.
// Channel files must be named *_channel.js.

const { default: consumer } = require("./consumer")

const channels = require.context('.', true, /_channel\.js$/)
channels.keys().forEach(channels)

document.addEventListener("turbolinks:load",()=>{
  console.log(consumer.subscriptions)// 觀察有幾個訂閱

})
