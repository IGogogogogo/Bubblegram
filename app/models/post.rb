class Post < ApplicationRecord
  mount_uploader :image, ImageUploader
  has_rich_text :body
  validates :body, :image, presence: true

  belongs_to :user
  has_many :comments
end
