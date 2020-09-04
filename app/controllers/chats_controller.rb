class ChatsController < ApplicationController
  def index

  end

  def create
    @user = User.find(params[:id])

    redirect_to chat_path(@chat)
  end

  def show

  end
end
