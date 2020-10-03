class AddSlugToChats < ActiveRecord::Migration[6.0]
  def change
    add_column :chats, :slug, :string
    add_index :chats, :slug, unique: true
  end
end
