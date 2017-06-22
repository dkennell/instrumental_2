class CustomersController < ApplicationController

	def index
		@customers = Customer.all
		respond_to do |format|
		  format.json do
		  	render json: @customers.to_json, :include => [:instruments]
		  end
		  format.html do
		  	render 'index'
		  end
		end
	end

end
