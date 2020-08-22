class Post < ApplicationRecord
  has_rich_text :body
  validates :title, :body, presence: true
end
