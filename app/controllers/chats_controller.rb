class ChatsController < ApplicationController

  def index
    @users = User.where.not(id: current_user)
    @chats = Chat.between(current_user, @users)
  end

  def create
    @user = User.find(params[:user_id])
    @chat = Chat.get(current_user.id, @user.id)

    redirect_to chat_path(@chat.id)
  end

  def show
    # @user = User.find(params[:id])
    @chat = Chat.find(params[:id])
    @message = Message.new
    @messages = @chat.messages.includes(:user)
    sender = @chat.opposed_user(current_user).id
    redis.del("#{@chat.id}_#{sender}_new_message")    #一進入到聊天室，把未讀訊息刪除

    if !redis.lrange("#{@chat.id}_#{sender}_new_message",0,-1).present?  #如果沒有任何新訊息了，廣播到unreand_message_channel.js 去更新狀態
      ActionCable.server.broadcast "unread_message_notification_channel", {read_message: true, message: {user_id: sender}}
    end
  end

  private
  def redis
    Redis.new
  end
end
