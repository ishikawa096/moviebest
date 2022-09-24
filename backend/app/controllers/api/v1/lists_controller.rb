class Api::V1::ListsController < ApplicationController
  before_action :authenticate_api_v1_user!, only: %i[create update destroy]
  before_action :set_list, only: %i[show update destroy]

  def index
    lists = List.includes(:user, :theme, :movies)
    @json = lists.as_json(include: [:theme, :movies, { user: { only: %i[name id] } }])
    render_json
  end

  def show
    @json = @list.as_json(include: [:theme, :movies, { user: { only: %i[name id] } }])
    render_json
  end

  def create
    @list = current_api_v1_user.lists.create_with_movies!(create_params)
    render_list
  rescue ActiveRecord::RecordInvalid => e
    render422(e)
  end

  def update
    if @list.user != current_api_v1_user
      render401
      return
    end
    ActiveRecord::Base.transaction do
      @list.update_with_movies!(update_params)
    end
    render_list
  rescue ActiveRecord::RecordInvalid => e
    render422(e)
  end

  def destroy
    if @list.user != current_api_v1_user
      render401
      return
    end
    @list.destroy!
    render json: { message: 'List was successfully destroyed.' }, status: :ok
  rescue ActiveRecord::RecordInvalid => e
    render422(e)
  end

  private

  def set_list
    @list = List.find(params[:id])
  end

  def create_params
    params
      .require(:list)
      .permit(:comment, :theme_id, movies: %i[title position tmdb_id tmdb_image])
  end

  def update_params
    params
      .require(:list)
      .permit(:comment, movies: %i[id title position tmdb_id tmdb_image])
  end

  def render_json
    render json: @json, status: :ok
  end

  def render_list
    render json: @list, status: :ok
  end

  def render401
    render status: :unauthorized, json: { message: 'Failed to authenticate' }
  end

  def render422(error)
    render json: error.record.errors, status: :unprocessable_entity
  end
end
