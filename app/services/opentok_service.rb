class OpenTokService
  def initialize
    @opentok = OpenTok::OpenTok.new(ENV['vonage_api_key'], ENV['vonage_secret'])
  end

  def generate_token(vonage_session_id)
    @token ||= @opentok.generate_token(vonage_session_id)
  end
end
