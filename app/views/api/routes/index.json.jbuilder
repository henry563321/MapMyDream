json.index do
  @routes.each do |route|
    json.set! route.id do
      json.partial! 'api/routes/route', route: route
    end
  end
end

json.ord @routes.map(&:id)

json.friendroutes do
  current_user.friends.routes.each do |route|
    json.set! route.id do
      json.partial! 'api/routes/route', route: route
    end
  end
end 
