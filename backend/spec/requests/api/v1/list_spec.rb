require 'rails_helper'

RSpec.describe 'Api::V1::Lists', type: :request do
  let!(:list) { create(:list) }

  before do
    get api_v1_list_index_path
  end

  it 'レスポンスに成功する' do
    expect(response).to have_http_status(:ok)
  end
end
