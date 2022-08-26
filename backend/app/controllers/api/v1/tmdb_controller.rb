class Api::V1::TmdbController < ApplicationController
  def search
    if params[:keyword].blank?
      render json: { message: 'Keyword is requred' }, status: :bad_request
      return
    end
    response = Tmdb::SearchClient.get(params[:keyword])
    if response.code == '200'
      render json: response.body, status: :ok
    else
      message = JSON.parse(response.body)['status_message']
      render json: { message: "API error (#{message})" },
        status: response.code.to_i
    end
  end
end
