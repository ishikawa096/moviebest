class Api::V1::Auth::PasswordsController < DeviseTokenAuth::PasswordsController
  before_action :check_guest_user, only: %i[update]

  private

  def check_guest_user
    if current_api_v1_user && current_api_v1_user.email == 'guest@example.com'
      render status: :unauthorized
    end
  end
end
