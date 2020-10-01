class DropCollections < ActiveRecord::Migration[6.0]
  def change
    drop_table :collections
  end
end
