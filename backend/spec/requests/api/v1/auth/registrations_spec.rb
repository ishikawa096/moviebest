require 'rails_helper'

RSpec.describe 'Api::V1::Auth::Registrations', type: :request do
  subject { JSON.parse(response.body) }

  let(:api_auth) { { Authorization: "Bearer #{ENV.fetch('BACKEND_API_KEY', nil)}" } }
  let(:user_auth) { sign_in(user) }
  let(:guest_auth) { sign_in(guest_user) }
  let(:api_and_user_auth) { api_auth.merge(user_auth) }
  let(:api_and_guest_auth) { api_auth.merge(guest_auth) }
  let(:user) { create(:user, sign_up_params) }
  let(:guest_user) { create(:guest_user) }
  let(:path) { api_v1_user_registration_path }

  let(:sign_up_params) do
    {
      name: 'Name',
      email: 'test@example.com',
      password: 'password',
      password_confirmation: 'password'
    }
  end

  let(:update_params) do
    {
      current_password: user.password,
      password: 'updated',
      password_confirmation: 'updated'
    }
  end

  let(:guest_update_params) do
    {
      current_password: guest_user.password,
      password: 'updated',
      password_confirmation: 'updated'
    }
  end

  describe '#create' do
    it 'レスポンスに成功すること' do
      post path, headers: api_auth, params: sign_up_params
      expect(response).to have_http_status(:ok)
    end

    it '新規user登録できること' do
      expect { post path, headers: api_auth, params: sign_up_params }.to change(User, :count).by(1)
    end

    it '作成後ログインされること' do
      post path, headers: api_auth, params: sign_up_params
      expect(response.headers['access-token']).to be_present
      expect(response.headers['client']).to be_present
      expect(response.headers['uid']).to eq sign_up_params[:email]
    end

    it 'バリデーションエラーのとき:unprocessable_entityを返すこと' do
      post path, headers: api_auth,
        params: sign_up_params.merge({ name: nil })
      expect(response).to have_http_status(:unprocessable_entity)
      expect(subject['errors']).to be_present
    end

    it 'APIトークンがないとき:unauthorizedを返すこと' do
      post path, params: sign_up_params
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe '#update' do
    it 'レスポンスに成功すること' do
      put path, headers: api_and_user_auth, params: update_params
      expect(response).to have_http_status(:ok)
    end

    it 'current_passwordが無いとき:unprocessable_entityを返すこと' do
      put path, headers: api_and_user_auth,
        params: update_params.merge({ current_password: nil })
      expect(response).to have_http_status(:unprocessable_entity)
      expect(subject['errors']).to be_present
    end

    it 'バリデーションエラーのとき:unprocessable_entityを返すこと' do
      put path, headers: api_and_user_auth,
        params: update_params.merge({ password: 'p', password_confirmation: 'p' })
      expect(response).to have_http_status(:unprocessable_entity)
      expect(subject['errors']).to be_present
    end

    it 'ユーザートークンがないとき:not_foundを返すこと' do
      put path, headers: api_auth, params: update_params
      expect(response).to have_http_status(:not_found)
    end

    it 'APIトークンがないとき:unauthorizedを返すこと' do
      put path, headers: user_auth, params: update_params
      expect(response).to have_http_status(:unauthorized)
    end

    it 'ゲストユーザーは:forbiddenを返すこと' do
      put path, headers: api_and_guest_auth, params: guest_update_params
      expect(response).to have_http_status(:forbidden)
    end
  end

  describe '#destroy' do
    it 'レスポンスに成功すること' do
      delete path, headers: api_and_user_auth
      expect(response).to have_http_status(:ok)
    end

    it 'userを削除できること' do
      delete path, headers: api_and_user_auth
      expect(User.count).to eq 0
    end

    it 'ユーザートークンがないとき:not_foundを返すこと' do
      delete path, headers: api_auth, params: update_params
      expect(response).to have_http_status(:not_found)
    end

    it 'APIトークンがないとき:unauthorizedを返すこと' do
      delete path, headers: user_auth, params: update_params
      expect(response).to have_http_status(:unauthorized)
    end

    it 'ゲストユーザーは削除できず:forbiddenを返すこと' do
      delete path, headers: api_and_guest_auth
      expect(response).to have_http_status(:forbidden)
      expect(User.find(guest_user.id)).to be_present
    end
  end
end
