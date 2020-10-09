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
      json.time time_ago_in_words(stories[0].created_at)
    end

    index += stories.count
  end

  json.main do
    json.array! @result[:stories].flatten! do |story| #flatten!把多層巢狀 array 變成一層
      json.id story.id
      json.picture story.picture
      json.time time_ago_in_words(story.created_at)
      json.user do
        json.extract! story.user, :nick_name, :avatar
      end
    end
  end
end
