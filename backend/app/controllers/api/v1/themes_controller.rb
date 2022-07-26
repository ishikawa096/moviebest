class Api::V1::ThemesController < ApplicationController
  POPULAR_THEMES_MAX_COUNT = 15

  def index
    themes = Theme.all.select(
      :id, :title
    )
    render json: themes, status: :ok
  end

  def show
    theme = Theme.includes(lists: %i[user movies]).find(params[:id])
    json = theme.as_json(include: { lists: { include: [:movies,
                                                       { user: { only: %i[name id] } }] } })
    render json:, status: :ok
  end

  def create
    theme = Theme.new(theme_params)
    if theme.save
      render json: theme, status: :ok
    else
      render json: theme.errors, status: :unprocessable_entity
    end
  end

  def popular
    themes = Theme
             .joins(:lists)
             .group(:theme_id)
             .order('count(theme_id) desc')
             .limit(POPULAR_THEMES_MAX_COUNT)
             .select(:id, :title)
    render json: themes, status: :ok
  end

  private

  def theme_params
    params.require(:theme).permit(:title, :capacity)
  end
end
