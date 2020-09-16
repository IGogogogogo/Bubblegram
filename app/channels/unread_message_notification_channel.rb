class UnreadMessageNotificationChannel < ApplicationCable::Channel
  def subscribed
    stream_from "unread_message_notification_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def new_message(data)

  end

end
