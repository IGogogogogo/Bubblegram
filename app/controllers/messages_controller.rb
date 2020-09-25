class MessagesController < ApplicationController
  def create
    chat_room = Chat.find(params[:chat_id])
    @message = chat_room.messages.create(params_message)
    opposed_user = chat_room.opposed_user(current_user).id

    SendMessageJob.perform_later(@message, new_message_counts)

    if !redis.get("user_#{opposed_user}_online").present?
      redis.rpush("#{@message.chat_id}_#{@message.user_id}_new_message", @message.to_json)
    end

    if !redis.get("user_#{opposed_user}_unreadMessage").present? && redis.get("user_#{opposed_user}_online").present?
      redis.rpush("#{@message.chat_id}_#{@message.user_id}_new_message", @message.to_json)
    end
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
