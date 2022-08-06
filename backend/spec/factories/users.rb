FactoryBot.define do
  factory :user do
    name { 'テストユーザー' }
    sequence(:email) { |n| "test#{n}@example.com" }
    password { '12345678' }
    uid { email }
    password_confirmation { password }
  end
end
