class StoriesController < ApplicationController
  before_action :find_story, only: [:show, :destroy]

  def index
    # @user = User.find(params[:user_id])
    # viewable_users = User.viewable_users(current_user)
    # @viewable_users = viewable_users.map(&:nick_name)
    # @stories = Story.where(user: viewable_users).includes(:user).order("user_id", "created_at DESC").group_by(&:user_id)    #產生hash key = user_id
    # # @stories = Story.where(user: viewable_users).includes(:user).stories_oneday
    # 去撈24hr內po的storiesa，測試時可以用5.second。
    # @user = User.find(params[:user_id])
    # @stories = @user.stories.includes(:user).order("created_at DESC")
    # @viewable_users = [current_user].concat(current_user.followings.order("created_at DESC")).map(&:nick_name)

    # @result = {
    #   stories: @stories,
    #   user: @user,
    #   viewable_users: @viewable_users
    # }
    @user = User.find(params[:user_id])
    viewable_user = [current_user].concat(current_user.followings.order("created_at DESC"))
    # @viewable_user = viewable_user.map(&:nick_name)
    @stories = viewable_user.map{ |user| user.stories.order("created_at DESC") }
    @first_story_time = @user.stories.last.created_at

    @result = {
      stories: @stories,
      user_name: @user.nick_name,
      user_index: viewable_user.index(@user)
    }
  end

  def load_stories
    @user_name = params[:user]
    @user = User.find(params[:user])
    @current_user = current_user
    #找到追蹤中且有限動的使用者，依照建立時間排序
    @viewable_users = [current_user].concat(current_user.followings.select{|u| u.stories.stories_oneday.count > 0}.sort_by(&:created_at).reverse).map(&:nick_name)
    @stories = @user.stories.stories_oneday.order("created_at DESC")
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
    # check_owner
    @story = current_user.stories.new
    # authorize @story
  end

  def create
    @story = current_user.stories.new(story_params)
    authorize @story
    if @story.save
      redirect_to user_stories_path, notice: "限時動態新增成功"
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
      redirect_to user_stories_path, notice: "限時動態刪除成功"
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
