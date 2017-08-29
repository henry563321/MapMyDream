class Api::CommentsController < ApplicationController

  def create
    @comment = Friend.new(comments_params)
    if @comment.save
      render "api/comments/index"
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    @comment = Friend.find(params[:id])
    if @comment.destroy
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
