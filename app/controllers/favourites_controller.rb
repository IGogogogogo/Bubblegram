class FavouritesController < ApplicationController
before_action :find_post, only: [:create, :destroy]


def create
  current_user.favourites_posts << @post
end

def destroy
  current_user.favourites_posts.destroy(@post)
end


private

def find_post
  @post = Post.find(params[:post_id])
end

end
