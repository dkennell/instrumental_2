$(document).ready(function(){
	bindClickListeners()
})

function bindClickListeners(){
	$("#customers_index").on("click", function(e){
		e.preventDefault()
			loadCustomers()
	})

	$("customer_link").on("click", function(e){
		e.preventDefault()
	})
	
}


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