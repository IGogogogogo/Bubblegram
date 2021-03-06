class SendMessageJob < ApplicationJob
  queue_as :default

  def perform(message, new_message_counts, opposed_user)
    # Do something later
    my_message = ApplicationController.render(
      partial: "messages/my_message",
      locals: {message: message}
    )

    other_message = ApplicationController.render(
      partial: "messages/other_message",
      locals: {message: message}
    )
    my_image = ApplicationController.render(
      partial: "messages/my_image",
      locals: {message: message}
    )
    other_image = ApplicationController.render(
      partial: "messages/other_image",
      locals: {message: message}
    )


    ActionCable.server.broadcast(         #aciton cable 提供的方法 可以第二個參數的資料 廣播到第一個參數特定的頻道
      "chat_channel_#{message.chatroom_id}",
      { my_message: my_message,
        other_message: other_message,
        my_image: my_image,
        other_image: other_image,
        message: message
      }
    )
    ActionCable.server.broadcast(
      "unread_message_notification_channel",
      {
        message: message,
        new_message_counts: new_message_counts,
        opposed_user: opposed_user
      }
    )

  end
end
