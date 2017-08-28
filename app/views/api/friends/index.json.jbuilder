json.friends current_user.friends do |friend|
  json.id friend.id
  json.name friend.applier.username
  json.status friend.status
end

json.applier current_user.applier do |friend|
  json.id friend.id
  json.name friend.friends.username
  json.status friend.status
end
