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

  class << self
    def create!(params)
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
