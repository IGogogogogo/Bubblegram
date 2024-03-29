import { Controller } from "stimulus"

export default class extends Controller {
  connect() {
    // console.log('sub connect');
    // 定義apiKey、sessionId、token
    this.apiKey = this.data.get("key")
    this.sessionId = this.data.get("sessionId")
    this.token = this.data.get("token")
    this.initializeSession()
    // getSubscribersForStream(stream)
  }


  disconnect() {
    // console.log('sub disconnect');
    if (this.session) { this.session.disconnect() }
    document.querySelector('.end-notice').classList.remove('d-none')
    document.querySelector('.end-notice').classList.add('d-flex')
    document.querySelector(".room-message").remove()
    // this.session.unsubscribe(subscriber)
  }

  initializeSession() {
      // 建立房間的session
      this.session = OT.initSession(this.apiKey, this.sessionId)
      // 建立 subscriber
      this.session.on("streamCreated", this.streamCreated.bind(this))
      // 連線
      this.session.connect(this.token, this.streamConnect.bind(this))
  }

  streamCreated(event) {
    this.session.subscribe(event.stream,'videos' ,this.handleError.bind(this))
    // this.session.getSubscribersForStream(event.stream)
  }

  streamConnect(error) {
    if (error) {
      this.handleError(error)
    }
  }

  handleError(error) {
    if (error) {
      console.error(error.message);
    }
  }
}
