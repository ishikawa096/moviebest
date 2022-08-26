class Movie < ApplicationRecord
  after_initialize :set_default_values

  belongs_to :list

  validates :title, presence: true, length: { maximum: 100 }
  validates :position, presence: true,
                       numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :tmdb_id, presence: true,
                      numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  def set_default_values
    self.tmdb_id    ||= 0
    self.tmdb_image ||= ''
  end
end
