class AddCommentCountColumnToPost < ActiveRecord::Migration[6.0]
  def change
    add_column :posts, :comments_count, :integer, default: 0
  end
end
