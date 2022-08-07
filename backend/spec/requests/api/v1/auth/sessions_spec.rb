require 'rails_helper'

RSpec.describe 'Api::V1::Auth::Sessions', type: :request do
  subject { JSON.parse(response.body) }

  let(:api_auth) { { Authorization: "Bearer #{ENV.fetch('BACKEND_API_KEY', nil)}" } }
  let(:user_auth) { sign_in(user) }
  let(:api_and_user_auth) { api_auth.merge(user_auth) }
  let(:user) { create(:user) }
  let(:path) { api_v1_auth_sessions_path }

  describe '#index' do
    it 'レスポンスに成功すること' do
      get path, headers: api_auth
      expect(response).to have_http_status(:ok)
    end

    it 'ユーザートークンがあればis_login: trueとuserデータを返すこと' do
      get path, headers: api_and_user_auth
      expect(subject['is_login']).to be_truthy
      expect(subject['data']['id']).to eq user.id
    end

    it '未ログインならis_login: falseとメッセージを返すこと' do
      get path, headers: api_auth
      expect(subject['is_login']).to be_falsey
      expect(subject['message']).to eq 'ユーザーが存在しません'
    end

    it 'APIトークンがないとき:unauthorizedを返すこと' do
      get path
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
