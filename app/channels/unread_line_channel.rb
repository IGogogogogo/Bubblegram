class UnreadLineChannel < ApplicationCable::Channel
  def subscribed
    stream_from "unread_line_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
