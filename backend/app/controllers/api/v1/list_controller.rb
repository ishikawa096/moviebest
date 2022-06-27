class Api::V1::ListController < ApplicationController
  def index
    @list_comment = List.first.comment
    render json: { status: 200, message: @list_comment }
  end
end
