Rails.application.routes.draw do
  get 'sessions/new'

  root to: 'links#index'

  resources :users, only: [:new, :create, :show]
  resources :links, only: [:index]

  get     '/login',   to: 'sessions#new'
  post    '/login',   to: 'sessions#create'
  delete  '/logout',  to: 'sessions#destroy'

  namespace :api do
    namespace :v1 do
      resources :links
    end
  end
end
