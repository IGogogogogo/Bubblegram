class Identity < ApplicationRecord
  validates :uid, presence: true
  validates :provider, presence: true
  validates :uid, uniqueness: { scope: :provider, message: "Can't sign up same account again!" }

  belongs_to :user

  def self.find_for_oauth(auth)
    find_or_create_by(uid: auth.uid, provider: auth.provider)
  end
end
