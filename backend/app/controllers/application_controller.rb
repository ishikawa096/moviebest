class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::HttpAuthentication::Token::ControllerMethods

  before_action :authenticate

  private

  def authenticate
    authenticate_or_request_with_http_token do |token, _option|
      token == ENV['BACKEND_API_KEY']
    end
  end

  def ensure_not_guest_user
    if current_api_v1_user && current_api_v1_user.email == 'guest@example.com'
      render status: :forbidden
    end
  end
end
