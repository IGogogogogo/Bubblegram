class PostsController < ApplicationController
  def index
    @posts = Post.all.with_rich_text_body #with_rich_text_body 是避免N+1方法
  end

  def new
    @post = Post.new
  end

  def show
    @post = Post.find(params[:id])
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])

    if @post.update(post_params)
      redirect_to posts_path, notice: '文章更新成功'
    else
      render :edit
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    redirect_to posts_path, notice: '文章刪除成功'
  end

  def create
    @post = Post.new(post_params)

    if @post.save
      redirect_to posts_path, notice: '文章新增成功'
    else
      render :new
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :content, :body)
  end
end
