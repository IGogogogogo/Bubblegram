class MessagesController < ApplicationController
  def create
    live_stream_room = Room.find(params[:room_id]) if params[:room_id]
    chat_room = Chat.find(params[:chat_id]) if params[:chat_id]
    if live_stream_room
      @live_stream_message = live_stream_room.messages.create(params_message)
      @user = User.find(@live_stream_message.user_id)

      SendLiveStreamMessageJob.perform_later(@live_stream_message, @user)
    else
      @opposed_user = chat_room.opposed_user(current_user).id
      @chat_message = chat_room.messages.create(params_message)

      SendMessageJob.perform_later(@chat_message, new_message_counts, @opposed_user)

      # if !is_online_channel_connect?  #判斷對方使用者有沒有在線上
      #   puts "------------------我是判斷使用者有沒有在線上--------------------"
      #  redis.rpush("#{@chat_message.chatroom_id}_#{@chat_message.user_id}_new_message", @chat_message.to_json) #下線將訊息存為新訊息
      # end

      if !is_unread_channel_connect? && is_online_channel_connect? #如果對方使用者在線上且通知channel斷線（代表正在換頁）
        # puts "------------------我是判斷使用者在線上通知有沒有斷線--------------------"
      redis.rpush("#{@chat_message.chatroom_id}_#{@chat_message.user_id}_new_message", @chat_message.to_json) #將訊息存為新訊息
      end
      # @message.save
      # redirect_to chat_path(chat_room)
    end
  end

  def heart
    live_stream_room = Room.find(params[:room_id])
    SendHeartJob.perform_later(live_stream_room.id, params[:content])
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
    redis.lrange("#{@chat_message.chatroom_id}_#{@chat_message.user_id}_new_message",0,-1).length
  end

end
