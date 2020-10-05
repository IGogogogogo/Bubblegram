class UploadFileJob < ApplicationJob
  queue_as :default

  def perform(user_id, post_params)
    puts "1111111111111111111111111111111111111"
    user = User.find(user_id)
    puts "22222222222222222222222222222222222222"
    post = user.posts.new(post_params)
    puts "333333333333333333333333333333333333"
    post.save
    puts "44444444444444444444444444444444444444"
  end
end
