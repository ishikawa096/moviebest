require 'rails_helper'

RSpec.describe Movie, type: :model do
  let(:user) { build(:user, id: 1) }
  let(:theme) { build(:theme, capacity: 2, id: 1) }
  let(:list) do
    build(:list, user:, theme:, movies: [build(:movie)], id: 1)
  end
  let(:params) do
    {
      title: 'Title',
    position: 0,
    tmdb_id: 10,
    tmdb_image: '/test',
    list:
    }
  end

  it '全てのパラメータがあれば有効であること' do
    movie = described_class.new(params)
    expect(movie).to be_valid
  end

  it 'titleが無いなら無効であること' do
    movie = described_class.new(params.merge({ title: nil }))
    expect(movie).to be_invalid
  end

  it 'titleが空文字なら無効であること' do
    movie = described_class.new(params.merge({ title: '' }))
    expect(movie).to be_invalid
  end

  it 'capacityが無いなら無効であること' do
    movie = described_class.new(params.merge({ position: nil }))
    expect(movie).to be_invalid
  end

  it 'capacityが数字以外では無効であること' do
    movie = described_class.new(params.merge({ position: 'invalid' }))
    expect(movie).to be_invalid
  end

  it 'tmdb_idが無くても有効であること' do
    movie = described_class.new(params.merge({ tmdb_id: nil }))
    expect(movie).to be_valid
  end

  it 'tmdb_idが数字以外なら無効であること' do
    movie = described_class.new(params.merge({ tmdb_id: 'invalid' }))
    expect(movie).to be_invalid
  end

  it 'tmdb_imageが無くても有効であること' do
    movie = described_class.new(params.merge({ tmdb_image: nil }))
    expect(movie).to be_valid
  end

  it 'tmdb_imageが無いとき空文字に置換されること' do
    movie = described_class.new(params.merge({ tmdb_image: nil }))
    expect(movie.tmdb_image).to eq ''
  end

  it '削除できること' do
    movie = create(:list, :with_movies, :with_theme).movies[0]
    expect { movie.destroy }.to change(described_class, :count).by(-1)
  end
end
