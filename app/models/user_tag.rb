class UserTag < ApplicationRecord
  validates :user_id, uniqueness: { scope: :post_id, message: "Can't tag same user" }

  belongs_to :user
  belongs_to :post
end
