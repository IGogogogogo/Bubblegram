class PagesController < ApplicationController
  PER_COUNT = 5

  def index
    PER_COUNT = 5
    @following_users = current_user.followings.includes(:room, :stories).order(created_at: :desc)
    viewable_users = User.viewable_users(current_user)
    @results = build_results
    @posts = Post.includes(:user, :thumbs_up_users).viewable_posts(viewable_users).order("created_at DESC").limit(PER_COUNT)
    @has_more_posts = @posts.count >= PER_COUNT
  end

  private
    # 將所需要的結果組成陣列，塞給render的collection

    def build_results
      @stories_user = @following_users.select{|user| user.exist_room? || user.exist_story?}

      [ # 若current_user 有限時動態，轉到show，若沒有，則到new
        { user: current_user, path: current_user.exist_story? ? stories_path(user: current_user.nick_name) : new_user_story_path(user_id: current_user.nick_name) }
      ].concat(
        # 若following_users 有直播，轉到直播的show，若沒有，則到限時動態
        @stories_user.map do |user|
          { user: user, path: user.exist_room? ? room_path(id: user.room.slug) : stories_path(user: user.nick_name) }
        end.sort{|a,b| (a[:path].match?('stories') and !b[:path].match?('stories')) ? 1 : 0}
      )

    end
end
