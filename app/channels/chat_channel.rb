class ChatChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    stream_from "chat_channel_#{params[:chat_id]}"
    chat = Chat.find(params[:chat_id])
    sender = chat.opposed_user(current_user).id
    redis.del("#{params[:chat_id]}_#{sender}_new_message")

    if !redis.lrange("#{params[:chat_id]}_#{sender}_new_message",0,-1).present?
      ActionCable.server.broadcast "unread_message_notification_channel", {read_message: true, message: {user_id: sender}}
    end
  end

  def unsubscribed
    # stop_all_streams
    # Any cleanup needed when channel is unsubscribed
  end

  private
  def redis
    Redis.new
  end
end
