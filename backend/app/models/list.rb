class List < ApplicationRecord
  after_initialize :set_default_comment

  belongs_to :theme
  belongs_to :user
  has_many :movies, dependent: :destroy
  validates_associated :movies

  validates :comment, length: { maximum: 1000 }
  validates :theme_id, numericality: { only_integer: true }
  validates :user_id, numericality: { only_integer: true }
  validate :number_of_movies_match_theme_capacity

  def number_of_movies_match_theme_capacity
    if !theme
      errors.add(:theme, 'が必要です')
    elsif theme.capacity != movies.size
      errors.add(:movies,
                 "を#{theme.capacity}つ入力してください(現在：#{movies.size})")
    end
  end

  def set_default_comment
    self.comment ||= ''
  end

  def update_with_movies!(params)
    update!(comment: params[:comment])
    params[:movies].each do |movie_param|
      movie = movies.find(movie_param[:id])
      movie.update!(
        title: movie_param[:title],
        position: movie_param[:position],
        tmdb_id: movie_param[:tmdb_id],
        tmdb_image: movie_param[:tmdb_image]
      )
    end
  end

  class << self
    def create_with_movies!(params)
      list = List.new(
        comment: params[:comment],
        theme_id: params[:theme_id]
      )
      list.movies.build(params[:movies])
      list.save!
      list
    end
  end
end
