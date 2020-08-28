Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'pages#index'

  devise_for :users
  resources :users, only: [:show]

  resources :posts do 
    resources :comments, only: [:create]
  end
end
