Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  namespace :api do
    namespace :v1 do
      resources :lists, only: %i[index show create]
      resources :themes, only: %i[index show create]
      get :health_checks, to: 'health_checks#index'
      end
    end
  end
end
