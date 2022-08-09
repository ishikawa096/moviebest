class Theme < ApplicationRecord
  has_many :lists, dependent: :restrict_with_error

  validates :title, presence: true, length: { maximum: 100 }
  validates :capacity, presence: true, numericality: {
    only_integer: true,
    greater_than_or_equal_to: 2,
    less_than_or_equal_to: 10
  }
end
