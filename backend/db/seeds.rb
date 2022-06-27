Theme.create!(
  id: 1,
  title: '90年代映画ベスト3',
  capacity: 3
)

List.create!(
  theme_id: 1,
  comment: 'テスト',
  numbered: false,
  user_id: 1
)

movies = [{
  title: 'トレインスポッティング',
  position: 1,
  list_id: 1
},
{
  title: 'ファーゴ',
  position: 2,
  list_id: 1
},
{
  title: 'ファイト・クラブ',
  position: 3,
  list_id: 1
}]

movies.each do |record|
  Movie.create!(record)
end
