class CommentsController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.new(comment_params)
    @comment.save
    redirect_to post_path(@post), notice: "留言成功" #notice訊息給前端 js 用來移動到底部
  end

  private

  def comment_params
    params.require(:comment).permit(:content).merge(user: current_user)
  end
end
