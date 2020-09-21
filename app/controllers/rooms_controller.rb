class RoomsController < ApplicationController
  # 直播間的rooms
  before_action :find_room, only: %i[show play destroy]

  def show
    opentok = OpenTok::OpenTok.new(ENV['vonage_api_key'], ENV['vonage_secret'])
    @token ||= opentok.generate_token(@room.vonage_session_id)
  end

  def create
    current_user.room.destroy if current_user.room.present?

    @room = current_user.create_room(name: current_user.nick_name)
    redirect_to play_room_path(@room)
  end

  def play
    # 先判斷目前使用者是否為直播房間創建者
    if current_user = @room.user
      opentok = OpenTok::OpenTok.new(ENV['vonage_api_key'], ENV['vonage_secret'])
      @token ||= opentok.generate_token(@room.vonage_session_id)
    else
      redirect_to root_path
    end
  end

  def destroy
    @room.destroy
    redirect_to root_path
  end

  private

  def find_room
    @room = Room.find(params[:id])
  end
end
