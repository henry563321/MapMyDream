# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
users = []
5.times do
  begin
    users << User.create!(username: Faker::Pokemon.name, email: Faker::Internet.email, password: "123456")
  rescue
    retry
  end
end

users << User.create!(username: 'guest', email: Faker::Internet.email, password: "123456")

STATUS = ['PENDING', 'APPROVED', 'DENIED']

Friend.destroy_all
20.times do
  begin
    Friend.create!(user_id: users.sample.id, apply_user_id: users.sample.id, status: STATUS.sample)
  rescue
    retry
  end
end
