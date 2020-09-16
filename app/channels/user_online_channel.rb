class UserOnlineChannel < ApplicationCable::Channel
  def subscribed
    stream_from "user_online_channel"
    ActionCable.server.broadcast "user_online_channel", {user_id: current_user.id, is_online: true, online: "目前在線上"}
    redis.set("user_#{current_user.id}_online", "1")
  end

  def unsubscribed
    redis.del("user_#{current_user.id}_online")
    ActionCable.server.broadcast "user_online_channel", {user_id: current_user.id, is_online: false}
    # Any cleanup needed when channel is unsubscribed
  end

  private

  def redis
    Redis.new
  end
end
