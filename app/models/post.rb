class Post < ApplicationRecord
  has_rich_text :body
  validates :title, :body, presence: true

  belongs_to :user, counter_cache: true
  has_many :comments
end
