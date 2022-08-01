class Movie < ApplicationRecord
  belongs_to :list

  validates :title, presence: true, length: { maximum: 100 }
  validates :position, presence: true,
                       numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :tmdb_id, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
