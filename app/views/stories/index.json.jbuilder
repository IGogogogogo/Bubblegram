json.array! @stories do |user_stories|
  user = User.find(user_stories[0])
  json.user do
    json.extract! user, :id, :nick_name, :avatar
    json.stories user_stories[1] do |story|
      json.id story.id
      json.piscture story.picture
    end
  end
end
