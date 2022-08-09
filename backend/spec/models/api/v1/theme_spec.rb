require 'rails_helper'

RSpec.describe Theme, type: :model do
  let(:params) { { title: 'Title', capacity: 5 } }

  it 'title, capacityがあれば有効であること' do
    theme = described_class.new(params)
    expect(theme).to be_valid
  end

  it 'titleが無いなら無効であること' do
    theme = described_class.new(params.merge({ title: nil }))
    expect(theme).to be_invalid
  end

  it 'titleが空文字なら無効であること' do
    theme = described_class.new(params.merge({ title: '' }))
    expect(theme).to be_invalid
  end

  it 'capacityが無いなら無効であること' do
    theme = described_class.new(params.merge({ capacity: nil }))
    expect(theme).to be_invalid
  end

  it 'capacityが数字以外なら無効であること' do
    theme = described_class.new(params.merge({ capacity: 'invalid' }))
    expect(theme).to be_invalid
  end

  it 'capacityが小数なら無効であること' do
    theme = described_class.new(params.merge({ capacity: '4.5' }))
    expect(theme).to be_invalid
  end

  it 'capacityが2未満なら無効であること' do
    theme = described_class.new(params.merge({ capacity: '1' }))
    expect(theme).to be_invalid
  end

  it 'capacityが2なら有効であること' do
    theme = described_class.new(params.merge({ capacity: '2' }))
    expect(theme).to be_valid
  end

  it 'capacityが11以上なら無効であること' do
    theme = described_class.new(params.merge({ capacity: '11' }))
    expect(theme).to be_invalid
  end

  it 'capacityが10なら有効であること' do
    theme = described_class.new(params.merge({ capacity: '10' }))
    expect(theme).to be_valid
  end

  it '削除できること' do
    theme = create(:theme)
    expect { theme.destroy }.to change(described_class, :count).by(-1)
  end

  it '関連listsがあると削除できないこと' do
    theme = create(:theme, :with_association)
    expect { theme.destroy }.not_to change(described_class, :count)
  end
end
