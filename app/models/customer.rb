class Customer < ActiveRecord::Base
	has_many :instruments
end
