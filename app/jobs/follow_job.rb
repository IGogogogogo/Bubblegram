class FollowJob < ApplicationJob
  queue_as :default

  def perform(user, count)
    # Do something later
    ActionCable.server.broadcast(         #aciton cable 提供的方法 可以第二個參數的資料 廣播到第一個參數特定的頻道
      "#{user.id}_following_channel",
      {
        user: user,
        count: count
      }
    )

  end
end
