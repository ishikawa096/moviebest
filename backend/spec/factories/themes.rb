FactoryBot.define do
  factory :theme do
    title { 'テスト' }
    capacity { 3 }

    trait :with_association do
      # transient do
      #   capacity { 3 }
      # end
      after(:create) do |theme, _evaluator|
        list = create(:list,
                      :with_movies,
                      theme_capacity: theme.capacity,
                      theme:)
        theme.lists << list
      end
    end
  end
end
