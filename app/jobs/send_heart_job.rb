class SendHeartJob < ApplicationJob
  queue_as :default

  def perform(live_stream_id, content)
    # Do something later
    ActionCable.server.broadcast(         #aciton cable 提供的方法 可以第二個參數的資料 廣播到第一個參數特定的頻道
      "live_stream_#{live_stream_id}_channel",
      {
        message: {content: content},
      }
    )

  end
end
