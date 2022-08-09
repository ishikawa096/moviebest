class Api::V1::ThemesController < ApplicationController
  POPULAR_THEMES_MAX_COUNT = 15

  before_action :authenticate_user!, only: %i[create]

  def index
    themes = Theme.includes(:lists)
    json = themes.as_json(include: :lists)
    render json:, status: :ok
  end

  def show
    theme = Theme.includes(lists: %i[user movies]).find(params[:id])
    json = theme.as_json(include: { lists: { include: [:movies,
                                                       { user: { only: %i[name id] } }] } })
    render json:, status: :ok
  rescue ActiveRecord::RecordNotFound => e
    render json: e.record.errors, status: :not_found
  end

  def create
    theme = Theme.new(theme_params)
    if theme.save
      render json: theme, status: :ok
    else
      render json: theme.errors, status: :unprocessable_entity
    end
  end

  private

  def theme_params
    params.require(:theme).permit(:title, :capacity)
  end
end
