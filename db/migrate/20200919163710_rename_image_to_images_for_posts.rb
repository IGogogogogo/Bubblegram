class RenameImageToImagesForPosts < ActiveRecord::Migration[6.0]
  def change
    remove_column :posts, :image, :string
    add_column  :posts, :images, :json
  end
end
