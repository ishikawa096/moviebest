require 'rails_helper'

RSpec.describe List, type: :model do
  let(:user) { build(:user, id: 1) }
  let(:theme) { build(:theme, capacity: 2, id: 1) }
  let(:movies) { build_list(:movie, 2) }
  let(:params) do
    {
      comment: 'Comment',
      user:,
      theme:,
      movies:
    }
  end

  it '全てのパラメータがあれば有効であること' do
    list = described_class.new(params)
    expect(list).to be_valid
  end

  it 'commentが空文字でも有効であること' do
    list = described_class.new(params.merge({ comment: '' }))
    expect(list).to be_valid
  end

  it 'commentが無いとき空文字に置換されること' do
    list = described_class.new(params.merge({ comment: nil }))
    expect(list.comment).to eq ''
  end

  it '関連userが無いなら無効であること' do
    list = described_class.new(params.merge({ user: nil }))
    expect(list).to be_invalid
  end

  it '関連themeが無いなら無効であること' do
    list = described_class.new(params.merge({ theme: nil }))
    expect(list).to be_invalid
  end

  it '関連moviesが空なら無効であること' do
    list = described_class.new(params.merge({ movies: [] }))
    expect(list).to be_invalid
  end

  it '関連movies数がcapacity未満なら無効であること' do
    list = described_class.new(params.merge({ movies: [build(:movie)] }))
    expect(list).to be_invalid
  end

  it '関連movies数がcapacityを超えるなら無効であること' do
    list = described_class.new(params.merge({ movies: build_list(:movie, 3) }))
    expect(list).to be_invalid
  end

  it '無効な関連movieがあるとlistも無効であること' do
    movie = Movie.new({ title: nil })
    expect(movie).to be_invalid
    list = described_class.new(params.merge({ movies: [movie, build(:movie)] }))
    expect(list).to be_invalid
  end

  it '削除できること' do
    list = create(:list, params)
    expect { list.destroy }.to change(described_class, :count).by(-1)
  end

  it '削除すると関連moviesも削除されること' do
    list = create(:list, params)
    expect { list.destroy }.to change(Movie, :count).by(-2)
  end
end
