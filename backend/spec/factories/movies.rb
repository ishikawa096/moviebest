FactoryBot.define do
  factory :movie do
    title { 'テスト' }
    position { 0 }
    tmdb_id { 10 }
    tmdb_image { '/test' }

    trait :skip_validation do
      to_create { |instance| instance.save(validate: false) }
    end
  end
end
