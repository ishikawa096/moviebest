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
    form = Form::ListRegistration.new(create_params)
    list = List.create_with_movies!(form.params)
    if list
      render json: list, status: :ok
    else
      render json: list.errors, status: :unprocessable_entity
    end
  end

  def update
    list = List.includes(:user, :theme, :movies).find(params[:id])
    if list.user != current_user
      render json: { status: 401, message: 'Failed to authenticate for update' }
      return
    end
    form = Form::ListRegistration.new(update_params)
    ActiveRecord::Base.transaction do
      list.update_with_movies!(form.params)
    end
      render json: list, status: :ok
  end

  def delete
    # form = Form::ListRegistration.new(params_permited)
    # list = List.create!(form.params)
    # if list
    #   render json: list, status: :ok
    # else
    #   render json: list.errors, status: :unprocessable_entity
    # end
  end

  private

  def create_params
    params
      .require(:list)
      .permit(:comment, :numbered, :theme_id, movies: %i[title position tmdb_id tmdb_image])
      .merge(user_id: current_user.id)
  end

  def update_params
    params
    .require(:list)
    .permit(:comment, :numbered, movies: %i[id title position tmdb_id tmdb_image])
  end
end
