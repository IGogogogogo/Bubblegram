class UnreadMessageNotificationChannel < ApplicationCable::Channel
  def subscribed
    stream_from "unread_message_notification_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def new_message(data)
    # chat = Chat.find(data["chat_id"])
    # recipient = chat.opposed_user(data["user_id"])
    redis.rpush("#{data["chat_id"]}_#{data["user_id"]}_new_message",data["content"])
  end

  private
  def redis
    Redis.new
  end

end
