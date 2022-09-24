class Api::V1::ThemesController < ApplicationController
  before_action :authenticate_api_v1_user!, only: %i[create]

  def index
    themes = Theme.includes(:lists)
    @json = themes.as_json(include: :lists)
    render_json
  end

  def show
    theme = Theme.includes(lists: %i[user movies]).find(params[:id])
    @json = theme.as_json(include: { lists: { include: [:movies,
                                                        { user: { only: %i[name id] } }] } })
    render_json
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

  def render_json
    render json: @json, status: :ok
  end

  def theme_params
    params.require(:theme).permit(:title, :capacity)
  end
end
