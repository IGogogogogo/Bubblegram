json.array! @messages_json do |message|
  json.id message.id
  json.content message.content
  json.image message.image
  json.user do
    json.extract! message.user, :id, :nick_name, :avatar
  end
  json.current_user current_user.id
end
