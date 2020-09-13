class PostsController < ApplicationController
  before_action :find_post, only: [:show, :edit, :update, :destroy]

  def index
    @user = User.find(params[:user_id])
    @posts = @user.posts.includes(:comments).order("created_at DESC").limit(20)
  end

  def show
    @comments = @post.comments
    @comment = Comment.new
  end

  def load_posts     #讀取新貼文
    puts "---------------------------------------------------------"
    puts "-----------action load posts----------------------------------------------"
    p params
    puts "---------------------------------------------------------"
    @user = User.find(params[:user_id])
    if params[:type] == "my_posts"
      @posts = @user.posts.order("created_at DESC").page(params[:page]).per(20)
      @partial = "/posts/post"
      @target = ".main-posts"
    elsif params[:type] == "post_img"
      # @posts = Post.my_posts(@user).order("created_at DESC").page(params[:page]).per(36)
      @posts = @user.posts.order("created_at DESC").page(params[:page]).per(36)
      @partial = "/posts/post_img"
      @target = ".post-img"
    elsif params[:type] == "tag_img"
      # @posts = Post.includes(:taged_users).where(user_tags: {user: @user}).order("created_at DESC").page(params[:page]).per(36)
      @posts = @user.taged_posts.order("created_at DESC").page(params[:page]).per(36)
      @partial = "/posts/post_img"
      @target = ".tag-img"
    end
    # LoadPostsJob.set(wait: 0.second).perform_later(params[:user_id], params[:type], params[:page])
    # puts "---------load posts Job and await------------------------"
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
