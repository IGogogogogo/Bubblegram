class StoriesController < ApplicationController
  before_action :find_story, only: [:show, :destroy]

  def index
    @user = current_user.nick_name
    viewable_users = User.viewable_users(current_user)
    @viewable_users = viewable_users.map(&:nick_name)
    @stories = Story.where(user: viewable_users).includes(:user).order("user_id", "created_at DESC").group_by(&:user_id)    #產生hash key = user_id
    # @stories = Story.where(user: viewable_users).includes(:user).stories_oneday
    # 去撈24hr內po的storiesa，測試時可以用5.second。
  end

  def new
    check_owner
    @story = current_user.stories.new
    authorize @story
  end

  def create
    # byebug
    @story = current_user.stories.new(story_params)
    # byebug
    authorize @story
    # byebug
    if @story.save
      redirect_to user_stories_path, notice: "限時動態新增成功"
    else
      # byebugc

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
      redirect_to user_stories_path, notice: "限時動態刪除成功"
    end
  end

  private

  def find_story
    @story = Story.find(params[:id])
  end

  def story_params
    # params.permit(:picture)
    # 問助教為什麼不給過？
    params.require(:story).permit(:picture)
  end
end
