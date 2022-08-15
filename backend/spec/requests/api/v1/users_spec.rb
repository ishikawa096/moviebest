require 'rails_helper'

RSpec.describe 'Api::V1::Users', type: :request do
  subject { JSON.parse(response.body) }

  let(:api_auth) { { Authorization: "Bearer #{ENV.fetch('BACKEND_API_KEY', nil)}" } }

  describe '#show' do
    before do
      create(:user, id: 1)
    end

    it 'レスポンスに成功すること' do
      get api_v1_user_path(1), headers: api_auth
      expect(response).to have_http_status(:ok)
    end

    it 'クエリのidを持つuserだけ含むこと' do
      create(:user, id: 2)
      get api_v1_user_path(1), headers: api_auth
      expect(subject['id']).to eq 1
    end

    it '返したjsonに関連モデルを含むこと' do
      user = create(:user, :with_association, id: 2)
      get api_v1_user_path(2), headers: api_auth
      expect(subject['id']).to eq user.id
      expect(subject['lists'][0]['id']).to eq user.lists.first.id
      expect(subject['lists'][0]['theme']['id']).to eq user.lists.first.theme_id
      subject['lists'][0]['movies'].all? do |movie|
        expect(movie['list_id']).to eq user.lists.first.id
      end
    end

    it 'APIトークンがないとき:unauthorizedを返すこと' do
      get api_v1_user_path(1)
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
