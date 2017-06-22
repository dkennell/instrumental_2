10.times do
	Customer.create(
		name: Faker::Name.name
		)
end

customer_ids = Customer.all.map {|c|c.id}


instrument_brands = {
"Keyboard" => ["Yamaha PSR-F51", "Casio CTK-1500", "Roland V-Combo", "Korg Pa4X 76"],
"Drumkit" => ["Pearl Export Series", "Tama Silverstar", "Gretsch Catalina Maple", "Odery Eyedentity Series"],
"Acoustic Guitar" => ["Seagull Guitars S6 Original", "Gibson 2016 Hummingbird Vintage", "Fender CD-60" "Taylor GS Mini "],
"Electric Guitar" =>["Fender American Special Stratocaster", "Gibson Les Paul Faded", "Ibanez Paul Stanley Signature"],
"Saxophone" => ["Selmer Mark VI", "Yamaha Custom Z", "Selmer Balanced Action", "Allora Student Series"],
"Flute" => ["Pearl Quantz Series", "Yamaha YFL-221", "Gemeinhardt Model 3OB", "Bentoni C"],
"Clarinet" => ["Etude Student Clarinet Model Ecl-100", "Buffet Crampon R13", "Yamaha Ycl-650", "Lazarro 50-BK"],
"Cello" => ["Cecilio CCO-500", "Cremona SC-200", "Merano’s Basic CL100-MP", "Yamaha SVC-110SK"],
"Violin" => ["Stentor 1500", "Cremona SV-500", "Mendini MV500", "Johannes Kohr K500"],
"Trumpet" => ["Allora Aatr-125 Series Classic", "Yamaha Ytr8335 Xeno", "Bach 180S Custom Stradivarius", "Bundy Btr-300 Series"],
"Trumbone" => ["Allora Student Series", "Yamaha Ysl620 Professional", "Kanstul 1555", "Cerveny Vfc-Sl6673R Series F"],
"French Horn" => ["Hans Hoyer 802", "Holton H179", "Yamaha YHR-871D Custom", "Wenzelmeinl Model 205gs"]
}


10.times do
    instrument = Instrument.create
  	instrument.customer_id = customer_ids.sample
  	instrument.kind = instrument_brands.keys.sample
  	instrument.model = instrument_brands[instrument.kind].sample
  	instrument.save
end
