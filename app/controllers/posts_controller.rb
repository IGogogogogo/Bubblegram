class PostsController < ApplicationController
  before_action :find_post, only: [:show, :edit, :update, :destroy]

  def index
    users = [current_user].concat(current_user.followings)
    @posts = Post.viewable_posts(users).order("created_at DESC")
  end

  def show
    @comments = @post.comments
    @comment = Comment.new
  end

  def load        #讀取個人頁面貼文
    @user = User.find(params[:user_id])
    if params[:type] == "my_posts"
      @posts = Post.my_posts(@user).order("created_at DESC").page(params[:page]).per(21)
    elsif params[:type] == "tag_posts"
      @posts = @user.taged_posts.order("created_at DESC").page(params[:page]).per(21)
    end
    render json: @posts
  end

  def new
    @post = current_user.posts.new
    find_tag_users
  end

  def create
    @post = current_user.posts.new(post_params)

    if @post.save
      redirect_to post_path(@post), notice: '文章新增成功'
    else
      find_tag_users
      render :new
    end
  end

  def edit
    find_tag_users
  end

  def update
    @post.assign_attributes(post_params)
    @post.taged_users = User.where(id: params[:post][:taged_users])

    if @post.save
      redirect_to post_path(@post), notice: '文章更新成功'
    else
      find_tag_users
      render :edit
    end
  end

  def destroy
    @post.destroy
    redirect_to root_path, notice: '文章刪除成功'
  end

  private

  def find_post
    @post = Post.find(params[:id])
  end

  def find_tag_users
    @users = User.all.map{ |u| ["@#{u.nick_name}", u.id] }
    @taged_id = @post.taged_users.map{ |u| u.id }
  end

  def post_params
    params.require(:post).permit(:content, :body, :image)
  end
end
