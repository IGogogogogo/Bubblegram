class User < ApplicationRecord
  validates :nick_name, presence: true
  validates :email, presence: true

  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable, :trackable

  mount_uploader :avatar, AvatarUploader

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :followingships, foreign_key: :following_id, class_name: "Follow", dependent: :destroy
  has_many :fans, through: :followingships, source: :fan
  has_many :fanships, foreign_key: :fan_id, class_name: "Follow", dependent: :destroy
  has_many :followings, through: :fanships, source: :following


  def already_followed?(current_user)                  #檢查自己是否已經追蹤對方
    self.fans.include?(current_user)
  end
end
