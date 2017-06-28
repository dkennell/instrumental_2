class CustomersController < ApplicationController

	def index
		@customers = Customer.all
		respond_to do |format|
		  format.json do
		  	render json: @customers.to_json(include: [instruments: { only: [:kind, :model]}])
		  end
		  format.html do
		  	render 'index'
		  end
		end
	end

	def show
		@customer = Customer.find_by(id: params[:id])
	    respond_to do |format|
	    	format.json do
	    		render json: @customer.to_json(include: [instruments: { only: [:kind, :model]}])
	    	end
	    	format.html do
	    		render 'show'
	    	end
	    end
	end

end
