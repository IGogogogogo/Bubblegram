class RoomsController < ApplicationController
  # 直播間的rooms
  before_action :find_room, only: %i[show play destroy]
  def show
  
  end

  def create
    @room = Room.create
    redirect to play_room_path(@room)
  end

  def play
   
  end

  def destory
  
  end

  private

  def find_room
    @room = Room.find(params[:id])
  end

  def room_params
    params.require(:room).permit
  end
end
