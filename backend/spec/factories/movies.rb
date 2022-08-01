FactoryBot.define do
  factory :movie do
    title { 'テスト' }
    position { 0 }
    tmdb_id { 10 }
    tmdb_image { '/test' }
  end
end
