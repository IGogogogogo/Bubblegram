class ChangeMessageToPolymorphic < ActiveRecord::Migration[6.0]
  def change
    add_reference :messages, :chatroom, polymorphic: true
    remove_reference :messages, :chat, index: true, foreign_key: true
  end
end
