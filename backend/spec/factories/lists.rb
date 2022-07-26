FactoryBot.define do
  factory :list do
    comment { 'テスト' }
    numbered { false }

    association :theme
    association :user

    trait :with_movies do
      transient do
        theme_capacity { 3 }
      end
      after(:build) do |list, evaluator|
        list.movies << build_list(
          :movie,
          evaluator.theme_capacity,
          list:
        )
      end
    end
  end
end
