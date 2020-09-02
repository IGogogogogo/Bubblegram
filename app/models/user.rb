class User < ApplicationRecord
  validates :nick_name, presence: true
  validates :email, presence: true

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable,
         :omniauthable, omniauth_providers: [:facebook, :google_oauth2]

  has_many :posts
  has_many :comments
  has_many :followingships, foreign_key: :following_id, class_name: "Follow", dependent: :destroy
  has_many :fans, through: :followingships, source: :fan
  has_many :fanships, foreign_key: :fan_id, class_name: "Follow", dependent: :destroy
	has_many :followings, through: :fanships, source: :following
end
