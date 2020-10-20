class SearchesController < ApplicationController
  def index
    per_count = 36
    @posts = Post.order("favourites_count DESC").limit(per_count)
  end

  def search
    #keyword 存在的話搜尋 user 包含 keyword 的 nick_name

    # 沒有 params[:keyword] 的時候 @users 就會變是 nil 喔
    if params[:keyword].present?
      @users = User.includes(:fans).not_self(current_user).with_keyword(params[:keyword]).limit(10)
    end
  end

  def search_fans
    if params[:keyword].present?
      @user = User.find(params[:user_id])
      @user_fans = @user.fans.with_keyword(params[:keyword])
    end
  end

  def search_followings
    if params[:keyword].present?
      @user = User.find(params[:user_id])
      @user_followings = @user.followings.with_keyword(params[:keyword])
    end
  end
end
