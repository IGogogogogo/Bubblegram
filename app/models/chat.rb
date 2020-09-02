class Chat < ApplicationRecord
    validates :sender_id, uniqueness: { scope: :recipient_id }

    has_many :messages, dependent: :destroy

    belongs_to :sender, foreign_key: :sender_id, class_name: 'User'
    belongs_to :recipient, foreign_key: :recipient_id, class_name: 'User'
end
