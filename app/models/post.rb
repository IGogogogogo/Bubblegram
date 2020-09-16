class Post < ApplicationRecord
  mount_uploader :image, ImageUploader
  has_rich_text :body
  validates :body, :image, presence: true

  belongs_to :user, counter_cache: true
  has_many :comments, dependent: :destroy

  has_many :favourites
  has_many :thumbs_up_users, through: :favourites, source: :user

  scope :my_following_users, -> (followings) { where user_id: followings}  #找出所有追蹤中的使用者
  scope :viewable_posts, -> (users) { where(user_id: users) }


  def favorited_by?(user)
    thumbs_up_users.include?(user)
  end
  # 不會把自己算進去


end
