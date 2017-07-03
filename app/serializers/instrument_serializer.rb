class InstrumentSerializer < ActiveModel::Serializer
  attributes :id, :kind, :model
  belongs_to :customer
end
