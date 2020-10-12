class UserOnlineNoticeJob < ApplicationJob
  queue_as :default

  def perform(user)
    if is_online?(user)
      ActionCable.server.broadcast "user_online_channel", {user_id: user.id, is_online: true, online: "目前在線上"}
    else
      ActionCable.server.broadcast "user_online_channel", {user_id: user.id, is_online: false}
    end
  end

  private
  def is_online?(user)
    redis.get("user_#{user.id}_online")
  end

  def redis
    redis = Redis.new unless redis
    redis
  end
end
