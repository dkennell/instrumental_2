
$(document).ready(function(){
	attachCustomersTabListener()
  attachCustomerLinkListeners()
})


function attachCustomersTabListener(){
	$("#customers_index").on("click", function(e){
		e.preventDefault()
			loadCustomers()
	})
}

function attachCustomerLinkListeners(){
	$(document).on("click", ".customer_link", function(e){
    e.stopPropagation()
    e.preventDefault()
    loadCustomer(this.id)
  })
}


function loadCustomer(customer_id){
  $.get("/customers/" + customer_id, function(response){
    var customer_page = document.getElementById("app_container")
    customer_page.innerHTML = "<h2>" + response.name + "</h2>"
    customer_page.innerHTML += "<h4>Rent New Instrument</h4>"
    customer_page.innerHTML += '<form><label for="kind">Type: </label><input type="text" name="kind" id="kind"><br/><br/><label for="model">Model: </label><input type="text" name="model" id="model"><br/><br/><input type="submit" id="submit"></form><h4>Currently Renting:</h4>'
    customer_page.innerHTML += "<div id='instruments'></div>"
    var instruments = response.instruments
     Array.prototype.forEach.call(instruments, function(instrument){
        var instrumentsDiv = document.getElementById("instruments")
        instrumentsDiv.innerHTML += "<p>" + instrument.model + " " + instrument.kind + "</p>"
      })
     attachFormSubmitListener(response.id)
  })
}

  function attachFormSubmitListener(customer_id){
    $("#submit").click(function(event){
      event.preventDefault()
      postNewInstrument(customer_id)
    })
  }

  function postNewInstrument(customer_id){   
    var instr_kind = $("#kind").val()
    var instr_model = $("#model").val()
    var instrument_info = {instrument: {kind: instr_kind, model: instr_model, customer_id: customer_id}}
    $.post("/instruments", instrument_info, function(response){
      var newInstrument = new Instrument(response.kind, response.model, response.customer.id)
      newInstrument.appendToDOM()
    })
  }

  function Instrument(kind, model, customer_id){
    this.kind = kind
    this.model = model
    this.customer_id = customer_id

  }

  Instrument.prototype.appendToDOM = function(){
    $("#instruments").append(`<p>${this.model} ${this.kind}</p>`)
  }

////////////////////////////////// CUSTOMER SHOW PAGE END //////////////////////////////////////////

function loadCustomers(){
    $.get("/customers.json", function(response){
    	history.pushState(null, null, "/customers")
      var customer_list = document.getElementById("app_container")
      customer_list.innerHTML = "<h2>Customers</h2>"
  	  	customer_list.innerHTML += "<ul>"
  	  Array.prototype.forEach.call(response, function(customer){
        customer_list.innerHTML += `<li id="${customer.id}"></li>`
        var customer_list_item = document.getElementById(`${customer.id}`)
        // Reset the customer list item to prevent duplication in nested instrument list
        customer_list_item.innerHTML += `<a class="customer_link" id="${customer.id}" href="/customers/${customer.id}">${customer.name}</a>`
        customer_list_item.innerHTML += `<ul id="customer-${customer.id}-instruments-list"></ul>`
 
        Array.prototype.forEach.call(customer.instruments, function(instrument){
          document.getElementById(`customer-${customer.id}-instruments-list`).innerHTML += "<li>" + instrument.kind + " - " + instrument.model + "</li>"
        })
      })
	  	customer_list.innerHTML += "</ul>"

    })
  }