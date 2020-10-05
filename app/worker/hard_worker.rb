class HardWorker
  # include Sidekiq::Worker

  def perform(user_id, post_params)
    user = User.find(user_id)
    post = user.posts.new(post_params)
    post.save
  end

end
