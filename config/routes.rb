Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'pages#index'

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :users, only: %i[show edit update] do
    resource :follows, only: %i[create destroy]
    member do
      get :fans
      get :followings
    end
    # 產生show create destory 與 play 路徑
    resources :rooms, only: %i[show create destroy] do
      member do
        get :play
      end
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

  resources :chats, only: %i[index show create destroy] do
    resources :messages, only: [:create]
  end
end
