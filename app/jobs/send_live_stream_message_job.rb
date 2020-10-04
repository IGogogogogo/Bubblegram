class SendLiveStreamMessageJob < ApplicationJob
  queue_as :default

  def perform(message, user)
    # Do something later
    ActionCable.server.broadcast(         #aciton cable 提供的方法 可以第二個參數的資料 廣播到第一個參數特定的頻道
      "live_stream_#{message.chatroom_id}_channel",
      {
        message: message,
        user: user
      }
    )

  end
end
