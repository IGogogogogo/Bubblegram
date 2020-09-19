class Post < ApplicationRecord
  mount_uploader :image, ImageUploader
  has_rich_text :body
  validates :body, :image, presence: true

  belongs_to :user, counter_cache: true
  has_many :comments, dependent: :destroy

  scope :my_following_users, -> (followings) { where user_id: followings}  #找出所有追蹤中的使用者
  has_many :favourites
  has_many :thumbs_up_users, through: :favourites, source: :user

  scope :viewable_posts, -> (users) { where(user_id: users) }

  def has_comment?
    comments_count > 0
  end

  def favorited_by?(user)
    thumbs_up_users.include?(user)
  end
  # 不會把自己算進去

  def delete_post(user)
    self.user != user
  end

end
