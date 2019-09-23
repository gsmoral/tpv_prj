apilib_v1.prototype.clients = {
	
	list: function(){

		console.log('apilib.clients.list');

        // Carga la vista del menu de configuración
		apilib.configuracion.list();

		// Prepara las vistas
		$("#subcontent").html( apilib.parse_theme("vistas/clientes", {}, false) );

		// Crea el listado
		this.recuperar_list();
	},

	recuperar_list: function(){

		console.log('apilib.clients.recuperar_list');

		// Call API
		var api = apilib.call("clients/get_list");
		
		var obj = {

            title    : "Listado Clientes",

			data	: api.data,

			columns	: [

				{ 
					name : "razon_social",
					head : "Razón social <span class='fa fa-sort'></span>",				
				},			

				{ 
					name : "nif",
					head : "NIF <span class='fa fa-sort'></span>",									
				},


				{
					name : "email",
					head : "Email <span class='fa fa-sort'></span>",
				},				

				{
					name : "calle",
					head : "Calle <span class='fa fa-sort'></span>",
				},				

				{
					name : "codigo_postal",
					head : "CP <span class='fa fa-sort'></span>",
				},
				{
					name : "poblacion",
					head : "Población <span class='fa fa-sort'></span>",
				},
				{
					name : "provincia",
					head : "Provincia <span class='fa fa-sort'></span>",
				},
				{
					head : false,
					type : "html",
					data : "<a href='#' onclick='apilib.clients.edit({{idclient}});'><span class='fa fa-edit fa-lg'></span></a><a href='#' onclick='apilib.clients.delete({{idclient}});'><span class='faright fa fa-trash fa-lg'></span></a>"
				}
			]

		};

		$("#listado").html( apilib._make_list(obj, false) );
		apilib.post_show();

	},

	add: function(){

		console.log('apilib.clients.add');

        var obj_data = {

            title   : "Añadir Cliente",

            pre_table_html : '<div style="text-align: right;"><button class="btn btn-success" type="button" onclick="apilib.users.add();">Añadir usuario</button></div>',

            columns : [

                {
                    label   :   'Razón social',
                    name    :   'razon_social',
                    type    :   'text', /* text, data, number, email, texarea, select, html */

                },

                {
                    label   :   'NIF',
                    name    :   'nif',
                    type    :   'text', /* text, data, number, email, texarea, select, html */
                },

                { label : 'Email',  name : 'email', type : 'email' },
                { label : 'Calle',   name : 'calle',      type : 'text' },
                { label : 'Código postal',  name : 'codigo_postal', type : 'text' },
                { label : 'Población',  name : 'poblacion', type : 'text' },
                { label : 'Provincia',  name : 'provincia', type : 'text' }

            ],

            button : {
                type:   'secondary',
                text:   "Guardar", 
                onclick: "apilib.clients.save_add();", 
            }

        };

        apilib._make_add(obj_data);

	},

	save_add: function(){

		console.log('apilib.clients.save_add');

        var data = {
            razon_social: $("#razon_social").val(),
            nif: $("#nif").val(),
            email: $("#email").val(),
            calle: $("#calle").val(),
            codigo_postal: $("#codigo_postal").val(),
            poblacion: $("#poblacion").val(),
            provincia: $("#provincia").val()
        };

        // Call API
        var call = apilib.call("clients/add", data);

        if( call.status == false ){
            apilib.alert("Ha ocurrido algún problema. ¿Estás seguro de haber completado todos los datos?", "danger");
        }else{
            
            apilib.alert("El cliente ha sido añadido correctamente");
            
            // Cargamos la vista 
            this.list();
        }
    },

	edit: function(id){
		
		console.log('apilib.clients.edit');
		
		// Recojo los datos de ese cliente
        var datos_cliente = apilib.call("clients/get", {'idclient':id}).data;

        // Preparo el objeto
        var obj_data = {

            title   : "Editar Cliente",

            // Aquí le pasamos los datos actuales
            data    : datos_cliente,

            columns : [

                {
                    label   :   'Razón social',
                    name    :   'razon_social',
                    type    :   'text', /* text, data, number, email, texarea, select, html */

                },

                {
                    label   :   'NIF',
                    name    :   'nif',
                    type    :   'text', /* text, data, number, email, texarea, select, html */
                },

                { label : 'Email',  name : 'email', type : 'email' },
                { label : 'Calle',   name : 'calle',      type : 'text' },
                { label : 'Código postal',  name : 'codigo_postal', type : 'text' },
                { label : 'Población',  name : 'poblacion', type : 'text' },
                { label : 'Provincia',  name : 'provincia', type : 'text' }


            ],

            button : {
                type:   'success', // obligatorio
                text:   "Guardar", // obligatorio
                onclick: "apilib.clients.save_edit("+id+");", // obligatorio
            }

        };

        apilib._make_edit(obj_data);
                
	},

	save_edit: function(id){

		console.log('apilib.clients.save_edit');

        var data = {
        	idclient: id,
            razon_social: $("#razon_social").val(),
            nif: $("#nif").val(),
            email: $("#email").val(),
            calle: $("#calle").val(),
            codigo_postal: $("#codigo_postal").val(),
            poblacion: $("#poblacion").val(),
            provincia: $("#provincia").val()
        };

        // Call API
        var call = apilib.call("clients/edit", data);

        if( call.status == false ){
            apilib.alert("Ha ocurrido algún problema. ¿Estás seguro de haber completado todos los datos?", "danger");
        }else{
            
            apilib.alert("El cliente ha sido modificado correctamente");
            
            // Cargamos la vista 
            this.list();
        }

    },

	delete: function(id){
		console.log('apilib.clients.delete');
		
		// Call API
        var call = apilib.call("clients/delete", {'idclient':id});

        if( call.status == false ){
            apilib.alert("Ha ocurrido algún problema", "danger");
        }else{
            
            apilib.alert("El cliente se ha eliminado correctamente");
            
            // Cargamos la vista 
            this.list();
        }
		
	},

	exportar_json : function(){

		// Call API
		var api = apilib.call("clients/get_list");

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
	}
	  
}
