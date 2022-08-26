require 'rails_helper'

RSpec.describe User, type: :model do
  let(:params) { { name: 'Name', email: 'test@test.com', password: 'password' } }

  it '全てのパラメータがあれば有効であること' do
    user = described_class.new(params)
    expect(user).to be_valid
  end

  it 'nameが無いなら無効であること' do
    user = described_class.new(params.merge({ name: nil }))
    expect(user).to be_invalid
  end

  it 'nameが空文字なら無効であること' do
    user = described_class.new(params.merge({ name: '' }))
    expect(user).to be_invalid
  end

  it 'emailが無いなら無効であること' do
    user = described_class.new(params.merge({ email: nil }))
    expect(user).to be_invalid
  end

  it 'emailが空文字なら無効であること' do
    user = described_class.new(params.merge({ email: '' }))
    expect(user).to be_invalid
  end

  it 'emailに@が無いなら無効であること' do
    user = described_class.new(params.merge({ email: 'testtest.com' }))
    expect(user).to be_invalid
  end

  it 'emailにドメインがないなら無効であること' do
    user = described_class.new(params.merge({ email: 'test@testcom' }))
    expect(user).to be_invalid
  end

  it '登録済みemailなら無効であること' do
    create(:user, email: params[:email])
    user = described_class.new(params)
    expect(user).to be_invalid
  end

  it 'passwordが無いなら無効であること' do
    user = described_class.new(params.merge({ password: nil }))
    expect(user).to be_invalid
  end

  it 'passwordが空文字なら無効であること' do
    user = described_class.new(params.merge({ password: '' }))
    expect(user).to be_invalid
  end

  it 'passwordが5文字なら無効であること' do
    user = described_class.new(params.merge({ password: '12345' }))
    expect(user).to be_invalid
  end

  it 'passwordが6文字なら有効であること' do
    user = described_class.new(params.merge({ password: '123456' }))
    expect(user).to be_valid
  end

  it '削除できること' do
    user = create(:user)
    expect { user.destroy }.to change(described_class, :count).by(-1)
  end

  it '削除すると関連listsも削除されること' do
    user = create(:user, :with_association)
    expect { user.destroy }.to change(List, :count).by(-1)
  end
end
