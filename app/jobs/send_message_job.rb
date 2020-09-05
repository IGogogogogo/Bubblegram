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
    me_image = ApplicationController.render(
      partial: "messages/meimage",
      locals: {message: message}
    )
    other_image = ApplicationController.render(
      partial: "messages/otherimage",
      locals: {message: message}
    )


    ActionCable.server.broadcast("chat_channel_#{message.chat_id}", {me: me, other: other, me_image: me_image ,other_image: other_image, message: message})

  end
end
