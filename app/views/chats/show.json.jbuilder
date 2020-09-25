json.array! @messages_json do |message|
  json.id message.id
  json.content message.content
  json.image message.image
  json.user do
    json.id User.find(message.user_id).id
    json.name User.find(message.user_id).nick_name
    json.avatar User.find(message.user_id).avatar
  end
end
