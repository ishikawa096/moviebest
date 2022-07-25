require 'rails_helper'

RSpec.describe 'Api::V1::Lists', type: :request do
  let(:header) { { Authorization: "Bearer #{ENV.fetch('BACKEND_API_KEY', nil)}" } }

  before do
    create(:list, :with_movies)
    get api_v1_lists_path, headers: header
  end

  it 'レスポンスに成功する' do
    expect(response).to have_http_status(:ok)
  end
end
