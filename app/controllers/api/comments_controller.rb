class Api::CommentsController < ApplicationController
  def index
    @comments = Comment.all
    render "api/comments/index"
  end

  def create
    comment = Comment.new(comments_params)
    if comment.save
      @comments = Comment.all
      render "api/comments/index"
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    if @comment.destroy
      @comments = Comment.all
      render "api/comments/index"
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end


  private

  def comments_params
    params.require(:comment).permit(:commenter_id, :body, :route_id)
  end
end
