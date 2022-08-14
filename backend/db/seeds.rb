themes = ActiveSupport::JSON.decode(File.read('db/seeds/themes.json'))
themes.each do |record|
  Theme.create!(record)
end

users = ActiveSupport::JSON.decode(File.read('db/seeds/users.json'))
users.each do |record|
  user = User.new(
    name: record["name"],
    email: record["email"],
    password: SecureRandom.urlsafe_base64
  )
  user.save!
end

lists = ActiveSupport::JSON.decode(File.read('db/seeds/lists.json'))
lists.each do |record|
  list = List.new(
    comment: record["comment"]
  )
  Theme.find(record["theme_id"]).lists << list
  User.find(record["user_id"]).lists << list
  list.movies.build(record["movies"])
  list.save!
end
