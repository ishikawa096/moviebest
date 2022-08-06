class Api::V1::ListsController < ApplicationController
  before_action :authenticate_user!, only: %i[create update destroy]

  def index
    lists = List.includes(:user, :theme, :movies)
    json = lists.as_json(include: [:theme, :movies, { user: { only: %i[name id] } }])
    render json:, status: :ok
  end

  def show
    list = List.includes(:user, :theme, :movies).find(params[:id])
    json = list.as_json(include: [:theme, :movies, { user: { only: %i[name id] } }])
    render json:, status: :ok
  rescue ActiveRecord::RecordNotFound => e
    render json: e.record.errors, status: :not_found
  end

  def create
    list = current_api_v1_user.lists.create_with_movies!(create_params)
    render json: list, status: :ok
  rescue ActiveRecord::RecordInvalid => e
    render json: e.record.errors, status: :unprocessable_entity
  end

  def update
    list = List.find(params[:id])
    if list.user != current_api_v1_user
      render401
      return
    end
    ActiveRecord::Base.transaction do
      list.update_with_movies!(update_params)
    end
    render json: list, status: :ok
  rescue ActiveRecord::RecordInvalid => e
    render json: e.record.errors, status: :unprocessable_entity
  end

  def destroy
    list = List.find(params[:id])
    if list.user != current_api_v1_user
      render401
      return
    end
    list.destroy!
    render json: { message: 'List was successfully destroyed.' }, status: :ok
  rescue ActiveRecord::RecordInvalid => e
    render json: e.record.errors, status: :unprocessable_entity
  end

  private

  def create_params
    params
      .require(:list)
      .permit(:comment, :numbered, :theme_id, movies: %i[title position tmdb_id tmdb_image])
  end

  def update_params
    params
      .require(:list)
      .permit(:comment, :numbered, movies: %i[id title position tmdb_id tmdb_image])
  end

  def render401
    render status: :unauthorized, json: { message: 'Failed to authenticate' }
  end
end
