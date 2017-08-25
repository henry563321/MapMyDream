class Api::RoutesController < ApplicationController
  def index
    @routes = Route.all
    render "api/routes/index"
  end

  def show
    @route = Route.find(params[:id])
    render json: show
  end

  def create
    @route = current_user.routes.new(route_params)
    if @route.save
      render "api/routes/show"
    else
      render json: @route.errors.full_messages, status: 422
    end
  end

  def destroy
    @route = Route.find(params[:id])
    if @route.destroy
      render "api/routes/show"
    else
      render json: @route.errors.full_messages, status: 422
    end
  end

  private

  def route_params
    params.require(:dream).permit(:start_time, :route, :end_time)
  end
end
