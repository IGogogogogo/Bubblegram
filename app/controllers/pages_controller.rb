class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:welcome]

  def index
    users = [current_user].concat(current_user.followings)
    @posts = Post.viewable_posts(users).order("created_at DESC").limit(20)
  end

  def welcome
  end
end
