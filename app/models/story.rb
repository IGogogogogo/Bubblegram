class Story < ApplicationRecord
  mount_uploader :picture, PictureUploader
  # carrierwave 上傳功能
  validates :picture, presence: true
  # 資料驗證，picture欄位不得為空

  belongs_to :user
  default_scope { where("created_at >= ?", Time.zone.now - 1.day) } # 找24hr的story
end
