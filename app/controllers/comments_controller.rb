class CommentsController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.new(comment_params)
    if @comment.save
      redirect_to post_path(@post), notice: "create comment success"
    else
      redirect_to post_path(@post), notice: "create comment false"
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content).merge(user: current_user)
  end
end
