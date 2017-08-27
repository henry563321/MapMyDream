class Api::FriendsController < ApplicationController
  def index
    @friends = current_user.friends.all + current_user.applier.all
    render "api/friends/index"
  end

  def create
    @friend = Friends.new(friend_params)
    if @friend.save
      render "api/friends/index"
    else
      render json: @friend.errors.full_messages, status: 422
    end
  end

  def destroy
    @friend = Route.find(params[:id])
    if @friend.destroy
      render "api/friends/index"
    else
      render json: @friend.errors.full_messages, status: 422
    end
  end


  private

  def friends_params
    params.permit(:friend).require(:user_id, :apply_user_id, :status)
  end
end
