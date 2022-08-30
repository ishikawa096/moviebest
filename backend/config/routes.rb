Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get :health_checks, to: 'health_checks#index'
      get '/tmdb/search', to: 'tmdb#search'
      resources :lists, only: %i[index show create update destroy]
      resources :themes, only: %i[index show create]
      resources :users, only: %i[show]
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
        passwords: 'api/v1/auth/passwords',
      }
      namespace :auth do
        devise_scope :api_v1_user do
          get :sessions, to: 'sessions#index'
          post :guest_sign_in, to: 'sessions#guest_sign_in'
        end
      end
    end
  end
end
