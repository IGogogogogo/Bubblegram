class PostsController < ApplicationController
  before_action :find_post, only: [:show, :edit, :update, :destroy]

  def index
    users = [current_user].concat(current_user.followings)
    @posts = Post.viewable_posts(users).order("created_at DESC").with_rich_text_body #with_rich_text_body 是避免N+1方法
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
    @users = User.all.map{ |u| ["@#{u.nick_name}", u.id] }
    @taged_users = @post.taged_users.map{ |u| ["@#{u.nick_name}", u.id] }
    @taged_id = @post.taged_users.map{ |u| u.id }
  end

  def update
    @post.assign_attributes(post_params)
    @post.taged_users = User.where(id: params[:post][:taged_users])

    if @post.save
      redirect_to posts_path, notice: '文章更新成功'
    else
      redirect_to edit_post_path(@post), notice: '文章更新失敗'
    end
  end

  def destroy
    @post.destroy
    redirect_to posts_path, notice: '文章刪除成功'
  end


  private

  def find_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:content, :body, :image)
  end
end
