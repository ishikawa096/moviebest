class Theme < ApplicationRecord
  has_many :lists, dependent: :restrict_with_error

  validates :title, presence: true, length: { maximum: 100 }
  validates :capacity, presence: true,
                       numericality: { only_integer: true, in: 2..10 }
end
