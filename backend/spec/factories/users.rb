FactoryBot.define do
  factory :user do
    name { 'テストユーザー' }
    email { 'test@test.co.jp' }
    password { '12345678' }
  end
end
