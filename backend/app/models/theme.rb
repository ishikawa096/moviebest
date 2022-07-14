class Theme < ApplicationRecord
  has_many :lists, dependent: :restrict_with_error
end
