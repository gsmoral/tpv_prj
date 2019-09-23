apilib_v1.prototype.estadisticas = {
	
	por_dias: function(){
		console.log('apilib.estadisticas.pordias');

		// Carga la vista
		//apilib.parse_theme("vistas/estadisticas", {}, true);
		$("#subcontent").html( apilib.parse_theme("vistas/estadisticas", {}, false) );

		// Prepara las fechas en las vistas
		this.prepara_time();

		// Carga la vista
		this.por_dias_recuperar();

	},

	por_dias_recuperar: function(){

		console.log("apilib.estadisticas.pordiasrecuperar");

		// Recuperamos los datos del formulario
		var datos = {
			desde : $("#desde").val(),
			hasta : $("#hasta").val()
		};

		//console.log(datos);

		// Recuperamos los datos
		var datos_ddbb = apilib.call("ticket_line/get_by_date", datos);

		//console.log(datos_ddbb);

		// Preparamos la vista
        var obj = {

            title   : 'Productos más vendidos',    // Título de la página

            //pre_table_html : '<button class="btn btn-success" type="button" onclick="apilib.users.add();">Añadir usuario</button>',

            data    : datos_ddbb.data,     // Datos de la API

            // Columnas que queremos que tenga la tabla
            columns : [
                // Columna ID con un enlace
                {
                    name : "product_name",
                    head : "Nombre"
                },
                {
                    name : "product_code",
                    head : "Código"
                },
                {
                    name : "unidades_total",
                    head : "Unidades"
                }
            ]

        };

        $("#estadistica").html( apilib._make_list(obj, false) );

        // Preparamos la vista
        var obj2 = {

            title   : 'Productos más rentables',    // Título de la página

            //pre_table_html : '<button class="btn btn-success" type="button" onclick="apilib.users.add();">Añadir usuario</button>',

            data    : datos_ddbb.data,     // Datos de la API

            // Columnas que queremos que tenga la tabla
            columns : [
                // Columna ID con un enlace
                {
                    name : "product_name",
                    head : "Nombre"
                },
                {
                    name : "product_code",
                    head : "Código"
                },
                {
                    name : "diferencia",
                    head : "Rentabilidad"
                }
            ]

        };


        //apilib._make_list(obj);
        $("#estadistica2").html( apilib._make_list(obj2, false) );

        // Ordenamos las tabla que mostramos
		$('.table').DataTable({  "searching": true, 'ordering':true, "order": [[ 2, 'desc' ]]});

		// Preparamos la gráfica de productos más vendiddo
		this.grafico_venta(datos_ddbb);

		// Preparamos la gráfica de productos más vendiddo
		this.grafico_beneficios(datos_ddbb);

	},

	prepara_time: function(){

		// Calculamos las fechas que mostramos
		var treindias = new Date();
		treindias.setDate(treindias.getDate() - 30);
		treindias = new Date(treindias).toISOString().substring(0, 10);

		// Ponemos la fecha en el formulario
		$("#desde").val(treindias);
		$("#hasta").val(new Date().toISOString().substring(0, 10));
	
	},

	grafico_venta: function(datos){

		console.log("apilib.estadisticas.grafico_venta");

		// Ordenamos por diferencia
        dataOrder = datos.data.sort(function(a, b){

			return b.unidades_total - a.unidades_total;

			});

        //console.log(dataOrder);

		// Creamos un array vacíos dónde introduciremos los datos, con un formato compatible con google
		var data_array = [];

		// Añadimos el primer array al array
		data_array.push(["Producto", "Unidades"]);

		// Recorremos los datos de la DDBB
		// Y creamos un nuevo array con el formato de google y solo con los 15 primeros elementos para no cargar la gráfica
		dataOrder.slice(0,15).forEach(function(elemento){

			//console.log(elemento);

		 	var tmp = [elemento.product_name, parseFloat(elemento.unidades_total)];

		 	// Lo añadimos con el push a data_array
		 	data_array.push(tmp);

		 });

		apilib.grafico.render_barras("grafico", 'Estadísticas de venta', data_array);

	},

	grafico_beneficios: function(datos){

		console.log("apilib.estadisticas.grafico_beneficios");

		// Ordenamos por diferencia
        dataOrder = datos.data.sort(function(a, b){

			return b.diferencia - a.diferencia;

			});

        //console.log(dataOrder);

		// Creamos un array vacíos dónde introduciremos los datos, con un formato compatible con google
		var data_array = [];

		// Añadimos el primer array al array
		data_array.push(["Producto", "Beneficio x unidad"]);

		// Recorremos los datos de la DDBB
		// Y creamos un nuevo array con el formato de google y solo con los 15 primeros elementos para no cargar la gráfica
		dataOrder.slice(0,15).forEach(function(elemento){

			//console.log(elemento);

		 	var tmp = [elemento.product_name, parseFloat(elemento.diferencia)];

		 	// Lo añadimos con el push a data_array
		 	data_array.push(tmp);

		 });

		apilib.grafico.render_barras("grafico2", 'Estadísticas de beneficios', data_array);

	}
}
