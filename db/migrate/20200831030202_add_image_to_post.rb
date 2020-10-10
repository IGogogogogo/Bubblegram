class AddImageToPost < ActiveRecord::Migration[6.0]
  def change
    add_column :posts, :image, :string
    add_index :posts, :user_id
  end
end
