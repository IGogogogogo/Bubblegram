class FollowsController < ApplicationController
  before_action :find_user, only: [:create, :destroy]

  def create
    @user.fans << current_user          #把自己加入對方的粉絲中
    FollowJob.perform_later(current_user, current_user.followings.count)
  end

  def destroy
    @user.fans.destroy(current_user)    #把自己從對方的粉絲中刪除
    FollowJob.perform_later(current_user, current_user.followings.count)
  end

  private

  def find_user
    @user = User.find(params[:user_id])
  end
end
