import { Controller } from "stimulus"
import axios from "axios"

let controller
let stream
// let publisher 想實作觀看人數
let roomId
let videoDiv
export default class extends Controller {
  connect() {
    controller = this
    console.log('pub connect');
    // 定義api key sessionId token
    this.apiKey = this.data.get("key")
    this.sessionId = this.data.get("sessionId")
    this.token = this.data.get("token")
    roomId = this.data.get('roomId')
    console.log(roomId);
    this.initializeSession()
    let backLink =  document.querySelector(".back-link")

    backLink.addEventListener("click",()=>{
      backLink.style.display = "none"
    })
  }

  disconnect() {
    if (this.session) {
      this.session.disconnect()
      // console.log('pub disconnect');
    }
  }

  initializeSession() {
    // 建立房間的session
    this.session = OT.initSession(this.apiKey, this.sessionId)
    // console.log(this)
    // console.log(OT.getDevices() )
    // 建立 publisher
    this.publisher = OT.initPublisher('pub-video', {
      insertMode: 'append',
      width: '100%',
      height: '100%',
      facingMode :"user",
      fitMode: "contain",
      name: this.data.get("name"),
    }, this.handleError.bind(this))
    // 連線
    this.session.connect(this.token, this.streamConnect.bind(this))
    // publisher = this.publisher
    // publisher.cycleVideo().catch(console.error)
  }

  streamConnect(error) {
    if (error) {
      this.handleError(error)
    } else {
      // 將 publish 發佈出去 ，return 一個 stream obj
      stream = this.session.publish(this.publisher, this.handleError.bind(this))
      // await subCounts(stream)
    }
  }

  handleError(error) {
    if (error) {
      console.error(error.message);
    }
  }
}
// 因為 ios safari 不支援 'beforeunload' event
window.addEventListener('pagehide', function (e) {
  videoDiv = document.querySelector("#pub-video")
  if(!videoDiv)return
  e.preventDefault
    let token = document.querySelector("meta[name=csrf-token]").content
    axios.defaults.headers.common['X-CSRF-Token']= token
    axios({
      url:`/rooms/${roomId}/destroy_room`,
      method:"post"
    })
  });
