Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'pages#index'

  resources :pages, only: [:index] do
    collection do
      get :search
    end
  end

  devise_for :users
  resources :users, only: [:show, :edit, :update] do
    resource :follows, only: [:create, :destroy]

    member do
      get :fans
      get :followings
    end
  end

  resources :posts do
    resources :comments, only: [:create]
  end
end
