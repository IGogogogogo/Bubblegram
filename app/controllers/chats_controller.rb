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
    @chat = Chat.find(params[:id])
    check_member
    @message = Message.new
    @messages = @chat.messages.includes(:user).order(id: :desc).limit(100).reverse
    @messages_json = @chat.messages.includes(:user).page(params[:page]).order(id: :desc)
    @sender = @chat.opposed_user(current_user).id


    if any_new_messages?
      first_unreand_message = JSON.parse(redis.lrange("#{@chat.id}_#{@sender}_new_message",0,-1)[0])
      @unread_message = Message.find(first_unreand_message["id"])  #找未讀訊息的第一則
    end

    redis.del("#{@chat.id}_#{@sender}_new_message")    #一進入到聊天室，把未讀訊息刪除
    if user_chatroom_new_message.length > 0
      redis.lrem("#{current_user.id}_chat_notice",0,"#{@chat.id}_#{@sender}_new_message")
      # session[:chat_room_new_message] = @user_chatroom_new_message.length
    end


    if !any_new_messages? #如果沒有任何新訊息了，廣播到unreand_message_channel.js 去更新狀態
      ActionCable.server.broadcast "unread_message_notification_channel", {read_message: true, message: {user_id: @sender}}
    end
  end

  private
  def user_chatroom_new_message
    redis.lrange("#{current_user.id}_chat_notice",0,-1)
  end

  def any_new_messages?
    redis.lrange("#{@chat.id}_#{@sender}_new_message",0,-1).present?
  end

  def check_member
    if @chat.sender_id != current_user.id && @chat.recipient_id != current_user.id
      redirect_to root_path, notice: "你不是聊天室成員！"
    end
  end
end
