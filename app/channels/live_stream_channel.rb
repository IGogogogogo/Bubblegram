class LiveStreamChannel < ApplicationCable::Channel
  def subscribed
    stream_from "live_stream_#{params[:room_id]}_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
