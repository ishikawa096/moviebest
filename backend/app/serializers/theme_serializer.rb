class ThemeSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  attributes :id, :title, :capacity, :created_at, :updated_at
end
