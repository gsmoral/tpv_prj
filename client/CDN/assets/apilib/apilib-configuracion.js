apilib_v1.prototype.configuracion = {
	
	list: function(){

		console.log('apilib.configuracion.list');

		// Prepara las fechas
			apilib.parse_theme("vistas/configuracion", {}, true);		


		// Crea el listado
			//this.recuperar_list();
	}/*,

	recuperar_list: function(){


		// Call API
		var api = apilib.call("tickets/get_list");

		console.log(api.data);

		var obj = {

            title    : "Listado Tickets",

			data	: api.data,

			columns	: [

				{ 
					name : "date",
					head : "Fecha",
				},


				{ 
					name : "date",
					head : "Hora",
				},

				{ 
					name : "total",
					head : "Total",
				}

			]

		};


		$("#listado").html( apilib._make_list(obj, false) );

	},

	exportar_fb: function(){

		var datos = {
			desde : $("#desde").val(),
			hasta : $("#hasta").val()
		};

		// Call API
		var api = apilib.call("customer/get_list", datos);

		var str_emails = "";

		api.data.forEach(function(e){

			str_emails += e.customer_email + "\n";

		});

		this.download("customer-export.txt", str_emails);


	},

	exportar_json : function(){

		var datos = {
			desde : $("#desde").val(),
			hasta : $("#hasta").val()
		};

		// Call API
		var api = apilib.call("customer/get_list", datos);

		this.download("customer-export.txt", JSON.stringify(api.data));

	},

	download : function(filename, text) {
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);
	
		element.style.display = 'none';
		document.body.appendChild(element);
	
		element.click();
	
		document.body.removeChild(element);
	}*/
	  
}
