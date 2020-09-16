class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel_#{params[:chat_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
