class Form::ListRegistration < Form::Base
  attribute :comment, :string
  attribute :numbered, :boolean
  attribute :theme_id, :integer
  attribute :movies

  def params
    attributes.deep_symbolize_keys
  end
end
