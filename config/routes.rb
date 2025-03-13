Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  resources :games, only: :show, param: :slug do
    scope module: :games do
      resources :quiz_items, path: :items, only: %i[ show ]
    end
  end
end
