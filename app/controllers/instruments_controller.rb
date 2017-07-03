class InstrumentsController < ApplicationController

	def index
		@instruments = Instrument.all
	end

	def create
		@instrument = Instrument.create(instrument_params)
		render json: @instrument
	end

	def instrument_params
		params.require(:instrument).permit(:kind, :model, :customer_id)
	end

end
