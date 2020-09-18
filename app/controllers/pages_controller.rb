class PagesController < ApplicationController
  def index
    @users = User.viewable_users(current_user)
    @posts = Post.includes(:user, :thumbs_up_users).viewable_posts(@users).order("created_at DESC").limit(20)
  end
end
