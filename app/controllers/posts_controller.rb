class PostsController < ApplicationController
  before_action :find_post, only: [:show, :edit, :update, :destroy, :favourite]

  def index
    users = [current_user].concat(current_user.followings)
    @posts = Post.viewable_posts(users).order("created_at DESC").with_rich_text_body
  end

  def show
    @comments = @post.comments
    @comment = Comment.new
  end

  def new
    @post = current_user.posts.new
  end

  def create
    @post = current_user.posts.new(post_params)

    if @post.save
      redirect_to posts_path, notice: '文章新增成功'
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @post.update(post_params)
      redirect_to posts_path, notice: '文章更新成功'
    else
      render :edit
    end
  end

  def destroy
    @post.destroy
    redirect_to posts_path, notice: '文章刪除成功'
  end

  def favourite
    current_user.toggle_favorite_post(@post)

    respond_to do |format|
      format.html { redirect_to favourite_post_path, notice: 'OK!' }
      format.json { render json: {status: @post.favorited_by?(current_user) } }
    end
  end


  private

  def find_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:content, :body, :image)
  end
end
