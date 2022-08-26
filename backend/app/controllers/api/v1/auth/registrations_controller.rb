class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :check_guest_user, only: %i[update destroy]

  private

  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :name)
  end

  def account_update_params
    params.permit(:name, :email, :current_password, :password, :password_confirmation)
  end

  def check_guest_user
    if current_api_v1_user && current_api_v1_user.email == 'guest@example.com'
      render status: :unauthorized
    end
  end
end
