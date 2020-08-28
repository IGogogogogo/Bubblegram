class Follow < ApplicationRecord
  belongs_to :fan, foreign_key: "fan_id", class_name: "User"
  belongs_to :following, foreign_key: "following_id", class_name: "User"
end
