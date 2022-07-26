require 'rails_helper'

RSpec.describe 'Api::V1::Themes', type: :request do
  let(:header) { { Authorization: "Bearer #{ENV.fetch('BACKEND_API_KEY', nil)}" } }

  before do
    create(:theme)
    get api_v1_themes_path, headers: header
  end

  it 'レスポンスに成功する' do
    expect(response).to have_http_status(:ok)
  end
end
