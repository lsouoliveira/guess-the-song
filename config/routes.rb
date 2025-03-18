Rails.application.routes.draw do
  root "albums#index"

  get "up" => "rails/health#show", as: :rails_health_check

  resources :games, only: :show, param: :slug do
    scope module: :games do
      resources :quiz_items, path: :items, only: %i[ show ] do
        scope module: :quiz_items do
          resource :play, only: :create
          resource :guess, only: :create
          resource :increment, only: :create
        end
      end
    end
  end

  resources :albums, only: %i[ index show ] do
    scope module: :albums do
      resources :games, only: :create
    end
  end
end
