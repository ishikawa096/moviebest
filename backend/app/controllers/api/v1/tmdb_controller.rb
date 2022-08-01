class Api::V1::TmdbController < ApplicationController
  def search
    if params[:keyword].blank?
      render json: { status: 400, message: 'Keyword is requred' }
      return
    end
    response = Tmdb::SearchClient.get(params[:keyword])
    render json: response.body, status: response.code
  end

  def images
    if params[:tmdb_id].blank?
      render json: { status: 400, message: 'TMDB ID is requred' }
      return
    end
    response = Tmdb::ImagesClient.get(params[:tmdb_id])
    render json: response.body, status: response.code
  end
end