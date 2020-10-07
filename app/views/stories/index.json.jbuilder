# json.array! @stories do |user_stories|
#   user = User.find(user_stories[0])
#   json.user do
#     json.extract! user, :id, :nick_name, :avatar
#     json.stories user_stories[1] do |story|
#       json.id story.id
#       json.picture story.picture
#       json.time story.created_at
#     end
#   end
# end

# json.user do
#   json.extract! @result[:user], :id, :nick_name, :avatar
# end

# json.stories do
#   json.array! @result[:stories] do |story|
#     json.id story.id
#     json.picture story.picture
#     json.time story.created_at
#     json.user do
#       json.extract! story.user, :nick_name, :avatar
#     end
#   end
# end

# json.user do
#   json.index @result[:user_index]
#   json.name @result[:user_name]
# end

# json.stories do
#   json.array! @result[:stories] do |story|
#     json.id story.id
#     json.picture story.picture
#     json.time story.created_at
#     json.user do
#       json.extract! story.user, :nick_name, :avatar
#     end
#   end
# end

json.stories do
  json.user_index @result[:user_index]
  json.user_name @result[:user_name]

  index = 0
  json.position @result[:stories] do |stories|
    json.index index
    json.count stories.count

    json.user do
      json.name stories[0].user.nick_name
      json.avatar stories[0].user.avatar
    end

    json.story do
      json.picture stories[0].picture
      json.time stories[0].created_at
    end

    index += stories.count
  end

  json.main do
    json.array! @result[:stories].flatten! do |story| #flatten!把多層巢狀 array 變成一層
      json.id story.id
      json.picture story.picture
      json.time story.created_at
      json.user do
        json.extract! story.user, :nick_name, :avatar
      end
    end
  end
end
