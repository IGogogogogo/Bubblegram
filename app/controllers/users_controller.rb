class UsersController < ApplicationController
  before_action :find_user, only: [:show, :fans, :followings, :is_followings]

  helper_method :already_followed

  def show
  end

  def fans 
    @users = @user.fans
  end

  def followings
    @users = @user.followings
  end

  private 

  def find_user
    @user = User.find(params[:id])
  end

  def already_followed(user)                  #檢查自己是否已經追蹤對方
    user.fans.include?(current_user)
  end
end