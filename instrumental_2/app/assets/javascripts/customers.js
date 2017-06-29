//////////////////////////////////////////////////
// The problem here is that we need to call attachCustomerLinkListeners()
// from the customers index page, but we also need to call it after we\ve
// clicked on the 'customers' tab and replaced the entire body of the view
// with the customers list. The problems comes from the fact that the JS on this
// page always runs first. Even if nothing gets clicked, all of the code 
// gets run. It actually goes through the process of building the listeners
// and attaching them. If we\ve just loaded the customer index from scratch,
// the problem is that there\s nothing to attach anything to.

//Scratch that, the loadCustomers() call in the customers index executes
//and finishes before th debugger in aCTL() fires. However, no customers
//are loaded on the page.
//////////////////////////////////////////////////


// This file is required in the JS manifest (application.js)
// The following doc.ready affects the entire application
$(document).ready(function(){
  debugger;
	attachCustomersTabListener()
})

// Again, this function, FOR THE ENTIRE APP, specifies what
//happens when you click on the 'customers' tab
function attachCustomersTabListener(){
  debugger;
    // The code initially stops here, after the initial customers index refresh
    // From here on that inital refresh, we go back to the customers index, before the 
    // loadCustomers() call.
	$("#customers_index").on("click", function(e){
    // No debugger in this callback gets tripped on the inital refresh of the customer index
    // So it looks like this callback gets *assigned*, but not actually run

		e.preventDefault()
    debugger;
      // clears the page and loads the customer list
			loadCustomers()
      debugger;
      // attaches listeners to the customer links
      attachCustomerLinkListeners()
      debugger;
	})
}

// This must get called from TWO places: 1) the actual customers
// index page, and 2) the 
function attachCustomerLinkListeners(){
  debugger;
	var customer_links = $(".customer_link")
    debugger

  Array.prototype.forEach.call(customer_links, function(link){
    debugger;
    link.addEventListener("click", function(e){
    e.preventDefault()
    debugger;
    })
  })
}


// function loadCustomer(){
//   debugger;
// }


function loadCustomers(){
    debugger;
    // The code in this $.get isn't working. debuggers inside aren't tripping. Why?
    $.get("/customers.json", function(response){
      debugger;
    	history.pushState(null, null, "/customers")
      var customer_list = document.getElementById("app_container")
      debugger;
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
    attachCustomerLinkListeners()
  }