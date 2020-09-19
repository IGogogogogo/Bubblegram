class PagesController < ApplicationController
  def index
    @following_users = current_user.followings.order("created_at DESC")
    viewable_users = User.viewable_users(current_user)
    @posts = Post.includes(:user, :thumbs_up_users).viewable_posts(viewable_users).order("created_at DESC").limit(20)
  end
end
