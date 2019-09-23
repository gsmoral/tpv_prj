<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	public function index(){
		
		if($this->input->get("login")=="ok"){
			$this->load->view('panel');
		}else{
			$this->load->view('login');
		}

		//$this->load->view('panel');

	}
}
