<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class KA_API_Controller extends CI_Controller {

	public function __construct(){
		Parent::__construct();

		$this->load->library("Apilib");

		$this->native_method = ["get", "get_list", "add", "edit", "delete"];

		// Recogemos datos
		if($this->input->post("ka_json") == null){
			$this->_ka_post = $this->input->post();
		}else{
			$this->_ka_post = json_decode($this->input->post("ka_json"), true);
		};

		// Cargamos el módulo de seguridad
		if(@$this->secures == NULL){
			
			// Carga booleano de si es seguro o no
			$this->is_secure = $this->secure();

		};
	}

	public function _remap($reference, $method=null){


		$method = @$method[0];
	
		// Comprueba si el reference es válido
		if( is_array(@$this->data[$reference]) ){

			if(!$this->is_secure){
				$this->apilib->error("token not valid");
				$this->apilib->generate(true);
				exit;
			}


			// Normaliza el array de los métodos disponibles
			$available_meth = $this->_order_array($this->data[$reference]["methods"]);

			// Comprueba si existe el método
			if( is_array(@$available_meth[$method]) ){

				// Ejecutamos el modelo
				if (is_string(@$this->data[$reference]["model"]) ){
					$this->model_name = $this->data[$reference]["model"];
					$this->load->model($this->data[$reference]["model"]);

				}elseif( is_array(@$this->data[$reference]["model"]) ){

					if( isset($this->data[$reference]["model"]["alias"] ) ){
						$this->model_name = $this->data[$reference]["model"]["alias"];
						$this->load->model($this->data[$reference]["model"]["name"], $this->data[$reference]["model"]["alias"]);
					}else{
						$this->model_name = $this->data[$reference]["model"]["name"];
						$this->load->model($this->data[$reference]["model"]["name"]);
					}


				}else{
					$this->apilib->error("Error a la hora de ejecutar el modelo");
				}


				// ¿Es fichero?
				if( isset($available_meth[$method]["exec"]) ){
					// Se ejecuta el fichero

					if(file_exists( "application/controllers/{$this->data[$reference]["folder"]}/{$method}.php" )){
						// Si encuentra el fichero
						include_once("application/controllers/{$this->data[$reference]["folder"]}/{$method}.php");
					}else{
						// Si no encuentra el fichero
						return false;
					}
				}else{
					// Se ejecuta la función
					$tmp = $this->{$this->model_name}->{$method}( $this->_ka_post );

					$this->apilib->data($tmp);

				}

			}else{
				$this->apilib->error("No existe el method");
			}

		
		}elseif($reference == "secure"){

				
			switch ($method) {
				case 'login':
					$tmp = $this->secure_login($this->_ka_post);
					break;

				case 'logout':
					$tmp = $this->secure_logout($this->_ka_post);
					break;

				case 'info':
					$tmp = $this->secure_info($this->_ka_post);
					break;

				default:
					# code...
					break;
			}

			$this->apilib->data($tmp);

		}else{
			$this->apilib->error("No existe el reference");
		}

		$this->apilib->generate(true);

	}

	/**
	 * @see		Función que normaliza el array data de la API
	 * @param	$param		El array a normalizar
	 * @return	array	Devuelve el array normalizado
	 */
	public function _order_array($array){

		$new_array = [];

		foreach ($array as $key => $value) {
			if( is_int($key) ){
				$new_array[$value] = [];
			}else{
				$new_array[$key] = $value;
			}
		}

		return $new_array;

	}

	// Miramos si tiene cookie (ka_token) o post (ka_token)
	public function secure(){

//		$this->_ka_post["ka_token"] = "be8b3dabc36b9ca118a18e61f71c5e25adb2b60e";
		$_is_secure = false;

		// Cookie
		$token = ($this->input->cookie("ka_token") != null
			? $this->input->cookie("ka_token")
			: (
				empty($this->_ka_post["ka_token"]) == true
					? null
					: $this->_ka_post["ka_token"]
			));

		if($token != null){
			
			// Comprueba si el token es correcto
			$select = ( (isset($this->secure["select"]))? $this->secure["select"] : "*" );

			$q = $this->db
				->select($select)
				->from($this->secure["table_user"])
				->where($this->secure["token"], $token)
				->get();

				if($q->num_rows() == 1){
					// Recupera los datos
					$q = $q->row_array();

					// Crea las constantes en el sistema
					define("KA_ID_UNIQUE", $q[$this->secure["column"]["unique_column"]]);
					define("KA_USER_UNIQUE", $q[$this->secure["column"]["users"]]);
					define("KA_TOKEN", $token);

					$this->all_user_info = $q;

					$_is_secure = true;
				}

		}

		return $_is_secure;
	}

	// Recibimos ka_user y ka_pass y lo validamos
	public function secure_login($data){

/*		$data = [
			"ka_user" => "luis.peris@kaira.es",
			"ka_password" => "123321"
		];
*/
		// Columnas User
		$user_column = $this->secure["column"]["users"];
		$ka_user = @$data["ka_user"];

		if(is_array($this->secure["column"]["password"])){
		
			$pass_column = $this->secure["column"]["password"]["name_col"];

			switch ($this->secure["column"]["password"]["encrypt"]) {
				case 'md5': $ka_pass = md5(@$data["ka_password"]); break;

				case 'sha1': $ka_pass = sha1(@$data["ka_password"]); break;
				
				default: $ka_pass = @$data["ka_password"]; break;
			}
		}else{
			$ka_pass = @$data["ka_password"];
		}

		$pass_column = ( is_array($this->secure["column"]["password"]) ? $this->secure["column"]["password"]["name_col"] : $this->secure["column"]["password"] );

		$select = ( (isset($this->secure["select"]))? $this->secure["select"] : $this->secure["column"]["unique_column"] );

		$num = $this->db
			->select($select)
			->from($this->secure["table_user"])
			->where($user_column, $ka_user)
			->where($pass_column, $ka_pass)
			->get();


		if($num->num_rows() == 1){

			$q = $num->row_array();

			// éxito
			if( !empty($this->secure["token"]) ){

				$token = sha1(rand(1000000, 10000000).rand(1000000, 10000000).$ka_pass.$ka_user.time().@$this->secure["salt"]);

				$this->db
					->where($this->secure["column"]["unique_column"], $q[$this->secure["column"]["unique_column"]])
					->set($this->secure["token"], $token)
					->update($this->secure["table_user"]);

				$q["token"] = $token;
				if(isset($this->secure["select"])){
					$_tmp = [
						"token" => $token,
						"info" => $q
					];
					return $_tmp;
				}else{
					return ["token"=>$token];
				}

			}

		}else{

			$this->apilib->error("user/pass incorrectos");

		}

	}

	function secure_logout($data){

		if($this->is_secure == true){

			$token = sha1(rand(1000000, 10000000).rand(1000000, 10000000).time().@$this->secure["salt"]);

			$this->db
				->where($this->secure["token"], KA_TOKEN)
				->set($this->secure["token"], $token)
				->update($this->secure["table_user"]);

		}else{
			$this->apilib->error("expired token");
		}

	}


	function secure_info($data){

		if($this->is_secure == true){

			return $this->all_user_info;

		}else{
			$this->apilib->error("expired token");
		}

	}


}

include_once('Controller_kaira.php');