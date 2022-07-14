class List < ApplicationRecord
  belongs_to :theme
  has_many :movies, dependent: :destroy
  validates_associated :movies

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
