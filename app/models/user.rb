class User < ApplicationRecord
  validates :nick_name, presence: true
  validates :email, presence: true

  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable, :trackable

  has_many :posts
  has_many :comments
  has_many :followingships, foreign_key: :following_id, class_name: "Follow", dependent: :destroy
  has_many :fans, through: :followingships, source: :fan
  has_many :fanships, foreign_key: :fan_id, class_name: "Follow", dependent: :destroy
  has_many :followings, through: :fanships, source: :following
  has_many :sender_chats, foreign_key: :sender_id, class_name: 'Chat'
  has_many :recipient_chats, foreign_key: :recipient_id, class_name: 'Chat'
  has_many :messages
end
