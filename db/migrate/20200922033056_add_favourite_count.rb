class AddFavouriteCount < ActiveRecord::Migration[6.0]
  def change
    add_column :posts, :favourites_count, :integer, default: 0
  end
end
