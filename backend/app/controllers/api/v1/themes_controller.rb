class Api::V1::ThemesController < ApplicationController
  POPULAR_THEMES_MAX_COUNT = 15

  def index
    themes = Theme.all.select(
      :id, :title
    )
    json = themes.as_json.map do |t|
      t.deep_transform_keys! do |key|
        key.camelize(:lower)
      end
    end
    render json:, status: :ok
  end

  def show
    theme = Theme.find(params[:id])
    json = ThemeSerializer.new(theme).serializable_hash
    render json:, status: :ok
  end

  def create
    theme = Theme.new(theme_params)
    if theme.save
      json = ThemeSerializer.new(theme).serializable_hash
      render json:, status: :ok
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
