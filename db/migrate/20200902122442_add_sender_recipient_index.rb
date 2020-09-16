class AddSenderRecipientIndex < ActiveRecord::Migration[6.0]
  def change
    add_index :chats, [:recipient_id, :sender_id], unique: true
  end
end
