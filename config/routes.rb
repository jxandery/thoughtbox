Rails.application.routes.draw do
  get 'sessions/new'

  resources :users, only: [:new, :create, :show]
  resources :links, only: [:index]

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
