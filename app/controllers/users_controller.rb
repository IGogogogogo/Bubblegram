class UsersController < ApplicationController
  before_action :find_user, only: [:show, :fans, :followings, :edit, :update, :follow]
  skip_before_action :authenticate_user!, only: [:guest]

  # before_action :only_owner, only: [:edit, :update]

  def show
    per_count = 36
    @my_posts = @user.posts.order("created_at DESC").limit(per_count)
    @taged_posts = @user.taged_posts.order("created_at DESC").limit(per_count)
    @has_more_my_posts = (@my_posts.count >= per_count)
    @has_more_tag_posts = (@taged_posts.length >= per_count)
  end

  def follow
    @followings = params[:followings]
    @fans = params[:fans]
    user_fans = @user.fans.where.not(id: current_user).includes(:fans)[0..-1]
    @user_fans= user_fans.unshift(current_user)
    user_followings = @user.followings.where.not(id: current_user).includes(:fans)[0..-1]
    @user_followings = user_followings.unshift(current_user)
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

  def guest
    num = rand(100000).to_s + ("a".."z").to_a.sample
    guest = User.create(nick_name: "guest#{num}", email: "guest#{num}@gmail.com", password: "123456")
    # byebug
    sign_in(guest)
    redirect_to root_path
  end


  private

  def find_user
    @user = User.find(params[:id])
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
