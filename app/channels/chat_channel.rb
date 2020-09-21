class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stop_stream_from "chat_channel_#{params[:chat_id]}"
    stop_all_streams
    stream_from "chat_channel_#{params[:chat_id]}"
  end

  def unsubscribed
    # stop_stream_from "chat_channel_#{params[:chat_id]}"
    # stop_all_streams
    # Any cleanup needed when channel is unsubscribed
  end

end
