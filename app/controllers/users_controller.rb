class UsersController < ApplicationController
  before_action :find_user, only: [:show, :fans, :followings, :edit, :update]
  # before_action :only_owner, only: [:edit, :update]

  def show
    per_count = 36
    @my_posts = @user.posts.order("created_at DESC").limit(per_count)
    @taged_posts = @user.taged_posts.order("created_at DESC").limit(per_count)
    @has_more_my_posts = (@my_posts.count >= per_count)
    @has_more_tag_posts = (@taged_posts.length >= per_count)
  end

  def fans
    @users = @user.fans
  end

  def followings
    @users = @user.followings
  end

  def edit
    authorize @user
  end

  def update
    authorize @user
    if @user.update(user_params)
      redirect_to user_path(@user), notice: "資料更新成功"
    else
      render :edit
    end
  end

  private

  def find_user
    @user = User.friendly.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:nick_name, :email, :description, :avatar)
  end

  # def only_owner
  #   if current_user != @user                   #只有本人可以編輯個人資料
  #     redirect_to user_path(@user.id), alert: "Not allow"
  #   end
  # end

end
