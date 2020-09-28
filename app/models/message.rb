class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chatroom, polymorphic: true

  mount_uploader :image, ImageUploader
end
