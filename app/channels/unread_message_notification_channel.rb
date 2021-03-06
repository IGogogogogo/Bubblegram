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
    # puts "------------------我是主要負責建立通知------------------------------"
    redis.rpush("#{data["message"]["chatroom_id"]}_#{data["message"]["user_id"]}_new_message",(data["message"]).to_json)

    #使用redis將新的訊息存起來
    # redis 是一個 key 跟 value 形式 key的設計是紀錄這則訊息 是哪一個聊天室 以及 哪一個人？
    # value 是從unread_message_channel.js 傳過來的那則訊息 轉成json格式（為了之後要做處理方便）
  end

  def chat_message_notice(data)
    redis.rpush("#{data["current_user"]}_chat_notice",data['message']['chatroom_id'])
  end

  def has_any_new_message_room(data)
    chat_room = Chat.between(data["sender"], data["recipient"])
    chat_room.touch_all
  end

  private
  def redis
    @redis = Redis.new unless @redis
    @redis
  end

end
