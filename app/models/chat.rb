class Chat < ApplicationRecord
  validates :sender_id, uniqueness: { scope: :recipient_id }

  has_many :messages, dependent: :destroy

  belongs_to :sender, foreign_key: :sender_id, class_name: 'User'
  belongs_to :recipient, foreign_key: :recipient_id, class_name: 'User'

  scope :between, ->(sender_id, recipient_id){ #找尋是哪一個聊天室
    where(sender_id: sender_id, recipient_id: recipient_id).or(where(sender_id: recipient_id, recipient_id: sender_id))
  }

  def self.get(sender_id, recipient_id) #找尋聊天室，如果有找到回傳 ，沒有新增一個聊天室
    chat = between(sender_id, recipient_id).first
    return chat if chat.present?

    create(sender_id: sender_id, recipient_id: recipient_id)
  end

  def opposed_user(user)  #以current_user角度找到對方
    if user == recipient
      sender
    else
      recipient
    end
  end

  def any_unread_messages?(user) #有無任何新訊息
    Redis.new.lrange("#{self.id}_#{self.opposed_user(user).id}_new_message",0,-1).present?
  end

  def unread_messages(user)#有幾則新訊息
    Redis.new.lrange("#{self.id}_#{self.opposed_user(user).id}_new_message",0,-1).length
  end

end
