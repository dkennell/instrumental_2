class InstrumentsController < ApplicationController

	def create
		@instrument = Instrument.create(instrument_params)
	end

	def instrument_params
		params.require(:instrument).permit(:kind, :model, :customer_id)
	end

end
