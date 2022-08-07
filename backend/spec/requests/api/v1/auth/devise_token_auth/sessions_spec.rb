require 'rails_helper'

RSpec.describe 'DeviseTokenAuth::Sessions', type: :request do
  let(:api_auth) { { Authorization: "Bearer #{ENV.fetch('BACKEND_API_KEY', nil)}" } }
  let(:user_auth) { sign_in(user) }
  let(:api_and_user_auth) { api_auth.merge(user_auth) }
  let(:user) { create(:user) }
  let(:sign_in_path) { api_v1_user_session_path }
  let(:sign_out_path) { destroy_api_v1_user_session_path }

  let(:sign_in_params) do
    {
      email: user.email,
    password: user.password
    }
  end

  describe '#create' do
    it 'レスポンスに成功すること' do
      post sign_in_path, headers: api_auth, params: sign_in_params
      expect(response).to have_http_status(:ok)
    end

    it 'ログインできること' do
      post sign_in_path, headers: api_auth, params: sign_in_params
      expect(response.headers['access-token']).not_to be_blank
      expect(response.headers['client']).not_to be_blank
      expect(response.headers['uid']).to eq user.email
    end

    it 'emailが違うとき:unauthorizedを返すこと' do
      post sign_in_path, headers: api_auth,
        params: sign_in_params.merge({ email: 'other@example.com' })
      expect(response).to have_http_status(:unauthorized)
    end

    it 'passwordが違うとき:unauthorizedを返すこと' do
      post sign_in_path, headers: api_auth,
        params: sign_in_params.merge({ password: 'otherpass' })
      expect(response).to have_http_status(:unauthorized)
    end

    it 'APIトークンがないとき:unauthorizedを返すこと' do
      post sign_in_path
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe '#destroy' do
    it 'レスポンスに成功すること' do
      delete sign_out_path, headers: api_and_user_auth
      expect(response).to have_http_status(:ok)
    end

    it 'ユーザートークンが無いとき:not_foundを返すこと' do
      delete sign_out_path, headers: api_auth
      expect(response).to have_http_status(:not_found)
    end

    it 'APIトークンが無いとき:unauthorizedを返すこと' do
      delete sign_out_path, headers: user_auth
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
