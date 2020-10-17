class LiveStreamVisitsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "live_stream_visits_#{params[:room_id]}"
    redis.lpush("live_stream_#{params[:room_id]}", 1)
    counts = redis.lrange("live_stream_#{params[:room_id]}",0 , -1).length
    VisitsCountJob.perform_later(params[:room_id], counts)
  end

  def unsubscribed
    redis.rpop("live_stream_#{params[:room_id]}")
    counts = redis.lrange("live_stream_#{params[:room_id]}",0 , -1).length
    VisitsCountJob.perform_later(params[:room_id], counts)
    # Any cleanup needed when channel is unsubscribed
  end
  private
  def redis
    @redis = Redis.new unless @redis
    @redis
  end
end
