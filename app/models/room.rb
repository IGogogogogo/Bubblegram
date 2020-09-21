class Room < ApplicationRecord
  before_create do
    opentok = OpenTok::OpenTok.new(ENV['vonage_api_key'], ENV['vonage_secret'])
    session = opentok.create_session archive_mode: :always, media_mode: :routed
    self.vonage_session_id = session.session_id
  end

  belongs_to :user
end
