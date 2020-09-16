class PagesController < ApplicationController

  def index
    @users = User.viewable_users(current_user)
    @posts = Post.includes(:user).viewable_posts(@users).order("created_at DESC").limit(20)
  end
end
