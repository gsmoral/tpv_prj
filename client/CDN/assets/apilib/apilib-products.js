apilib_v1.prototype.products = {
	
	list: function(){

		console.log('apilib.products.list');

		apilib.configuracion.list();

		// Prepara las vistas	
		$("#subcontent").html( apilib.parse_theme("vistas/productos", {}, false) );

		// Crea el listado
		this.recuperar_list();
	},

	recuperar_list: function(){

		console.log('apilib.products.recuperar_list');

		// Call API
		var api = apilib.call("products/get_list");
				
		var obj = {

            title    : "Listado Productos",

			data	: api.data,

			columns	: [

				{ 
					name : "name",
					head : "Nombre <span class='fa fa-sort'></span>",				
				},			

				{ 
					name : "codigo",
					head : "Código <span class='fa fa-sort'></span>",									
				},


				{
					name : "brand_name",
					head : "Marca <span class='fa fa-sort'></span>",
				},
				{
					name : "category_name",
					head : "Categoría <span class='fa fa-sort'></span>",
				},					

				{
					name : "stock",
					head : "Stock <span class='fa fa-sort'></span>",
				},				

				{
					name : "taxes",
					head : "IVA <span class='fa fa-sort'></span>",
				},
				{
					name : "pvd",
					head : "PVD <span class='fa fa-sort'></span>",
				},
				{
					name : "pvp",
					head : "PVP <span class='fa fa-sort'></span>",
				},
				{
					head : false,
					type : "html",
					data : "<a href='#' onclick='apilib.products.edit({{idproduct}});'><span class='fa fa-edit fa-lg'></span></a><a href='#' onclick='apilib.products.delete({{idproduct}});'><span class='faright fa fa-trash fa-lg'></span></a>"  
					//<a href="#" class="align-middle"><span class="fa fa-edit fa-lg">
				}
			]

		};


		$("#listado").html( apilib._make_list(obj, false) );
		apilib.post_show();

	},

	add: function(){

		console.log('apilib.products.add');

        var obj_data = {

            title   : "Añadir Producto",

            columns : [

                { label : 'Nombre', 			name : 'name', 			type : 'text'},
                { label : 'Código', 	 	name : 'codigo', 		type : 'email' },
                { label : 'Descripción',   	name : 'description',	type : 'text' },
                {
                                label   :   'Marca',
                                name    :   'id_brand',
                                type    :   'select', /* text, data, number, email, texarea, select, html */
                                select  :   {
                                    data    : apilib.call("brands/get_list", {}).data,
                                    option_value    : "idbrand",
                                    option_show     : "name"
                                
                                }
                            },
                {
                                label   :   'Categoria',
                                name    :   'id_category',
                                type    :   'select', /* text, data, number, email, texarea, select, html */
                                select  :   {
                                    data    : apilib.call("categories/get_list", {}).data,
                                    option_value    : "idcategory",
                                    option_show     : "name"
                                
                                }
                            },

                { label : 'Stock',  		name : 'stock', 		type : 'number' },

                { 		label : 'IVA',			
                		name : 'taxes', 		
                		type : 'select',
	                    select : {
							data : [
								{"taxes": "21", "label": "21"},
								{"taxes": "10", "label": "10"}						
	               			],
							option_value: "taxes",
							option_show: "label"
					} },
                { label : 'PVD',  			name : 'pvd', 			type : 'number' },
                { label : 'PVP',  			name : 'pvp', 			type : 'number' }

            ],

            button : {
                type:   'secondary',
                text:   "Guardar", 
                onclick: "apilib.products.save_add();", 
            }

        };

        apilib._make_add(obj_data);
                
	},

	save_add: function(){

		console.log('apilib.products.save_add');

        var data = {
            name: $("#name").val(),
            codigo: $("#codigo").val(),
            description: $("#description").val(),
            id_brand: $("#id_brand").val(),
            id_category: $("#id_category").val(),
            stock: $("#stock").val(),
            taxes: $("#taxes").val(),
            pvd: $("#pvd").val(),
            pvp: $("#pvp").val()
        };

        // Call API
        var call = apilib.call("products/add", data);

        if( call.status == false ){
            apilib.alert("Ha ocurrido algún problema. ¿Estás seguro de haber completado todos los datos?", "danger");
        }else{
            
            apilib.alert("El producto ha sido añadido correctamente");
            
            // Cargamos la vista 
            this.list();
        }
    },

	edit: function(id){
		
		console.log('apilib.products.edit');
		
		// Recojo los datos del producto
        var datos = apilib.call("products/get", {'idproduct':id}).data;

        // Preparo el objeto
        var obj_data = {

            title   : "Editar Producto",

            // Aquí le pasamos los datos actuales
            data    : datos,

            columns : [

                { label : 'Nombre', 			name : 'name', 			type : 'text'},
                { label : 'Código', 	 	name : 'codigo', 		type : 'email' },
                { label : 'Descripción',   	name : 'description',	type : 'text' },
                {
                                label   :   'Marca',
                                name    :   'id_brand',
                                type    :   'select', /* text, data, number, email, texarea, select, html */
                                select  :   {
                                    data    : apilib.call("brands/get_list", {}).data,
                                    option_value    : "idbrand",
                                    option_show     : "name"
                                
                                }
                            },
                {
                                label   :   'Categoria',
                                name    :   'id_category',
                                type    :   'select', /* text, data, number, email, texarea, select, html */
                                select  :   {
                                    data    : apilib.call("categories/get_list", {}).data,
                                    option_value    : "idcategory",
                                    option_show     : "name"
                                
                                }
                            },

                { label : 'Stock',  		name : 'stock', 		type : 'number' },

                { 		label : 'IVA',			
                		name : 'taxes', 		
                		type : 'select',
	                    select : {
							data : [
								{"taxes": "21", "label": "21"},
								{"taxes": "10", "label": "10"}						
	               			],
							option_value: "taxes",
							option_show: "label"
					} },
                { label : 'PVD',  			name : 'pvd', 			type : 'number' },
                { label : 'PVP',  			name : 'pvp', 			type : 'number' }

            ],

            button : {
                type:   'success', // obligatorio
                text:   "Guardar", // obligatorio
                onclick: "apilib.products.save_edit("+id+");", // obligatorio
            }

        };

        apilib._make_edit(obj_data);
                
	},

	save_edit: function(id){

		console.log('apilib.products.save_edit');

        var data = {
        	idproduct: id,
            name: $("#name").val(),
            codigo: $("#codigo").val(),
            description: $("#description").val(),
            id_brand: $("#id_brand").val(),
            id_category: $("#id_category").val(),
            stock: $("#stock").val(),
            taxes: $("#taxes").val(),
            pvd: $("#pvd").val(),
            pvp: $("#pvp").val()
        };

        // Call API
        var call = apilib.call("products/edit", data);

        if( call.status == false ){
            apilib.alert("Ha ocurrido algún problema. ¿Estás seguro de haber completado todos los datos?", "danger");
        }else{
            
            apilib.alert("El producto ha sido modificado correctamente");
            
            // Cargamos la vista 
            this.list();
        }

    },

	delete: function(id){
		console.log('apilib.products.delete');
		
		// Call API
        var call = apilib.call("products/delete", {'idproduct':id});

        if( call.status == false ){
            apilib.alert("Ha ocurrido algún problema", "danger");
        }else{
            
            apilib.alert("El producto se ha eliminado correctamente");
            
            // Cargamos la vista 
            this.list();
        }
		
	},

	exportar_json : function(){

		// Call API
		var api = apilib.call("products/get_list");

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
	},

	stock: function(){

		console.log('apilib.products.stock');

		// Recuperamos la vista de los productos con menos de "quantity" unidades en stock
		var datos = {
			quantity : 100
		};

		// Recuperamos todos los abonos!
        var api = apilib.call("products/get_stock", datos);

        // Preparamos la vista
        var obj = {

            title    : "Listado Stock",

			data	: api.data,

			columns	: [

				{ 
					name : "name",
					head : "Nombre",				
				},			

				{ 
					name : "codigo",
					head : "Código",									
				},


				{
					name : "brand_name",
					head : "Marca",
				},
				{
					name : "category_name",
					head : "Categoría",
				},					

				{
					name : "stock",
					head : "Stock",
				},				

				{
					name : "taxes",
					head : "IVA",
				},
				{
					name : "pvd",
					head : "PVD",
				},
				{
					name : "pvp",
					head : "PVP",
				},
				{
					head : false,
					type : "html",
					data : "<a href='#' onclick='apilib.products.edit({{idproduct}});'><span class='fa fa-edit fa-lg'></span></a><a href='#' onclick='apilib.products.delete({{idproduct}});'><span class='faright fa fa-trash fa-lg'></span></a>" 
				}
			]

		};

        $("#subcontent").html( apilib._make_list(obj, false));
        apilib.post_show();
	}
	  
}
