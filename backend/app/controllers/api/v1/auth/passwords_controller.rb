class Api::V1::Auth::PasswordsController < DeviseTokenAuth::PasswordsController
  before_action :ensure_not_guest_user, only: %i[update]
end
