class FollowingChannel < ApplicationCable::Channel
  def subscribed
    stream_from "#{params[:user_id]}_following_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
