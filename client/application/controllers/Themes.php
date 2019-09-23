<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Themes extends CI_Controller {

	function __construct(){
		Parent::__construct();

		/*		if(ID_USER==false){
			exit("Logeate primero");
		}
*/
	}

	public function download($base, $reference){
		$view = $base."/".$reference;
		$this->load->view($view);
	}

	public function api(){
		
		if($this->input->post("uri")){
			$data = [];

			if(is_array($this->input->post("data"))){
				$data = $this->input->post("data");
				
			}

			// KA_JSON
			if($this->input->post('ka_json', FALSE) != NULL){
				$data["ka_json"] = $this->input->post('ka_json', FALSE);
			}

			// Añade Token
			if($this->input->cookie("wailux_tok") != null){
				$data['token'] = base64_decode($this->input->cookie("wailux_tok"));
			}

			// Hace la petición
			echo $this->apilib->send($this->input->post("uri"), $data, true);

		}

	}

}
