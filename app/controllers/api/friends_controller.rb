class Api::FriendsController < ApplicationController
  def index
    @friends = current_user.friends.all + current_user.applier.all
    render "api/friends/index"
  end

  def create
    @friend = Friend.new(friends_params)
    if @friend.save
      render "api/friends/index"
    else
      render json: @friend.errors.full_messages, status: 422
    end
  end

  def update
    @friend = Friend.find(params[:friend][:id])
    if @friend.update_attributes(status: params[:friend][:status])
      render "api/friends/index"
    else
      render json: @friend.errors.full_messages, status: 422
    end
  end

  def destroy
    @friend = Friend.find(params[:id])
    if @friend.destroy
      render "api/friends/index"
    else
      render json: @friend.errors.full_messages, status: 422
    end
  end


  private

  def friends_params
    params.require(:friend).permit(:user_id, :apply_user_id, :status)
  end
end
