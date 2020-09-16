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


  end
end
