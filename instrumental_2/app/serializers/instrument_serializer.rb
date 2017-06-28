class InstrumentSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :customer
end
