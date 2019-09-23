apilib_v1.prototype.tickets = {
	
	list: function(){

		console.log('apilib.tickets.list');

		// Prepara las fechas
			apilib.parse_theme("vistas/tickets", {}, true);		


		// Crea el listado
			this.recuperar_list();
	},

	recuperar_list: function(){


		// Call API
		var api = apilib.call("tickets/get_list");

		//console.log(api.data);

		var obj = {

            title    : "Listado Tickets",

			data	: api.data,

			columns	: [

				{ 
					name : "idticket",
					head : "Número",
				},


				{ 
					name : "dia",
					head : "Día",
				},

				{ 
					name : "hora",
					head : "Hora",
				},

				{ 
					name : "total",
					head : "Total",
				},
				{
					head : false,
					type : "html",
					data : "<a href='#' onclick='apilib.tickets.show({{idticket}});'><span class='fa fa-list fa-lg'></span></a><a href='#' onclick='apilib.tickets.borrar({{idticket}});'><span class='faright fa fa-trash fa-lg'></span></a>"  
				}

			]

		};


		$("#listado").html( apilib._make_list(obj, false) );

		//apilib.post_show();
		$('.table').DataTable({  'ordering':true, "order": [[ 0, 'desc' ]]});

	},

	show: function(id){

		console.log('apilib.tickets.show');

		// Call API
		var api = apilib.call("ticket_line/get_list", {'id_ticket':id});

		var precio_total = apilib.call("tickets/get", {'idticket':id}).data.total;

		//console.log(api.data);

		var obj = {

            title    : "Detalle Ticket",

            pre_table_html : '<div style="text-align: right;"><h2>Precio total: '+precio_total+' €</h2></div>',
            post_table_html : '<button class="btn btn-success" type="button" onclick="apilib.tickets.list();"> < Volver</button>',

			data	: api.data,

			columns	: [

				{ 
					name : "product_name",
					head : "Producto",
				},


				{ 
					name : "product_code",
					head : "Código",
				},

				{ 
					name : "quantity",
					head : "Unidades",
				},

				{ 
					name : "price",
					head : "Precio",
				},

				{ 
					name : "total",
					head : "Total",
				}

			]

		};


		$("#listado").html( apilib._make_list(obj, false) );

	},

	borrar: function(id){

		var mensaje;
	    var opcion = confirm("Al eliminar un ticket los productos volverán al stock.");
	    if (opcion == true) {
	    	apilib.tickets.delete(id);
		}
	},

	delete: function(id){

		console.log('apilib.tickets.delete');

		// Recuperar datos de los tickets a eliminar
		var tickets = apilib.call("ticket_line/get_list", {'id_ticket':id}).data;

		console.log(tickets);


		// Revisamos que elticket
		if (tickets){

		}

		// Al eliminar un ticket, devolvemos los productos del ticket al stock
		for (ticket of tickets){

			// Recojo los datos del producto
        	var stock = apilib.call("products/get", {'idproduct':ticket.id_product}).data.stock;

        	// Pasomos a int los valores del string y sumamos
        	stock = parseInt(stock);
        	stock+=parseFloat(ticket.quantity);

        	// Creo array de datos con nuevo stock
        	var data = {
        	idproduct: ticket.id_product,
            stock: stock
        	};

       		 // Guardo los datos con nuevo stock
        	var call = apilib.call("products/edit", data);
		}

		// Borramos todas las líneas del ticket
		apilib.call("ticket_line/delete_all_by_ticket", {'id_ticket':id});

		// Borramos el ticket
		apilib.call("tickets/delete", {'idticket':id});

		// Recargamos la vista
		this.list();

	}
	  
}