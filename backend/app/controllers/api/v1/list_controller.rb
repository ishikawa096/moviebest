class Api::V1::ListController < ApplicationController
  def index
    list = List.first
    json = ListSerializer.new(list).serializable_hash
    render json:, status: :ok
  end
end
