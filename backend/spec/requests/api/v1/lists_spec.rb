require 'rails_helper'

RSpec.describe 'Api::V1::Lists', type: :request do
  subject { JSON.parse(response.body) }

  let(:api_auth) { { Authorization: "Bearer #{ENV.fetch('BACKEND_API_KEY', nil)}" } }
  let(:user_auth) { sign_in(user) }
  let(:api_and_user_auth) { api_auth.merge(user_auth) }
  let(:list) { create(:list, :skip_validation) }
  let(:user) { create(:user) }

  let(:create_params) do
    { list: {
      theme_id: 1,
      comment: 'test comment',
      movies: [
        { title: 'movie1', position: 0, tmdb_id: 1, tmdb_image: '/test' },
        { title: 'movie2', position: 1, tmdb_id: 2, tmdb_image: '/test' }
      ]
    } }
  end

  let(:update_params) do
    { id: 1,
      list: {
        comment: 'update comment',
        movies: [
          { id: 1, title: 'movie1', position: 0, tmdb_id: 1, tmdb_image: '/test' },
          { id: 2, title: 'movie2', position: 1, tmdb_id: 2, tmdb_image: '/test' }
        ]
      } }
  end
  let(:invalid_params) do
    { id: 1,
      list: {
        comment: 'invalid params',
        movies: [
          { id: 1, title: '', position: '', tmdb_id: '', tmdb_image: '' },
          { id: 2, title: '', position: '', tmdb_id: '', tmdb_image: '' }
        ]
      } }
  end

  describe '#index' do
    it 'レスポンスに成功する' do
      get api_v1_lists_path, headers: api_auth
      expect(response).to have_http_status(:ok)
    end

    it '返したjsonに関連モデルを含む' do
      list = create(:list, :with_movies, :with_theme)
      get api_v1_lists_path, headers: api_auth
      expect(subject[0]['id']).to eq list.id
      expect(subject[0]['user']['id']).to eq list.user_id
      expect(subject[0]['theme']['id']).to eq list.theme_id
      subject[0]['movies'].all? do |movie|
        expect(movie['list_id']).to eq list.id
      end
    end

    it 'APIトークンがないとき:unauthorizedを返す' do
      get api_v1_lists_path
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe '#show' do
    before do
      create(:list, :skip_validation, id: 1)
    end

    it 'レスポンスに成功する' do
      get api_v1_list_path(1), headers: api_auth
      expect(response).to have_http_status(:ok)
    end

    it 'クエリのidを持つlistだけ含む' do
      create(:list, :skip_validation, id: 2)
      get api_v1_list_path(1), headers: api_auth
      expect(subject['id']).to eq 1
    end

    it '返したjsonに関連モデルを含む' do
      list = create(:list, :with_movies, :with_theme, id: 2)
      get api_v1_list_path(2), headers: api_auth
      expect(subject['user']['id']).to eq list.user_id
      expect(subject['theme']['id']).to eq list.theme_id
      subject['movies'].all? do |movie|
        expect(movie['list_id']).to eq list.id
      end
    end

    it 'APIトークンがないとき:unauthorizedを返す' do
      get api_v1_list_path(1)
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe '#create' do
    it 'listと関連moviesを新規作成できる' do
      create(:theme, id: create_params[:list][:theme_id],
              capacity: create_params[:list][:movies].count)
      post api_v1_lists_path, headers: api_and_user_auth, params: create_params
      expect(response).to have_http_status(:ok)
      expect(List.count).to eq 1
      expect(Movie.count).to eq 2
    end

    it 'バリデーションエラーがあるときエラーコードとエラー内容を返す' do
      create(:theme, id: create_params[:list][:theme_id], capacity: 5)
      post api_v1_lists_path, headers: api_and_user_auth, params: create_params
      expect(response).to have_http_status(:unprocessable_entity)
      expect(subject['movies']).to include 'を5つ入力してください(現在：2)'
    end

    it 'APIトークンがないとき:unauthorizedを返す' do
      post api_v1_lists_path, headers: user_auth, params: create_params
      expect(response).to have_http_status(:unauthorized)
    end

    it 'ユーザートークンがないとき:unauthorizedを返す' do
      post api_v1_lists_path, headers: api_auth, params: create_params
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe '#edit' do
    it 'レコードを更新できる' do
      create(:list, :with_theme, theme_capacity: 2, id: update_params[:id], user:,
              movies: [create(:movie, id: 1, list:), create(:movie, id: 2, list:)])
      patch api_v1_list_path(update_params[:id]), headers: api_and_user_auth, params: update_params
      expect(response).to have_http_status(:ok)
      expect(List.find(update_params[:id]).comment).to eq 'update comment'
    end

    it 'バリデーションエラーがあるときエラーコードとエラー内容を返す' do
      create(:list, :with_theme, theme_capacity: 2, id: invalid_params[:id], user:,
              movies: [create(:movie, id: 1, list:), create(:movie, id: 2, list:)])
      patch api_v1_list_path(invalid_params[:id]), headers: api_and_user_auth,
                                                   params: invalid_params
      expect(response).to have_http_status(:unprocessable_entity)
      expect(subject).not_to be_blank
    end

    it 'listの作者でないユーザーは更新できない' do
      another_user = create(:user)
      create(:list, :with_theme, theme_capacity: 2, id: update_params[:id], user: another_user,
              movies: [create(:movie, id: 1, list:), create(:movie, id: 2, list:)])
      patch api_v1_list_path(update_params[:id]), headers: api_and_user_auth, params: update_params
      expect(response).to have_http_status(:unauthorized)
    end

    it 'APIトークンがないときcode:unauthorizedを返す' do
      patch api_v1_list_path(update_params[:id]), headers: user_auth, params: update_params
      expect(response).to have_http_status(:unauthorized)
    end

    it 'ユーザートークンがないときcode:unauthorizedを返す' do
      patch api_v1_list_path(update_params[:id]), headers: api_auth, params: update_params
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe '#destroy' do
    it 'レコードを削除できる' do
      create(:list, :skip_validation, id: 1, user:)
      delete api_v1_list_path(1), headers: api_and_user_auth
      expect(response).to have_http_status(:ok)
      expect(List.count).to eq 0
    end

    it 'listの作者でないユーザーは削除できない' do
      another_user = create(:user)
      create(:list, :skip_validation, id: 1, user: another_user)
      delete api_v1_list_path(1), headers: api_and_user_auth
      expect(response).to have_http_status(:unauthorized)
      expect(List.count).to eq 1
    end

    it 'APIトークンがないときcode:unauthorizedを返す' do
      delete api_v1_list_path(list.id), headers: user_auth, params: update_params
      expect(response).to have_http_status(:unauthorized)
    end

    it 'ユーザートークンがないときcode:unauthorizedを返す' do
      delete api_v1_list_path(list.id), headers: api_auth, params: update_params
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
