class Post < ApplicationRecord
  extend FriendlyId
  friendly_id :post_firendly_params, use: :slugged #使用friendly_id 替換 post id

  mount_uploaders :images, ImageUploader
  # has_rich_text :body
  # validates :content, presence: true
  validates :images, presence: true
  validate :limit_images_count         #限制貼文圖片最多5張

  belongs_to :user, counter_cache: true
  has_many :comments, dependent: :destroy
  #貼文標籤
  has_many :user_tags, foreign_key: :post_id, dependent: :destroy, inverse_of: :post  #inverse_of 即時更新關聯物件的狀態
  has_many :taged_users, through: :user_tags, source: :user


  has_many :favourites, dependent: :destroy
  has_many :thumbs_up_users, through: :favourites, source: :user

  scope :my_following_users, -> (followings) { where user_id: followings}  #找出所有追蹤中的使用者
  scope :viewable_posts, -> (users) { where(user_id: users) }   #自己可以看到誰的貼文

  def has_comment?
    comments_count > 0
  end

  def favorited_by?(user)
    thumbs_up_users.include?(user)
  end

  private

  def limit_images_count
    # LIMIT_COUNT = 5
    if self.images.count > 5
      errors.add(:base, "Can't upload more than 5 images")
    end
  end

  def post_firendly_params
    Digest::SHA1.hexdigest([Time.now, rand].join).to_i(base=16)%10**20
  end
end
