require 'rails_helper'

RSpec.describe 'Api::V1::Themes', type: :request do
  subject { JSON.parse(response.body) }

  let(:api_auth) { { Authorization: "Bearer #{ENV.fetch('BACKEND_API_KEY', nil)}" } }
  let(:user_auth) { sign_in(user) }
  let(:api_and_user_auth) { api_auth.merge(user_auth) }
  let(:user) { create(:user) }

  let(:create_params) do
    { theme: {
      title: 'new theme',
      capacity: 3
    } }
  end

  let(:invalid_params) do
    { theme: {
      title: 'theme',
      capacity: 'invalid'
    } }
  end

  describe '#index' do
    it 'レスポンスに成功すること' do
      get api_v1_themes_path, headers: api_auth
      expect(response).to have_http_status(:ok)
    end

    it '返したjsonに関連listsを含むこと' do
      theme = create(:theme, :with_association)
      get api_v1_themes_path, headers: api_auth
      expect(subject[0]['id']).to eq theme.id
      expect(subject[0]['lists'][0]['id']).to eq theme.lists.first.id
    end

    it 'APIトークンがないとき:unauthorizedを返すこと' do
      get api_v1_themes_path
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe '#show' do
    before do
      create(:theme, id: 1)
    end

    it 'レスポンスに成功すること' do
      get api_v1_theme_path(1), headers: api_auth
      expect(response).to have_http_status(:ok)
    end

    it 'クエリのidを持つthemeだけ含むこと' do
      create(:theme, id: 2)
      get api_v1_theme_path(1), headers: api_auth
      expect(subject['id']).to eq 1
    end

    it '返したjsonに関連モデルを含むこと' do
      theme = create(:theme, :with_association, id: 2)
      get api_v1_theme_path(2), headers: api_auth
      expect(subject['id']).to eq theme.id
      expect(subject['lists'][0]['id']).to eq theme.lists.first.id
      expect(subject['lists'][0]['user']['id']).to eq theme.lists.first.user_id
      subject['lists'][0]['movies'].all? do |movie|
        expect(movie['list_id']).to eq theme.lists.first.id
      end
    end

    it 'APIトークンがないとき:unauthorizedを返すこと' do
      get api_v1_theme_path(1)
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe '#create' do
    it 'レスポンスに成功すること' do
      post api_v1_themes_path, headers: api_and_user_auth, params: create_params
      expect(response).to have_http_status(:ok)
      expect(Theme.count).to eq 1
    end

    it '新規作成できること' do
      expect do
        post api_v1_themes_path, headers: api_and_user_auth, params: create_params
      end.to change(Theme, :count).by(1)
    end

    it 'バリデーションエラーがあるときエラーコードとエラー内容を返すこと' do
      post api_v1_themes_path, headers: api_and_user_auth, params: invalid_params
      expect(response).to have_http_status(:unprocessable_entity)
      expect(subject).to be_present
    end

    it 'APIトークンがないとき:unauthorizedを返すこと' do
      post api_v1_themes_path, headers: user_auth, params: create_params
      expect(response).to have_http_status(:unauthorized)
    end

    it 'ユーザートークンがないとき:unauthorizedを返すこと' do
      post api_v1_themes_path, headers: api_auth, params: create_params
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
