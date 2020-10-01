class Room < ApplicationRecord
  extend FriendlyId
  friendly_id :friendly_params, use: :slugged        #使用friendly_id 替換 routes 顯示的 id

  before_create do
    opentok = OpenTok::OpenTok.new(ENV['vonage_api_key'], ENV['vonage_secret'])
    session = opentok.create_session archive_mode: :always, media_mode: :routed
    self.vonage_session_id = session.session_id
  end

  belongs_to :user
end
