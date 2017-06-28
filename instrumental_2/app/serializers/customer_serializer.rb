class CustomerSerializer < ActiveModel::Serializer
  attributes :id
  has_many :instruments
end
