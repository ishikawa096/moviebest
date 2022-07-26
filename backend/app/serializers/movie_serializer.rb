class MovieSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  attributes :id, :title, :position, :list_id, :created_at, :updated_at
end
