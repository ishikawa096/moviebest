FactoryBot.define do
  factory :user do
    name { 'テストユーザー' }
    sequence(:email) { |n| "test#{n}@example.com" }
    password { '12345678' }
    uid { email }
    password_confirmation { password }

    trait :with_association do
      after(:create) do |user, _evaluator|
        create(:list,
               :with_movies,
               theme: create(:theme),
               user:)
      end
    end
  end
end
