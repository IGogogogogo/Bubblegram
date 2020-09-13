Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'pages#index'
  resources :pages, only: [:index] do
    collection do
      get :welcome
    end
  end

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  resources :users, only: [:show, :edit, :update] do
    resource :follows, only: [:create, :destroy]

    resources :posts, shallow: true do
      resources :comments, only: [:create]
      collection do
        get :load_posts
      end
    end

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

end
