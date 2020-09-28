class UnreadMessageNotificationChannel < ApplicationCable::Channel
  def subscribed
    stream_from "unread_message_notification_channel"
    redis.set("user_#{current_user.id}_unreadMessage", "1") #紀錄使用者有連結通知channel
  end

  def unsubscribed
    redis.del("user_#{current_user.id}_unreadMessage") #如果通知channel斷掉把 這個狀態刪除
    # Any cleanup needed when channel is unsubscribed
  end

  def new_message(data)
    redis.rpush("#{data["chatroom_id"]}_#{data["user_id"]}_new_message",data.to_json)
    #使用redis將新的訊息存起來
    # redis 是一個 key 跟 value 形式 key的設計是紀錄這則訊息 是哪一個聊天室 以及 哪一個人？
    # value 是從unread_message_channel.js 傳過來的那則訊息 轉成json格式（為了之後要做處理方便）
  end

  private
  def redis
    @redis = Redis.new unless @redis
    @redis
  end

end
