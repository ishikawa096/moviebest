class Api::V1::ListController < ApplicationController
  def index
    theme_id = params[:theme_id]
    lists = List.includes(:movies).where(theme_id: theme_id)
    json = ListSerializer.new(lists).serializable_hash
    render json:, status: :ok
  end

  def show
    id = params[:id]
    list = List.find(id)
    json = ListSerializer.new(list).serializable_hash
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
    params.require(:list).permit(:comment, :numbered, :theme_id, movies:[:title, :position])
  end
end
