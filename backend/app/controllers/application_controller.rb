class ApplicationController < ActionController::API
  include ActionController::Helpers
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::RequestForgeryProtection
  include ActionController::HttpAuthentication::Token::ControllerMethods

  # skip_before_action :verify_authenticity_token
  # protect_from_forgery with: :exception
  helper_method :current_user, :user_signed_in?
  before_action :authenticate

  private

  def authenticate
    authenticate_or_request_with_http_token do |token, _option|
      token == ENV['BACKEND_API_KEY']
    end
  end
end
