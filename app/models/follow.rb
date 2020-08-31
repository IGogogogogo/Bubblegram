class Follow < ApplicationRecord
  validate :do_not_follow_self
  validates :following_id, uniqueness: { scope: :fan_id, message: "Can't follow again" }

  belongs_to :fan, foreign_key: "fan_id", class_name: "User", counter_cache: :followings_count
  belongs_to :following, foreign_key: "following_id", class_name: "User", counter_cache: :fans_count

  private

  def do_not_follow_self
    if self.fan_id == self.following_id
      errors.add(:following, "Can't follow self")
    end
  end
end
