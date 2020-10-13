class StoriesController < ApplicationController
  before_action :find_story, only: [:show, :destroy]

  def index
  end

  def load_stories
    if params[:user]
      @user_name = params[:user]
      @user = User.find(params[:user])
    else
      @user_name = current_user.nick_name
      @user = current_user
    end

    @current_user = current_user
    #找到追蹤中且有限動的使用者，依照建立時間排序
    @viewable_users = [current_user].concat(current_user.followings.select{|u| u.exist_story?}.sort_by(&:created_at).reverse).map(&:nick_name)
    @stories = @user.stories.order("created_at DESC")
    @stories_count = @stories.count

    @user_index = @viewable_users.index(@user_name)
    @prev_user =  @user_index > 0 ? @viewable_users[@user_index - 1] : nil
    @next_user = @viewable_users[@user_index + 1]

    @result = {
      user: @user,
      user_inex: @user_index,
      prev_user: @prev_user,
      next_user: @next_user,
      current_user: @current_user,
      viewable_users: @viewable_users,
      stories: @stories,
      stories_count: @stories_count
    }
  end

  def new
    @story = current_user.stories.new
  end

  def create
    @story = current_user.stories.new(story_params)
    authorize @story
    if @story.save
      redirect_to stories_path, notice: "限時動態新增成功"
    else
      render :new
    end
  end

  def destroy
    authorize @story
    @story.destroy
    stories_count = current_user.stories.stories_oneday.count

    if(stories_count == 0)
      redirect_to root_path, notice: "已經沒有限時動態"
    else
      redirect_to stories_path, notice: "限時動態刪除成功"
    end
  end

  private

  def find_story
    @story = Story.find(params[:id])
  end

  def story_params
    # 表單沒有收到 picture 時，沒有 params(:story)，需要先判斷否則會噴錯
    return {} if params[:story].nil?
    params.require(:story).permit(:picture)
  end
end
