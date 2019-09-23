apilib_v1.prototype.categories = {
	
	list: function(){

		console.log('apilib.categories.list');

        // Carga la vista del menu de configuración
		apilib.configuracion.list();

		// Prepara las vistas	
		$("#subcontent").html( apilib.parse_theme("vistas/categorias", {}, false) );


		// Cargamos la vista del listado
		this.recuperar_list();

        // Cargamos la vista de añadir
        this.add();
	},

	recuperar_list: function(){

		console.log('apilib.categories.recuperar_list');

		// Recuperamos el valos del formulario de busqueda
		var datos = {
			searchStr : $("#search").val()
		};

        // Comprobamos si hay valor a buscar
		if ($("#search").val()){
			// Si nos pasan un valos a buscar
			var api = apilib.call("categories/search", datos);
		} else {
			// Si no, recuperamos todos los clientes
			var api = apilib.call("categories/get_list");
		}
		
		var obj = {

            title    : "Listado Categorías",

			data	: api.data,

			columns	: [

				{ 
					name : "name",
					head : "Categoría",
					//type : "onclick",
					//data : "apilib.camareros.get_customer({{ID}});"					
				},			
				{
					head : false,
					type : "html",
					data : "<a href='#' onclick='apilib.categories.edit({{idcategory}});'><span class='fa fa-edit fa-lg'></span></a><a href='#' onclick='apilib.categories.delete({{idcategory}});'><span class='faright fa fa-trash fa-lg'></span></a>"
				}
			]

		};


		$("#listado").html( apilib._make_list(obj, false) );


	},

	add: function(){

		console.log('apilib.categories.add');

        var obj_data = {

            title   : "Añadir Categoria",

            columns : [

                { label : 'Nombre', name : 'name', 	type : 'text'}

            ],

            button : {
                type:   'success',
                text:   "Guardar", 
                onclick: "apilib.categories.save_add();", 
            }

        };

        $("#addedit").html( apilib._make_add(obj_data, false) );

	},

	save_add: function(){

		console.log('apilib.categories.save_add');

        // Recuperamos el valor del formulario
        var data = {
            name: $("#name").val()
        };

        // Call API
        var call = apilib.call("categories/add", data);

        if( call.status == false ){
            apilib.alert("Ha ocurrido algún problema. ¿Estás seguro de haber completado todos los datos?", "danger");
        }else{
            
            apilib.alert("La categoria ha sido añadida correctamente");
            
            // Cargamos la vista 
            this.list();
        }
    },

	edit: function(id){
		
		console.log('apilib.categories.edit');
		
		// Recojo los datos de ese cliente
        var datos = apilib.call("categories/get", {'idcategory':id}).data;

        // Preparo el objeto
        var obj_data = {

            title   : "Editar Categoria",

            // Aquí le pasamos los datos actuales
            data    : datos,

            columns : [

                { label : 'Nombre', name : 'name', type : 'text'}

            ],

            button : {
                type:   'success', // obligatorio
                text:   "Guardar", // obligatorio
                onclick: "apilib.categories.save_edit("+id+");", // obligatorio
            }

        };

        // Cargo la vista
        $("#addedit").html( apilib._make_edit(obj_data, false) );

        // Recupero la marca y la pongo en el formulario
        $("#name").val(datos.name);
                
	},

	save_edit: function(id){

		console.log('apilib.categories.save_edit');

        var data = {
        	idcategory: id,
            name: $("#name").val()
        };

        // Call API
        var call = apilib.call("categories/edit", data);

        if( call.status == false ){
            apilib.alert("Ha ocurrido algún problema. ¿Estás seguro de haber completado todos los datos?", "danger");
        }else{
            
            apilib.alert("La categoria ha sido modificada correctamente");
            
            // Cargamos la vista 
            this.list();
        }

    },

	delete: function(id){
		console.log('apilib.categories.delete');
		
		// Call API
        var call = apilib.call("categories/delete", {'idcategory':id});

        if( call.status == false ){
            apilib.alert("Ha ocurrido algún problema", "danger");
        }else{
            
            apilib.alert("La categoria se ha eliminado correctamente");
            
            // Cargamos la vista 
            this.list();
        }
		
	}
	  
}
