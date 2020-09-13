class Post < ApplicationRecord
  mount_uploader :image, ImageUploader
  has_rich_text :body
  validates :body, :image, presence: true

  belongs_to :user, counter_cache: true
  has_many :comments, dependent: :destroy

  scope :viewable_posts, -> (users) { where(user_id: users) }
end
