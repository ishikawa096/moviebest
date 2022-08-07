require 'rails_helper'

RSpec.describe 'Api::V1::HealthChecks', type: :request do
  describe '#index' do
    it 'レスポンスに成功すること' do
      get api_v1_health_checks_path
      expect(response).to have_http_status(:ok)
    end
  end
end
