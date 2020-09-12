class Story < ApplicationRecord
  mount_uploader :picture, PictureUploader
  # carrierwave 上傳功能
  validate :picture, presence: true
  # 資料驗證，picture欄位不得為空

  belongs_to :user
  # socpe viewable_stories -> (users){ where(user_id: users) }
end
