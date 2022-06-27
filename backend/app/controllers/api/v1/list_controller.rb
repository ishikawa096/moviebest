class Api::V1::ListController < ApplicationController
  def index
    @list_comment = List.find(1).comment
    render json: { status: 200, message: @list_comment }
  end
end
