class Chat < ApplicationRecord
  validates :sender_id, uniqueness: { scope: :recipient_id }

  has_many :messages, dependent: :destroy

  belongs_to :sender, foreign_key: :sender_id, class_name: 'User'
  belongs_to :recipient, foreign_key: :recipient_id, class_name: 'User'

  scope :between, ->(sender_id, recipient_id){
    where(sender_id: sender_id, recipient_id: recipient_id).or(where(sender_id: recipient_id, recipient_id: sender_id))
  }

  def self.get(sender_id, recipient_id)
    chat = between(sender_id, recipient_id).first
    return chat if chat.present?

    create(sender_id: sender_id, recipient_id: recipient_id)
  end

end
