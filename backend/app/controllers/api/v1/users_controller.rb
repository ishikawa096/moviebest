class Api::V1::UsersController < ApplicationController
  def show
    user = User.includes(lists: %i[theme movies]).find(params[:id])
    json = user.as_json(only: %i[name id], include: { lists: { include: %i[theme movies] } })
    render json:, status: :ok
  end
end
