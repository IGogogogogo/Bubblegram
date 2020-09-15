class Post < ApplicationRecord
  mount_uploader :image, ImageUploader
  has_rich_text :body
  validates :content, presence: true
  validates :image, presence: true

  belongs_to :user, counter_cache: true
  has_many :comments, dependent: :destroy
  #貼文標籤
  has_many :user_tags, foreign_key: :post_id, dependent: :destroy
  has_many :taged_users, through: :user_tags, source: :user

  scope :viewable_posts, -> (users) { where(user_id: users) }    #自己可以看到誰的貼文
end
