class SendMessageJob < ApplicationJob
  queue_as :default

  def perform(message)
    # Do something later
    me = ApplicationController.render(
      partial: "messages/me",
      locals: {message: message}
    )

    other = ApplicationController.render(
      partial: "messages/other",
      locals: {message: message}
    )

    ActionCable.server.broadcast("chat_channel_#{message.chat_id}", {me: me, other: other, message: message})

  end
end
