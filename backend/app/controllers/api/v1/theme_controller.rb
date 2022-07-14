class Api::V1::ThemeController < ApplicationController
  def index
    themes = Theme.joins(:lists).group(:theme_id).order('count(theme_id) desc').limit(15).select(:id, :title)
    render json: themes, status: :ok
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

  private

  def theme_params
    params.require(:theme).permit(:title, :capacity)
  end
end
