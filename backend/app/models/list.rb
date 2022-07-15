class List < ApplicationRecord
  belongs_to :theme
  has_many :movies, dependent: :destroy
  validates_associated :movies

  validates :comment, length: { maximum: 1000 }
  validates :numbered, inclusion: { in: [true, false] }
  validates :theme_id, presence: true, length: { maximum: 100 }, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validate :number_of_movies_match_theme_capacity

  def number_of_movies_match_theme_capacity
    if theme.capacity != movies.size
      errors.add(:movies, "を#{theme.capacity}つ入力してください")
    end
  end

  class << self
    def create!(params)
      list = List.new(
        comment: params[:comment],
        numbered: params[:numbered],
        theme_id: params[:theme_id]
      )
      list.movies.build(params[:movies])
      list.save!
      list
    end
  end
end
