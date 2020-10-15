Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'pages#index'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :users, only: [:show, :edit, :update] do
    resource :follows, only: [:create, :destroy]
    resources :stories, only: [:index, :new, :create, :destroy ]

    resources :posts, shallow: true do
      member do
        post :favourite
      end

      resources :comments, only: [:create]
    end

    collection do
      get :guest
      get :load_posts, to: 'posts#load_posts'     #用在載入新貼文 page index & posts index
      get :load_img, to: 'posts#load_img'         #用在載入新貼文 user show
    end

    member do
      # get :fans
      # get :followings
      get :follow
    end
  end

  get :stories, to: 'stories#load_stories'
  get :load_rand_img, to: 'posts#load_rand_img'  #用在載入新貼文 search index

  resources :messages, only: [:create] do
    collection do
      post :heart
    end
  end

  # 產生show create destory 與 play 路徑
  resources :rooms, only: [:show, :destory, :create, :destroy] do
    member do
      get :play
      post :destroy_room
    end
  end
  resources :searches, only: [:index] do
    collection do
      get :search
      get :search_fans
      get :search_followings
    end
  end

  resources :chats, only: [:index, :show, :create, :destroy] do
    resources :messages, only: [:create]
  end
end
