class List < ApplicationRecord
  belongs_to :theme
  belongs_to :user
  has_many :movies, dependent: :destroy
  validates_associated :movies

  validates :comment, length: { maximum: 1000 }
  validates :numbered, inclusion: { in: [true, false] }
  validates :theme_id, numericality: { only_integer: true }
  validates :user_id, numericality: { only_integer: true }
  validate :number_of_movies_match_theme_capacity

  def number_of_movies_match_theme_capacity
    return unless theme.capacity != movies.size

    errors.add(:movies,
               "を#{theme.capacity}つ入力してください(現在：#{movies.size})")
  end

  def update_with_movies!(params)
    self.update!(comment: params[:comment], numbered: params[:numbered])
    params[:movies].each do |movie_param|
      movie = self.movies.find(movie_param[:id])
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
        numbered: params[:numbered],
        theme_id: params[:theme_id],
        user_id: params[:user_id]
      )
      list.movies.build(params[:movies])
      list.save!
      list
    end
  end
end
