Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'pages#index'
  get '/rooms', to: 'rooms#index'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :users, only: [:show, :edit, :update] do
    resource :follows, only: [:create, :destroy]
    member do
      get :fans
      get :followings
    end
    # 產生show create destory 與 play 路徑
    resources :rooms, only: [:create]
  end

  resources :rooms, only: [:show, :destory] do
    member do
      get :play
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
