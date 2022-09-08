require 'rails_helper'

RSpec.describe 'Api::V1::Auth::Passwords', type: :request do
  subject { JSON.parse(response.body) }

  let(:api_auth) { { Authorization: "Bearer #{ENV.fetch('BACKEND_API_KEY', nil)}" } }
  let(:user_auth) { sign_in(user) }
  let(:guest_auth) { sign_in(guest_user) }
  let(:api_and_user_auth) { api_auth.merge(user_auth) }
  let(:api_and_guest_auth) { api_auth.merge(guest_auth) }
  let(:user) { create(:user) }
  let(:guest_user) { create(:guest_user) }
  let(:path) { api_v1_user_password_path }

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

    it 'ユーザートークンがないとき:unauthorizedを返すこと' do
      put path, headers: api_auth, params: update_params
      expect(response).to have_http_status(:unauthorized)
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
end
