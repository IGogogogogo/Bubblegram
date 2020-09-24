class StoriesController < ApplicationController
  before_action :find_story, only: [:show, :destroy]

  def index
    @stories = Story.includes(:user).where(user_id: params[:user_id]).order("created_at DESC").where('created_at >= ?', Time.zone.now - 1.day)
    # 去撈24hr內po的storiesa，測試時可以用5.second。

    @user = User.find_by(id: params[:user_id])

    # users = [current_user].concat(current_user.followings)
    # @stories = Story.viewable_stories(users).order("created_at DESC")
    # 讓原先的 N + 1 Query 變成 1 (Post) + 1 (User)，scope寫在models
    # byebug
  end

  def show
    authorize @story
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
