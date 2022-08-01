class Api::V1::ListsController < ApplicationController
  def index
    lists = List.includes(:movies).where(params[:theme_id])
    render json: lists, status: :ok
  end

  def show
    list = List.includes(:user, :theme, :movies).find(params[:id])
    json = list.as_json(include: [:theme, :movies, { user: { only: %i[name id] } }])
    render json:, status: :ok
  end

  def create
    form = Form::ListRegistration.new(params_permited)
    list = List.create!(form.params)
    if list
      render json: list, status: :ok
    else
      render json: list.errors, status: :unprocessable_entity
    end
  end

  private

  def params_permited
    params
      .require(:list)
      .permit(:comment, :numbered, :theme_id, movies: %i[title position tmdb_id tmdb_image])
      .merge(user_id: current_user.id)
  end
end
