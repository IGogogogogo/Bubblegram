class CreateRooms < ActiveRecord::Migration[6.0]
  def change
    create_table :rooms do |t|
      t.string :name
      t.string :vonage_session_ID

      t.timestamps
    end
  end
end
