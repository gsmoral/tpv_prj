/*
	FALTA:
	- Detectar compatibilidad
	- Moustache
	- Ajax asíncrono
*/

class apilib_v1{

	constructor(){
		console.log("Apilib iniciado 1.0");
		/* CONFIGURACIÓN */
			this.security = true;		// Define si usa tokens, securidad, etc.
			this.debug = false;			// Define si está habilitado el debug
			this.use_kajson = true;		// Define si los dados se envía en JSON
			this.delete_cache = true;	// Define si eliminamos la caché en cada carga

			if(this.delete_cache==true){
				this.delete_themes();
			}

		/* SEGURIDAD */
			this.token = false;			// *** No tocar
			this.token_info = false;	// *** No tocar
			// Comprobamos si tenemos token, etc.
			this.secure_token(); 


		// Descarga themes
		// this.download_theme("customer_id");
		// this.download_theme("list_customers");
		// this.download_theme("list_actions");
		// this.download_theme("settings");

//		this.show(window.localStorage.getItem("theme_tickets_list"));
	}

	download_theme(file){
		// Comprueba si está descargado
		if(window.localStorage.getItem("theme_"+file)==null){
			window.tmp_down = file;

			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {

				// Todo OK y todo descargado
				if (this.readyState == 4 && this.status == 200) {
					window.localStorage.setItem("theme_"+window.tmp_down, this.responseText);
					console.log("Descargado: "+window.tmp_down);
				}
				
			}
			xmlhttp.open("GET", "index.php/themes/download/"+file, false);
			xmlhttp.send();
		}

	}

	parse_theme(name, obj={}, show=false){

		var html = window.localStorage.getItem("theme_"+name);

		if(html == null){

			this.download_theme(name);
			var html = window.localStorage.getItem("theme_"+name);

		}

		return this.parse_html(html, obj, show);
	}

	parse_html(html, obj={}, show=false){
		/*var view = {title: "Joe", calc: function () {return 2 + 4; } };
		var output = Mustache.render("{{title}} spends {{calc}}", view);*/

		var output = Mustache.render(html, obj);

		// console.log(output);
		if(show){
			this.show(output);
		}else{
			return output;
		}
	}

	call(uri, obj={}){
		this.log("Datos enviados");
		this.log(obj);

		// Añado el token de sesión
		if(this.token != false){
			obj.ka_token = this.token;
		}

		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {

			// Todo OK y todo descargado
			if (this.readyState == 4 && this.status == 200) {
				//console.log("respuesta:");
				//console.log(this.responseText);
				window.last_json = this.responseText;
			}
		}

		xmlhttp.open("POST", "index.php/themes/api/", false);

		var data = new FormData();
		data.append("uri", uri);
		
		if(this.use_kajson == true){
			// Manda JSON
			data.append("ka_json", JSON.stringify(obj));
		}else{
			// Manda POST
			for(var index in obj) {data.append("data["+index+"]", obj[index]); }
		}


		xmlhttp.send(data);

		// Return
		try {
			return JSON.parse(window.last_json);
		} catch (e) {
			console.error("Se ha encontrado un error grave en la respuesta");
			console.warn(window.last_json);
			return false;
		}

	}

	show(html){
		document.getElementById("contenidoshow").innerHTML = html;

		this.post_show();
	}

	log(txtlog){
		if(this.debug == true){
			console.log(txtlog);
		}
	}

	/*
		Método personalizado que ejecuta un script tras mostrar una vista
	*/
	post_show(){

		// Tables
		$('#order-table').DataTable({  "searching": true, 'ordering':true});

		// Prepara theme
		//prepare_theme();

	}


	alert(text, type = "success"){
		// type: danger, warning, success

		jQuery.growl(text+"   ", { type: type, allow_dismiss: false });

	}
	
	/*
		Método personalizado que le pasas un objeto y te devuelve un select
		obj:		El objeto que le pasas y se va a recorrer
		id_select:	El ID que se le pondrá al select
		option_value:		El value
		option_show:		El elemento del objeto que se mostrará en los options
	*/
	make_select(obj, id_select, option_value, option_show, clase=false, onchange=false){



		var tmp_select = '<select id="'+id_select+'" name="'+id_select+'" '+(onchange != false ? " onchange='"+onchange+"' " : "")+' class="form-control fill '+(clase !== undefined ? clase : "")+'">';

		obj.forEach(element => {

			// No quiero que en los select salga el ID entre parentesis a continuación del nombre, lo quito
			//tmp_select += '<option value="'+element[option_value]+'">'+element[option_show]+' ('+element[option_value]+')</option>'
			tmp_select += '<option value="'+element[option_value]+'">'+element[option_show]+'</option>'
		});

		tmp_select += '</select>';

		return tmp_select;

	}

	_make_list(obj_data=false, show=true){

		// Comprueba que se le haya pasado algo
		if(!obj_data){
			console.log("No se le ha pasado un objeto ni datos");
			return;
		}


/*		var obj_data = {
			pre_title_html	: 'optiomal',

			title			: 'No optional',

			pre_table_html	: 'optiomal',

			data	: obj_data,
			columns	: [
				"ID",
				"nombre",
				"apellido",
				{
					name: "email",
					type: "a", //a, onclick, button_a, button_onclick
					data: "http:// or apilib",
					head: false // optional
				}
			],

			post_table_html	: 'optiomal'

		}
*/
		// Recorre las columnas
		var _head = "";
		obj_data.columns.forEach(element => {
			// Si es un string la columna
			if (typeof element === 'string' ){
				_head += "<th>"+element+"</th>";
			}else{
			// Si es un objeto

				// Si head no está definido
				if(typeof element.head === 'undefined'){
					_head += "<th>"+element.name+"</th>";
				}else if(typeof element.head === 'string'){
					_head += "<th>"+element.head+"</th>";
				}else{
					_head += "<th></th>";
				}
			}
		});

		var _columns = "";
		obj_data.columns.forEach(element => {
			if (typeof element === 'string' ){
				_columns += "<td>{{"+element+"}}</td>";
			}else{
				if(element.type == "a"){
					_columns += "<td><a href='"+element.data+"'>{{"+element.name+"}}</td>";
				}else if(element.type == "onclick"){
					_columns += "<td><a href='#' onclick='"+element.data+"'>{{"+element.name+"}}</td>";
				}else if(element.type == "onchange"){
					_columns += "<td><a href='#' onchange='"+element.data+"'>{{"+element.name+"}}</td>";
				}else if(element.type == "html"){
					_columns += "<td>"+element.data+"</td>";
				}else{
					_columns += "<td>{{"+element.name+"}}</td>";
				}
			}
		});

		var _html = `<div class="card-header">
        <h5>{{title}}</h5>
    </div>
	<div class="card-block">
	
		{{{pre_table_html}}}

        <div class="dt-responsive table-responsive">
            <table id="order-table" class="table table-striped table-bordered nowrap">
                <thead>
                    <tr>
					`+
					_head
					+`
                    </tr>
                </thead>
                <tbody id="filas-almacenes">
                {{#data}}
                    <tr>
					`+
					_columns
					+`
                    </tr>
                {{/data}}
                </tbody>
                <tfoot>
					<tr>
					`+
					_head
					+`
					</tr>

                </tfoot>
			</table>

			{{{post_table_html}}}

        </div>
	</div>`;

	
	return this.parse_html(_html, obj_data, show);

	}

	_make_get(obj_data=false, show=true){
	
		// Comprueba que se le haya pasado algo
		if(!obj_data){
			console.log("No se le ha pasado un objeto ni datos");
			return;
		}

		/*		var obj_data = {
			pre_title_html	: 'optiomal',

			title			: 'No optional',

			post_title	: 'optiomal',

			data	: obj_data,
			columns	: [
				"ID",
				"nombre",
				"apellido",
				{
					name: "email",
					type: "a", //a, onclick, button_a, button_onclick
					data: "http:// or apilib",
					head: false // optional
				}
			],

			post_table_html	: 'optiomal'

		}
*/

		var _column = "";
		obj_data.columns.forEach(element => {


			if (typeof element === 'string' ){

				_column += `<div class="form-group row">
					<label class="col-sm-2 col-form-label">`+element+`</label>
					<div class="col-sm-10">
						<div class="form-control-static">
							<span id="`+element+`"> {{data.`+element+`}} </span>
						</div>
					</div>
				</div>`;

			}else{
				_column += `<div class="form-group row">
					<label class="col-sm-2 col-form-label">`+element.name_label+`</label>
					<div class="col-sm-10">
						<div class="form-control-static">
							<span id="`+element.data_name+`"> {{data.`+element.data_name+`}} </span>
						</div>
					</div>
				</div>`;
			}

		});


		var _html = `<div class="card-header">
			{{{pre_title_html}}}
			<h5>{{{title}}}</h5>
			</div>
			<div class="card-block">
			{{{post_title_html}}}
			<form>

			`+_column+`

			{{{post_table_html}}}

			</form>
			</div>`;


		//apilib.log(_html);


		if(show){
			this.parse_html(_html, obj_data, true);
		}else{
			return this.parse_html(_html, obj_data, false);
		}



	}

	_make_edit(obj_data=false, show=true){


		// Parseamos el show
		if(typeof show !== "boolean"){
			// Montamos la estructura
			var ret = this._make_add(obj_data, false);
			document.getElementById(show).innerHTML = ret;
		}else{
			var ret = this._make_add(obj_data, show);
		}


		if(show === false){
			return ret;
		}else{

			obj_data.columns.forEach(element => {

				if( element.name !== undefined ){


					// Normaliza el date
					if(element.type == "date"){
						var tmp_iso = new Date(obj_data.data[element.name]).toISOString();
						var tmp_new_date = tmp_iso.slice(0, 10);
						obj_data.data[element.name] = tmp_new_date;
					}

					$("#"+element.name).val(obj_data.data[element.name]);

				}
				
			});

		}


	}

	_make_add(obj_data=false, show=true){

		// Inputs válidos
		var input = ["text", "date", "number", "email", "password" ];


		// Variable HTML
		var _html = "";

		// Recorremos las columnas
		obj_data.columns.forEach(element => {

			_html += `<div class="form-group row">
				<label class="col-sm-2 col-form-label">`+element.label+`</label>
				<div class="col-sm-10">`;

			var onchange = (typeof element.onchange == "undefined" ? "" : " onchange='"+element.onchange+"' ");

			// Si es input
			if(input.indexOf(element.type) >= 0){

				_html += `<input type="`+element.type+`" name="`+element.name+`" id="`+element.name+`" `+onchange+` class="form-control `+(element.class !== undefined ? element.class : "")+`" placeholder=" `+(element.placeholder !== undefined ? element.placeholder : "")+`" >`;

			// Si es SELECT
			}else if(element.type == "select"){

				// Detecta si mandamos el onchange
				if(typeof element.onchange == "undefined"){
					_html += this.make_select(element.select.data, element.name, element.select.option_value, element.select.option_show, element.class);
				}else{
					_html += this.make_select(element.select.data, element.name, element.select.option_value, element.select.option_show, element.class, element.onchange);					
				}

			// Si es HTML
			}else if(element.type == "html"){

				_html += element.html;

			// Si es TEXTAREA
			}else if(element.type == "textarea"){

				_html += `<textarea `+onchange+` class="form-control `+(element.class !== undefined ? element.class : "")+`" name="`+element.name+`" id="`+element.name+`" placeholder="`+(element.placeholder !== undefined ? element.placeholder : "")+`"></textarea>`;

			}

			_html += `</div> </div>`;

		});


		// ¿Existe botón?
		var _button = "";
		if(obj_data.button !== undefined){

			// Tipo de colores de bootstrap
			var type = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"];

			// Comprueba que se haya seleccionado uno correcto
			var type =  (type.indexOf(obj_data.button.type) >= 0 ? obj_data.button.type : "info");

			_button += `<br><br><button type="button" class="btn btn-mat waves-effect waves-light btn-`+type+`" onclick="`+obj_data.button.onclick+`">`+obj_data.button.text+`</button>`;

		}





		var _html = `<div class="card-header">
			{{{pre_title_html}}}
			<h5>{{{title}}}</h5>
			</div>
			<div class="card-block">
			{{{post_title_html}}}
			<form>

			`+_html+`

			{{{pre_button_html}}}

			`+_button+`

			{{{post_button_html}}}

			</form>
			</div>`;


		if(show){
			this.parse_html(_html, obj_data, true);
		}else{
			return this.parse_html(_html, obj_data, false);
		}


	}

	secure_token(){

		var ka_token = window.localStorage.getItem("ka_token");

		if(ka_token != null){

			// Comprobamos el token
			var ret = this.call("secure/info", {"ka_token": ka_token});

			// Si es válido
			if(ret.status){
				this.token = ka_token;
				this.token_info = ret.data;
			}else{
				// Eliminamos el token caducado
				window.localStorage.removeItem("ka_token");
			}

		}else{

		}

	}

	delete_themes(){
		console.log("#################\nOJO!!! localStorage.clear() ACTIVADO\n#################");
		//window.localStorage.clear();
		var count = 0;
		while(window.localStorage.key(count) != null){

			var tmp_name = window.localStorage.key(count);
			if (tmp_name.startsWith("theme_")){
				console.log("Eliminado: "+tmp_name);
				window.localStorage.removeItem(tmp_name);
			}else{
				count++;
			}

		}
		
	}

}

apilib_v1.prototype.secure = {

	login : function(obj_data){
		// obj_data debería de tener ka_login y ka_password

		var ret = apilib.call("secure/login", obj_data);

		if(ret.status){
			// Guarda el token
			apilib.token = ret.data.token;
			window.localStorage.setItem("ka_token", apilib.token);

			// Si devuelve mas datos
			if(ret.data.info){
				apilib.token_info = ret.data.info;
			}

			return ret.data;
		}else{
			// Error!
			return false;
		}

	},

	logout : function(){

		var ret = apilib.call("secure/logout");

		window.localStorage.removeItem("ka_token");
		apilib.token = null;
		apilib.token_info = null;

		return ret;


	}

}


apilib = new apilib_v1;
window.onload = function(){

}