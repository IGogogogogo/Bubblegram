class User < ApplicationRecord
  validates :nick_name, presence: true
  validates :email, uniqueness: true

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable,
         :omniauthable, omniauth_providers: [:facebook, :google_oauth2]

  mount_uploader :avatar, AvatarUploader      #carrierwave

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :identities, dependent: :destroy
  has_many :followingships, foreign_key: :following_id, class_name: "Follow", dependent: :destroy
  has_many :fans, through: :followingships, source: :fan
  has_many :fanships, foreign_key: :fan_id, class_name: "Follow", dependent: :destroy
  has_many :followings, through: :fanships, source: :following

  scope :not_self, -> (current_user){ where.not(id: current_user.id) }
  scope :find_by_keyword, -> (keyword){ where(["nick_name LIKE ? OR email LIKE ?", "%#{keyword}%", "%#{keyword}%"]) }

  def already_followed?(current_user)                  #檢查自己是否已經追蹤對方
    self.fans.include?(current_user)
  end

  def self.from_omniauth(auth, signed_in_resource = nil)
    # 1. 搜尋用 google, fb 登入過的 user (identity 紀錄的 user)
    identity = Identity.find_for_oauth(auth)
    user = signed_in_resource ? signed_in_resource : identity.user

    # 2. 搜尋 google, fb 的信箱是否註冊過
    if user.nil?
      user = User.where(email: auth.info.email).first
    end

    # 3. 建立新 user
    if user.nil?
      user = User.new(
        nick_name: auth.info.email.split('@')[0].capitalize,
        email: auth.info.email,
        remote_avatar_url: auth.info.image,
        password: Devise.friendly_token[0,20]
      )
      user.save!
    end

    if identity.user != user
      identity.user = user
      identity.save!
    end

    return user
  end
end
