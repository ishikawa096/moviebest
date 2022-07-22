require 'rails_helper'

RSpec.describe 'Api::V1::Lists', type: :request do
  before do
    create(:list, :with_movies)
    get api_v1_lists_path
  end

  it 'レスポンスに成功する' do
    expect(response).to have_http_status(:ok)
  end
end
