apilib_v1.prototype.ticket = {

	compra : {},

	total_ticket : 0,

	
	list: function(){

		console.log('apilib.ticket.list');

		// Prepara las fechas
		apilib.parse_theme("vistas/ticket", {}, true);

		// Ponemos en foco en el input del formulario
		document.getElementById('code').focus();		

		// Recuperamos pruducto al ejecutar enter dentro del input code del formulario
		var recuperar = document.getElementById("code").onkeypress = function(e){
			console.log(e);
			if (e.key == "Enter"){
				apilib.ticket.recuperar_producto();
				$("#code").val("");
			}
		}
		
	},

	recuperar_list: function(){

		console.log('apilib.recuperar_list.list');

		var html = "";

		// Ponemos el ticket a 0
   		this.total_ticket = 0;

		for (let i in this.compra ) {
   			//console.log("ini");
   			//console.log(this.compra[i]); // logs "0", "1",
   			//console.log(this.compra[i]["codigo"]);
   			//console.log("fin");   			

   			html += `
                    <tr>

                    <td>`+this.compra[i]["cantidad"]+`</td>
			        <td><button onclick="apilib.ticket.plus_product('`+this.compra[i]["codigo"]+`');"><i class="fa fa-plus-square fa-2x"
		        	aria-hidden="true"></i></button>
			        <button onclick="apilib.ticket.minus_product('`+this.compra[i]["codigo"]+`');"><i class="fa fa-minus-square fa-2x"
			        aria-hidden="true"></i></button>
		        	</td>
			        <td>`+this.compra[i]["nombre"]+`</td>
			        <td>`+this.compra[i]["precio"]+`</td>
			        <td>`+this.compra[i]["total"]+`</td>
			        <td><button onclick="apilib.ticket.delete_product('`+this.compra[i]["codigo"]+`');"><i class="fa fa-trash fa-2x"
			        aria-hidden="true"></i></button></td>
                    </tr>
                	`;

            this.total_ticket += this.compra[i]["total"];
		}


		$("#listproducts").html(html);
		$("#total").html(this.total_ticket.toFixed(2));
		

		// Cargamos modal de cobro
		this.modal_cobro();


	},

	recuperar_producto: function(){

		console.log('apilib.ticket.recuperar_producto');

		code = $("#code").val();

		// Recojo los datos de ese cliente
        var datos_producto = apilib.call("products/getbycode", {'codigo':code}).data;

        if (datos_producto == null) {      
			    alert("El código de producto no existe");
			    return false;  
		}  

		//console.log(datos_producto);

		if( this.compra[datos_producto.codigo] === undefined ){
			// Generamos el objeto con los datos de interés del producto
			var obj = {
				codigo: datos_producto.codigo,
				nombre: datos_producto.name,
				pvd: datos_producto.pvd,
				precio: datos_producto.pvp,
				idproduct: datos_producto.idproduct,
				taxes: datos_producto.taxes,
				cantidad: 1,
				total: datos_producto.pvp * 1
			};

			// Añadimos el producto al carrito
			this.compra[datos_producto.codigo] = obj;
		}else{

			this.compra[datos_producto.codigo].cantidad++;
			this.compra[datos_producto.codigo].total = this.compra[datos_producto.codigo].precio * this.compra[datos_producto.codigo].cantidad;

		}

		//console.log(this.compra);

		//$("#listado").html( apilib._make_list(obj, false) );
		// Crea el listado
		this.recuperar_list();

	},

	delete_product: function(id){

		console.log('apilib.ticket.delete_product');

		// Borramos el objeto y recargamos la vista
		delete this.compra[id];
		this.recuperar_list();

	},

	plus_product: function(id){

		console.log('apilib.ticket.plus_product');

		// Añadimos un producto y recalculamos total
		this.compra[id].cantidad++;
		this.compra[id].total = this.compra[id].precio * this.compra[id].cantidad;

		// Recargamos la vista
		this.recuperar_list();

	},

	minus_product: function(id){

		console.log('apilib.ticket.minus_product');

		if (this.compra[id].cantidad == 1){
			this.delete_product(id);
		} else {
			// Eliminamos un producto y recalculamos total
			this.compra[id].cantidad--;
			this.compra[id].total = this.compra[id].precio * this.compra[id].cantidad;

		}

		// Recargamos la vista
		this.recuperar_list();

	},

	modal_cobro: function(){

		console.log('apilib.tickets.modal_cobro');

		// Borramos valores al ejcutar el botón de cobro
		$("#cobrado").val(null);
		$("#cambio").val(null);

		// Recuperamos el precio total del ticket
		$("#precio_total").val(this.total_ticket.toFixed(2));

		// Vamos calculando el cambio mientras entramos el 
		$("#cobrado").keyup(function(e){

			// Calculamos el cambio
			var calculo = ($("#cobrado").val() - $("#precio_total").val()).toFixed(2);
			// Lo mostramos
			$("#cambio").val( calculo );
			// Cambiamo el color del texto si el resultado es negativo
			if (calculo < 0) { $("#cambio").css({ "color": "#ff0000", "font-weight": "bold" }); 
			} else { 
				$("#cambio").css({ "color": "#000", "font-weight": "bold"  });
			}
				   	   
		});

		// Get the modal
		var modal = document.getElementById("myModal");

		// Get the button that opens the modal
		var btn = document.getElementById("myBtn");

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];

		// When the user clicks the button, open the modal 
		btn.onclick = function() {
		  modal.style.display = "block";
		  $("#cobrado").focus();
		}

		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		  modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
/*		window.onclick = function(event) {
		  if (event.target == modal) {
		    modal.style.display = "none";
		  }
		}*/

	},

	guardar_ticket: function(){

		console.log('apilib.ticket.guardar_ticket');

		// Creamos el ticket
		var data_ticket = {
			compra: this.compra,
            total: this.total_ticket
        };

        console.log(data_ticket);

        // Call API
        var call = apilib.call("tickets/add_compra", data_ticket);

        if( call.status == false ){
            apilib.alert("Ha ocurrido algún problema.");
        }else{
            
            // Importa la campaña
            apilib.alert("Ticket creado correctamente");
            
            // Vaciomos ticket y total y cargamos la vista
            this.compra = {};
			this.total_ticket = 0; 
            this.list();
        }

	},

	/*estadisticas: function(){
		console.log('apilib.ticket.estadisticas');

		// Carga la vista
		apilib.parse_theme("vistas/estadisticas", {}, true);

		// Prepara las fechas en las vistas
		this.prepara_time();

		// Carga la vista
		this.por_dias_recuperar();


	},

	estadisticas_recuperar(){
		console.log("apilib.ticket.estadisticas_recuperar");

		var datos = {
			periodo: "diaria",
			desde : $("#desde").val(),
			hasta : $("#hasta").val()
		};

		// Recuperamos los datos
		var datos_ddbb = apilib.call("tickets/recuperar", datos).data;


		// Creamos un array vacíos dónde introduciremos los datos
		// Con un formato compatible con google
		var data_array = [];

		// Añadimos el primer array al array
		data_array.push(["Día", "Impreso", "No impreso"]);

		// Recorremos los datos de la DDBB
			// Y creamos un nuevo array con el formato de google
		datos_ddbb.forEach(function(elemento){

			console.log(elemento);

			var tmp = [elemento.dia_mes, parseFloat(elemento.si_impreso),  parseFloat(elemento.no_impreso)];

			// Lo añadimos con el push a data_array
			data_array.push(tmp);

		});


		apilib.grafico.render_lineal("grafico", 'Ventas por días', data_array);


	},*/
	  
}
