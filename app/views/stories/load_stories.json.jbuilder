json.stories do
  json.user_id @result[:user].id
  json.current_user @result[:current_user].nick_name
  json.viewable_users @result[:viewable_users]
  json.user_name @result[:user].nick_name
  json.user_avatar @result[:user].avatar.url
  json.is_self @result[:user] == current_user
  json.prev_user @result[:prev_user]
  json.next_user @result[:next_user]
  json.stories_count @result[:stories_count]

  json.main do
    json.array! @result[:stories] do |story|
      json.id story.id
      json.picture story.picture
      json.time time_ago_in_words(story.created_at)
    end
  end
end
