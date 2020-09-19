class UserOnlineChannel < ApplicationCable::Channel
  def subscribed
    stream_from "user_online_channel"
    #使用者一上線就廣播
    ActionCable.server.broadcast "user_online_channel", {user_id: current_user.id, is_online: true, online: "目前在線上"}
    #並使用redis紀錄使用者上線
    redis.set("user_#{current_user.id}_online", "1")
  end

  def unsubscribed
    #關掉視窗或登出將狀態刪除並廣播出去
    redis.del("user_#{current_user.id}_online")
    ActionCable.server.broadcast "user_online_channel", {user_id: current_user.id, is_online: false}
    # Any cleanup needed when channel is unsubscribed
  end

  private

  def redis
    Redis.new
  end
end
