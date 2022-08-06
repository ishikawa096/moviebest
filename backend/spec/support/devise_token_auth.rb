module DeviseTokenAuth
  def sign_in(user)
    post api_v1_user_session_path,
         headers: { Authorization: "Bearer #{ENV.fetch('BACKEND_API_KEY', nil)}" },
         params: { email: user.email, password: user.password },
         as: :json
    response.headers.slice('client', 'access-token', 'uid')
  end
end
