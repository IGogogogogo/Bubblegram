class PostsController < ApplicationController
  before_action :find_post, only: [:show, :edit, :update, :destroy, :favourite]

  def index
    per_count = 20
    @user = User.find(params[:user_id])
    @posts = @user.posts.includes(:thumbs_up_users).order("created_at DESC").limit(per_count)
  end

  def show
    @taged_users = @post.taged_users
    @comments = @post.comments
    @comment = Comment.new
  end

  def load_posts     #依照kaminari page & type 讀取新貼文
    @user = User.find(params[:user_id]) if params[:user_id]
    @partial = "/posts/post"
    per_count = 20

    if params[:type] == "following_posts"
      users = User.viewable_users(current_user)
      @posts = Post.viewable_posts(users).includes(:user).order("created_at DESC").page(params[:page]).per(per_count)
    elsif params[:type] == "my_posts"
      @posts = @user.posts.order("created_at DESC").page(params[:page]).per(per_count)
    end

    respond_to do |format|
      format.html  { render partial: @partial, collection: @posts, as: :post}
    end
  end

  def load_img
    @user = User.find(params[:user_id])
    @partial = "/posts/post_img"
    per_count = 36

    if params[:type] == "post_img"
      @posts = @user.posts.order("created_at DESC").page(params[:page]).per(per_count)
    elsif params[:type] == "tag_img"
      @posts = @user.taged_posts.order("created_at DESC").page(params[:page]).per(per_count)
    end

    respond_to do |format|
      format.html  { render partial: @partial, collection: @posts, as: :post}
    end
  end

  def load_rand_img
    per_count = 36
    @partial = "/posts/post_img"
    @posts = Post.order("favourites_count DESC").page(params[:page]).per(per_count)

    respond_to do |format|
      format.html  { render partial: @partial, collection: @posts, as: :post}
    end
  end

  def new
    check_owner
    @post = current_user.posts.new

    find_tag_users
    @url = user_posts_path(current_user)
  end

  def create
    @post = current_user.posts.new(post_params)
    authorize @post

    if @post.save
      redirect_to root_path, notice: '文章新增成功'
    else
      find_tag_users
      @url = user_posts_path(current_user)
      render :new
    end
  end

  def edit
    authorize @post
    find_tag_users
    @url = post_path
  end

  def update
    @post.assign_attributes(post_params)
    authorize @post

    if @post.save
      redirect_to post_path(@post), notice: '文章更新成功'
    else
      @url = post_path
      find_tag_users
      render :edit
    end
  end

  def destroy
    authorize @post
    @post.destroy
    redirect_to root_path, notice: '文章成功刪除'
  end

  def favourite
    current_user.toggle_favorite_post(@post)

    respond_to do |format|
      # format.html { redirect_to favourite_post_path, notice: 'OK!' }
      format.json { render json: {status: @post.favorited_by?(current_user) } }
    end
  end


  private

  def find_post
    @post = Post.find(params[:id])
  end

  def find_tag_users
    @users = current_user.followings.map{ |u| ["@#{u.nick_name}", u.id] }
    @taged_id = @post.taged_users.map{ |u| u.id }
  end

  def post_params
    params.require(:post).permit(:content, :body, {taged_user_ids: []}, {images: []} )
  end
end
