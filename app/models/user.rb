class User < ApplicationRecord
  validates :nick_name, presence: true
  validates :email, uniqueness: true

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable,
         :omniauthable, omniauth_providers: %i[facebook google_oauth2]

  mount_uploader :avatar, AvatarUploader      #carrierwave
  after_create :add_blank_avatar              #預設使用者大頭照
  after_create :add_defult_following          #預設追蹤官方帳號
  after_create :send_welcome_message          #傳送歡迎訊息

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :identities, dependent: :destroy
  #追蹤關聯
  has_many :followingships, foreign_key: :following_id, class_name: "Follow", dependent: :destroy
  has_many :fans, through: :followingships, source: :fan
  has_many :fanships, foreign_key: :fan_id, class_name: 'Follow', dependent: :destroy
  has_many :followings, through: :fanships, source: :following
  #貼文標籤
  has_many :user_tags, foreign_key: :user_id, dependent: :destroy
  has_many :taged_posts, through: :user_tags, source: :post
  #限時動態
  has_many :stories, dependent: :destroy
  #建立使用者與對話關聯
  has_many :sender_chats, foreign_key: :sender_id, class_name: 'Chat'
  has_many :recipient_chats, foreign_key: :recipient_id, class_name: 'Chat'
  has_many :messages, dependent: :destroy

  has_many :favourites
  has_many :favourites_posts, through: :favourites, source: :post

  scope :not_self, -> (current_user){ where.not(id: current_user.id) }
  #搜尋有關鍵字的user
  scope :with_keyword, -> (keyword){ where(["nick_name LIKE ? OR email LIKE ?", "%#{keyword}%", "%#{keyword}%"]) }
  #自己和自己追蹤的人
  scope :viewable_users, -> (current_user){ where(id: current_user.followings).or(User.where(id: current_user)) }

  # 建立user與直播房的關聯
  has_one :room, dependent: :destroy

  def already_followed?(current_user) # 檢查自己是否已經追蹤對方
    fans.include?(current_user)
  end

  def toggle_favorite_post(post)
    if favourites_posts.include?(post)
      favourites_posts.destroy(post)
    else
      favourites_posts << post
    end
  end

  def self.from_omniauth(auth, signed_in_resource = nil)
    # 1. 搜尋用 google, fb 登入過的 user (identity 紀錄的 user)
    identity = Identity.find_for_oauth(auth)
    user = signed_in_resource || identity.user

    # 2. 搜尋 google, fb 的信箱是否註冊過
    user = User.where(email: auth.info.email).first if user.nil?

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

    user
  end

  def exist_story?
    self.stories.present?
  end

  def exist_room?
    self.room.present?
  end

  #判斷使用者是否上線
  def is_online?
    Redis.new.get("user_#{self.id}_online").present?
  end

  private

  def add_blank_avatar              #預設使用者大頭照
    image_path = "./public/blank_avatar.png"
    self.avatar = File.open(image_path)
    self.save!
  end

  def add_defult_following          #預設追蹤官方帳號
    if self != User.first
      self.followings << User.first
    end
  end

  def send_welcome_message          #傳送歡迎訊息
    office_account = User.first
    message_content =
    %Q[歡迎加入Bubblegram，貼心小提醒：
      1.記得更換大頭貼，讓朋友找得到你！
      2.也別忘了去找找朋友，與他們分享你的喜悅！]
    # %Q 內的文字換行會自動變成\n , %Q跟%q的差別是雙引號或單引號

    if self != office_account
      chat = Chat.create(sender_id: office_account.id, recipient_id: self.id)
      chat.messages.create(user: office_account, content: message_content)
    end
  end
end
