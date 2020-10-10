class StoriesController < ApplicationController
  before_action :find_story, only: [:show, :destroy]

  def index
    @user = User.find(params[:user_id])
    @stories = @user.stories.includes(:user).order("created_at DESC").where('created_at >= ?', Time.zone.now - 1.day)
    # 去撈24hr內po的storiesa，測試時可以用5.second。

    # 讓原先的 N + 1 Query 變成 1 (Post) + 1 (User)，scope寫在models
  end

  def show
  end

  def new
    check_owner
    @story = current_user.stories.new
    authorize @story
  end

  def create
    @story = current_user.stories.new(story_params)
    authorize @story

    if @story.save
      redirect_to root_path, notice: "限時動態新增成功"
    else
      render :new
    end
  end

  def destroy
    authorize @story
    @story.destroy
    redirect_to user_stories_path, notice: "限時動態刪除成功"
  end

  private

  def find_story
    @story = Story.find(params[:id])
  end

  def story_params
    params.require(:story).permit(:content, :picture)
  end
end
