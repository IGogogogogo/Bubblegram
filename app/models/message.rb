class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chat

  mount_uploader :image, ImageUploader
end
