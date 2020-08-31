class AddCounterToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :posts_count, :integer, default: 0
    add_column :users, :fans_count, :integer, default: 0
    add_column :users, :followings_count, :integer, default: 0
    add_column :users, :collections_count, :integer, default: 0
  end
end
