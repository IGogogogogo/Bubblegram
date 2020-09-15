class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:welcome]

  def index
    users = User.viewable_users(current_user)
    @posts = Post.includes(:user).viewable_posts(users).order("created_at DESC").limit(20)
  end

  def welcome
  end
end
