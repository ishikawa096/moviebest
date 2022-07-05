Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :list, only: %i[index]
      get :health_check, to: 'health_check#index'
    end
  end
end