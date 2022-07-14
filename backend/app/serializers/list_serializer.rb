class ListSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  attributes :id, :comment, :numbered, :theme_id, :user_id, :created_at, :updated_at
  # attribute :theme_title do |object|
  #   "#{object.theme.title}"
  # end
  # attribute :theme_capacity do |object|
  #   "#{object.theme.capacity}"
  # end
  attribute :movies do |object|
    object.movies.each do |movie|
      "#{movie}"
    end
  end
  # belongs_to :theme
  # has_many :movies
end
