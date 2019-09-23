apilib_v1.prototype.init = {
	
	/* GET */
	login: function(){
		var ka_user = $("#ka_user").val();
		var ka_password = $("#ka_password").val();

		var res = apilib.secure.login({
			'ka_user'	: ka_user,
			'ka_password': ka_password
		});

		if( res == false){
			alert("Datos incorrectos.");
		}else{
			location.href = '?login=ok';
		}

	}

}

window.onload = function(){
	
	if( apilib.token != false ){
		location.href = '?login=ok';
	}

	//console.log(apilib.token);
}

