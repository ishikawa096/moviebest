Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  namespace :api do
    namespace :v1 do
      get :health_checks, to: 'health_checks#index'
      resources :lists, only: %i[index show create update destroy]
      resources :themes, only: %i[index show create] do
        get :popular, on: :collection
      end
      resources :tmdb, only: [] do
        get :search, on: :collection
        get :images, on: :collection
      end
      resources :users, only: %i[show]
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }
      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end
