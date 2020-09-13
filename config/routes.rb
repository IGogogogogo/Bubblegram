Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'pages#index'

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  resources :users, only: [:show, :edit, :update] do
    resource :follows, only: [:create, :destroy]
    resources :stories, only: [:index, :show, :new, :create, :destroy ]

    member do
      get :fans
      get :followings
    end
  end

  resources :searches, only: [:index] do
    collection do
      get :search
    end
  end

  resources :posts do
    resources :comments, only: [:create]
  end

  resources :chats, only: [:index, :show, :create, :destroy] do
    resources :messages, only: [:create]
  end
end
