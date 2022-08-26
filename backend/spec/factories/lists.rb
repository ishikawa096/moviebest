FactoryBot.define do
  factory :list do
    comment { 'テスト' }

    association :user

    trait :with_theme do
      transient do
        theme_capacity { 3 }
      end
      after(:build) do |list, evaluator|
        theme = create(:theme, capacity: evaluator.theme_capacity)
        theme.lists << list
      end
    end

    trait :with_movies do
      transient do
        theme_capacity { 3 }
      end
      after(:build) do |list, evaluator|
        list.movies << build_list(
          :movie,
          evaluator.theme_capacity
        )
      end
    end

    trait :skip_validation do
      to_create { |instance| instance.save(validate: false) }
    end
  end
end
