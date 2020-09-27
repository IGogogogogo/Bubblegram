class MessagesController < ApplicationController
  def create
    chat_room = Chat.find(params[:chat_id])
    @message = chat_room.messages.create(params_message)
    @opposed_user = chat_room.opposed_user(current_user).id

    SendMessageJob.perform_later(@message, new_message_counts)

    if !is_online_channel_connect?  #判斷對方使用者有沒有在線上
      redis.rpush("#{@message.chat_id}_#{@message.user_id}_new_message", @message.to_json) #下線將訊息存為新訊息
    end

    if !is_unread_channel_connect? && is_online_channel_connect? #如果對方使用者在線上且通知channel斷線（代表正在換頁）
      redis.rpush("#{@message.chat_id}_#{@message.user_id}_new_message", @message.to_json) #將訊息存為新訊息
    end
    # @message.save
    # redirect_to chat_path(chat_room)
  end

private
  def params_message
    params.require(:message).permit(:content, :image).merge(user: current_user)
  end

  def is_unread_channel_connect?
    redis.get("user_#{@opposed_user}_unreadMessage").present?
  end

  def is_online_channel_connect?
    redis.get("user_#{@opposed_user}_online").present?
  end

  def new_message_counts
    redis.lrange("#{@message.chat_id}_#{@message.user_id}_new_message",0,-1).length
  end

end
