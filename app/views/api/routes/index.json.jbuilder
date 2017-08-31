json.index do
  @routes.each do |route|
    json.set! route.id do
      json.partial! 'api/routes/route', route: route
      json.name route.user.username
      json.time route.updated_at
    end
  end
end
