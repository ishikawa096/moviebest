class ApplicationController < ActionController::API
  include ActionController::Helpers
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::RequestForgeryProtection

  # skip_before_action :verify_authenticity_token
  # protect_from_forgery with: :exception
  helper_method :current_user, :user_signed_in?
  # before_action :underscore_params!

  # private

  # def underscore_params!
  #   params.deep_transform_keys!(&:underscore)
  # end
end
