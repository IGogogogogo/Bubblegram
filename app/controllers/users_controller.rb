class UsersController < ApplicationController
  before_action :find_user, only: [:show, :fans, :followings, :edit, :update]
  before_action :only_owner, only: [:edit, :update]

  helper_method :already_followed

  def show
  end

  def fans 
    @users = @user.fans
  end

  def followings
    @users = @user.followings
  end

  def edit 
  end

  def update 
    if @user.update(user_params)
      redirect_to user_path(@user), notice: "資料更新成功"
    else
      render :edit
    end
  end

  private 

  def find_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:nick_name, :email)  
  end

  def already_followed(user)                  #檢查自己是否已經追蹤對方
    user.fans.include?(current_user)
  end

  def only_owner
    if current_user != @user                   #只有本人可以編輯個人資料
      redirect_to user_path(@user.id), alert: "Not allow"
    end
  end
end
