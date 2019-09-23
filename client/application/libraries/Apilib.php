<?php if ( ! defined('BASEPATH')) exit('No se permite acceso directo al script');

class Apilib {

	private $url = API;

	public function send($request, $array=[], $json=false){
		// Podría mirar si empieza por "/" y sino lo para...
		$url = $this->url.$request;
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, $url); // URL
		curl_setopt($ch, CURLOPT_POST, 2);	//
		curl_setopt($ch, CURLOPT_POSTFIELDS, $array);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		$result = curl_exec($ch);

		curl_close($ch);

		if($json){
			return $result;
		}else{
			return json_decode($result, true);
		}
	}

}