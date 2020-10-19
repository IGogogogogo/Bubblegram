class User < ApplicationRecord
  extend FriendlyId
  friendly_id :nick_name, use: :slugged #使用friendly_id 替換 params

  validates :nick_name, presence: true, uniqueness: { case_sensitive: false }   #大小寫視為同一種
  validates :email, uniqueness: true
  validate :nick_name_format     #驗證 nick_name 格式只有中英文底線 12字以內

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable,
         :omniauthable, omniauth_providers: %i[facebook google_oauth2]

  mount_uploader :avatar, AvatarUploader      #carrierwave
  before_create :add_defult_following          #預設追蹤官方帳號
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

  def avatar_url
    avatar.url ? avatar.url : "/blank_avatar.png"
  end

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

  #第三方登入
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

  def normalize_friendly_id(input) #把英文數字轉為utf-8
    input.to_s.to_slug.normalize.to_s
  end

  def should_generate_new_friendly_id?
    slug.blank? || nick_name_changed? # slug 為 nil 或 nick_name column 變更時更新
  end

  private


  def add_defult_following          #新使用者會追蹤官方帳號和預設使用者
    default_users = ["Bubblegram", "Yuan_yu", "泇吟", "Jerry19920702", "gavin0723", "will_magic"]
    self.followings = User.where(slug: default_users.map(&:downcase))
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

  def nick_name_format
    if !self.nick_name.match?(/\A[\w\u4E00-\u9FFF]{1,12}\z/)
      #正規表達式, \A\z代表字串開頭結尾, []是字串要符合的格式, \w 是英文大小寫+數字+底線, \u4E00-\u9FFF是中文 UTF-8 代號, {1,12}代表1到12字
      errors.add(:nick_name, "暱稱只能填入12字以內中文或英數字")
    end
  end
end
