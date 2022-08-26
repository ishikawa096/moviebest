require 'rails_helper'

RSpec.describe 'Api::V1::Auth::Sessions', type: :request do
  subject { JSON.parse(response.body) }

  let(:api_auth) { { Authorization: "Bearer #{ENV.fetch('BACKEND_API_KEY', nil)}" } }
  let(:user_auth) { sign_in(user) }
  let(:api_and_user_auth) { api_auth.merge(user_auth) }
  let(:user) { create(:user) }
  let(:index_path) { api_v1_auth_sessions_path }
  let(:guest_sign_in_path) { api_v1_auth_guest_sign_in_path }
  let(:guest_email) { 'guest@example.com' }

  describe '#index' do
    it 'レスポンスに成功すること' do
      get index_path, headers: api_auth
      expect(response).to have_http_status(:ok)
    end

    it 'ユーザートークンがあればis_login: trueとuserデータを返すこと' do
      get index_path, headers: api_and_user_auth
      expect(subject['is_login']).to be_truthy
      expect(subject['data']['id']).to eq user.id
    end

    it '未ログインならis_login: falseとメッセージを返すこと' do
      get index_path, headers: api_auth
      expect(subject['is_login']).to be_falsey
      expect(subject['message']).to eq 'ユーザーが存在しません'
    end

    it 'APIトークンがないとき:unauthorizedを返すこと' do
      get index_path
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe '#gurst_sign_in' do
    it 'レスポンスに成功すること' do
      post guest_sign_in_path, headers: api_auth
      expect(response).to have_http_status(:ok)
    end

    it 'ゲストログインできること' do
      post guest_sign_in_path, headers: api_auth
      expect(response.headers['access-token']).to be_present
      expect(response.headers['client']).to be_present
      expect(response.headers['uid']).to eq guest_email
    end

    it 'ログイン成功時ユーザー情報を返すこと' do
      post guest_sign_in_path, headers: api_auth
      expect(subject['data']['id']).to be_present
      expect(subject['data']['name']).to include 'ゲスト'
      expect(subject['data']['email']).to eq guest_email
    end

    it 'ゲストユーザーが存在しない場合作成されること' do
      expect { post guest_sign_in_path, headers: api_auth }.to change(User, :count).by(1)
      expect(User.find_by(email: guest_email)).to be_present
    end

    it 'APIトークンがないとき:unauthorizedを返すこと' do
      post guest_sign_in_path
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
