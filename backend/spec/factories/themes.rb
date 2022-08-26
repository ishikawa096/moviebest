FactoryBot.define do
  factory :theme do
    title { 'テスト' }
    capacity { 3 }

    trait :with_association do
      after(:create) do |theme, _evaluator|
        create(:list,
               :with_movies,
               theme_capacity: theme.capacity,
               theme:)
      end
    end
  end
end
