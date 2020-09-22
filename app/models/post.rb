class Post < ApplicationRecord
  mount_uploaders :images, ImageUploader
  has_rich_text :body
  validates :content, presence: true
  validates :images, presence: true

  belongs_to :user, counter_cache: true
  has_many :comments, dependent: :destroy
  #貼文標籤
  has_many :user_tags, foreign_key: :post_id, dependent: :destroy
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
  # 不會把自己算進去

  def post_owner?(current_user)
    self.user == current_user
  end

end
