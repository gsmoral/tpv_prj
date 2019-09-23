apilib_v1.prototype.users = {
	
	list: function(){

        console.log('apilib.users.list');

        // Carga la vista del menu de configuración
        apilib.configuracion.list();

        // Prepara las vistas
        $("#subcontent").html( apilib.parse_theme("vistas/usuarios", {}, false) );

        // Crea el listado
        this.recuperar_list();
    },

    recuperar_list: function(){

		console.log('apilib.users.recuperar_list');

		// Recuperamos todos los usuarios
        var api = apilib.call("users/get_list", {});

        // Preparamos la vista
        var obj = {

            title   : 'Listado Usuarios',    // Título de la página

            data    : api.data,     // Datos de la API

            // Columnas que queremos que tenga la tabla
            columns : [
                {
                    name : "name",
                    head : "Nombre <span class='fa fa-sort'></span>"
                },
                {
                    name : "surname",
                    head : "Apellidos <span class='fa fa-sort'></span>"
                },
                {
                    name : "email",
                    head : "email <span class='fa fa-sort'></span>"
                },
				{
					head : false,
					type : "html",
					data : "<a href='#' onclick='apilib.users.edit({{iduser}});'><span class='fa fa-edit fa-lg'></span></a><a href='#' onclick='apilib.users.delete({{iduser}});'><span class='faright fa fa-trash fa-lg'></span></a>"  
				}
            ]

        };

        $("#listado").html( apilib._make_list(obj, false));
        apilib.post_show();
	},

	add: function(){

		console.log('apilib.users.add');

        // Preparamos el formulario
        var obj_data = {

            title   : "Añadir usuario",

            columns : [

                { label : 'Nombre', 		name : 'name', 			type : 'text' },
                { label : 'Apellidos', 	 	name : 'surname', 		type : 'text' },
                { label : 'Email',   		name : 'email',			type : 'email'},
                { label : 'Password',    	name : 'password',    	type : 'password'
                },

                {
                    label: 'Tipo de usuario',    
                    name : 'profile',    
                    type : 'select',
                    select : {
						data : [
							{"profile": "Admin", "label": "Administrador"},
							{"profile": "User", "label": "Usuario"}						
               			],
						option_value: "profile",
						option_show: "label"
					}
 				}   

            ],

            button : {
                type:   'secondary',
                text:   "Guardar", 
                onclick: "apilib.users.save_add();", 
            }

        };

        apilib._make_add(obj_data);

	},

	save_add: function(){

		console.log('apilib.users.save_add');

        // Creamos el hash del password
		var password = apilib.users.make_hash($("#password").val());

        // Preparamos los datos que se enviarán
        var data = {
            name: $("#name").val(),
            surname: $("#surname").val(),
            email: $("#email").val(),
            password: password,
            profile: $("#profile").val()
        };

        // Call API
        var call = apilib.call("users/add", data);

        // Revisamos si todo ha ido bien
        if( call.status == false ){
            apilib.alert("Ha ocurrido algún problema. ¿Estás seguro de haber completado todos los datos?", "danger");
        }else{
            
            apilib.alert("El usuario se ha creado correctamente");
            
            // Cargamos la vista 
            this.list();
        }
    },

	edit: function(id){
		
		console.log('apilib.users.edit');
		
		// Recojo los datos de ese cliente
        var datos_cliente = apilib.call("users/get", {'iduser':id}).data;

        // Preparo el objeto
        var obj_data = {

            title   : "Editar Usuario",

            // Aquí le pasamos los datos actuales
            data    : datos_cliente,

            columns : [

                { label : 'Nombre', 		name : 'name', 			type : 'text' },
                { label : 'Apellidos', 	 	name : 'surname', 		type : 'text' },
                { label : 'Email',   		name : 'email',			type : 'email'},
                { label : 'Password',    	name : 'password',    	type : 'password'
                },

                {
                    label: 'Tipo de usuario',    
                    name : 'profile',    
                    type : 'select',
                    select : {
						data : [
							{"profile": "Admin", "label": "Administrador"},
							{"profile": "User", "label": "Usuario"}						
               			],
						option_value: "profile",
						option_show: "label"
					}
 				}

            ],

            button : {
                type:   'success', // obligatorio
                text:   "Guardar", // obligatorio
                onclick: "apilib.users.save_edit("+id+");", // obligatorio
            }

        };

        apilib._make_edit(obj_data);
                
	},

	save_edit: function(id){

		console.log('apilib.users.save_edit');

		var password = apilib.users.make_hash($("#password").val());

        var data = {
        	iduser: id,
            name: $("#name").val(),
            surname: $("#surname").val(),
            email: $("#email").val(),
            password: password,
            profile: $("#profile").val()
        };

        // Call API
        var call = apilib.call("users/edit", data);

        // Revisamos si todo ha ido bien
        if( call.status == false ){
            apilib.alert("Ha ocurrido algún problema. ¿Estás seguro de haber completado todos los datos?", "danger");
        }else{
            
            apilib.alert("El usuario ha sido modificado correctamente");
            
            // Cargamos la vista 
            this.list();
        }

    },

	delete: function(id){
		console.log('apilib.users.delete');
		
		// Call API
        var call = apilib.call("users/delete", {'iduser':id});

        if( call.status == false ){
            apilib.alert("Ha ocurrido algún problema", "danger");
        }else{
            
            apilib.alert("El usuario se ha eliminado correctamente");
            
            // Cargamos la vista 
            debugger
            this.list();
        }
		
	},

	//Encryptar la clave de usuario
    make_hash: function(val){
        var shaObj = new jsSHA("SHA-1", "TEXT");
        shaObj.update(val);
        return shaObj.getHash("HEX");
    }
	  
}
