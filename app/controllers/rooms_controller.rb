class RoomsController < ApplicationController
  # 直播間的rooms
  before_action :find_room, only: %i[show play destroy]
  def index
    @rooms = Room.all
  end

  def show
    opentok = OpenTok::OpenTok.new(ENV['vonage_api_key'], ENV['vonage_secret'])
    @token ||= opentok.generate_token(@room.vonage_session_ID)
  end

  def create
    @room = current_user.rooms.create(name: current_user.nick_name)
    redirect_to play_room_path(@room)
  end

  def play
    opentok = OpenTok::OpenTok.new(ENV['vonage_api_key'], ENV['vonage_secret'])
    @token ||= opentok.generate_token(@room.vonage_session_ID)
  end

  def destory
    # do something
  end

  private

  def find_room
    @room = Room.find(params[:id])
  end
end
