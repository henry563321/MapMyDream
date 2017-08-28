class Api::UsersController < ApplicationController
  def show
    render json: show
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def index
    if params[:keyword][:username] != ""
      @users = User.where('username like ?', "%#{params[:keyword][:username]}%")
    else
      @users = []
    end
    render "api/users/index"
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
