class PagesController < ApplicationController
  def index
    per_count = 20
    @following_users = current_user.followings.order("created_at DESC")
    viewable_users = User.viewable_users(current_user)
    @posts = Post.includes(:user, :thumbs_up_users).viewable_posts(viewable_users).order("created_at DESC").limit(per_count)
    @has_more_posts = (@posts.count >= per_count)
  end
end
