class MessagesController < ApplicationController
  def create
    chat_room = Chat.find(params[:chat_id])
    @message = chat_room.messages.create(params_message)

    SendMessageJob.perform_later(@message, new_message_counts)
    # @message.save
    # redirect_to chat_path(chat_room)
  end

private
  def params_message
    params.require(:message).permit(:content, :image).merge(user: current_user)
  end

  def new_message_counts
    redis.lrange("#{@message.chat_id}_#{@message.user_id}_new_message",0,-1).length
  end

  def redis
    @redis =  Redis.new unless @redis
    @redis
  end

end
