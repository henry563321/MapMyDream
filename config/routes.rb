Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :create]
    resource :session, only: [:create, :destroy]
    resources :routes, only: [:index, :create, :show, :destroy]
    resources :friends, only: [:update, :index, :create, :destroy]
    resources :comments, only: [:index, :create, :destroy]

  end

  root 'static_pages#root'
end
