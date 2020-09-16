class Post < ApplicationRecord
  mount_uploader :image, ImageUploader
  has_rich_text :body
  validates :body, :image, presence: true

  belongs_to :user, counter_cache: true
  has_many :comments, dependent: :destroy

  scope :my_following_users, -> (followings) { where user_id: followings}  #找出所有追蹤中的使用者


  def comments_more_than_zero
    self.comments.count > 0
  end
  scope :viewable_posts, -> (users) { where(user_id: users) }
end
