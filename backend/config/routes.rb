Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :list, only: %i[index show create]
      resources :theme, only: %i[index show create]
      get :health_check, to: 'health_check#index'
    end
  end
end
