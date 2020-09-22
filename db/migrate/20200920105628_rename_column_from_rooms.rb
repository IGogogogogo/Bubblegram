class RenameColumnFromRooms < ActiveRecord::Migration[6.0]
  def change
    rename_column(:rooms, :vonage_session_ID, :vonage_session_id) 
  end
end
