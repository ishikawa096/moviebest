class ListSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  attributes :comment, :updated_at
end
