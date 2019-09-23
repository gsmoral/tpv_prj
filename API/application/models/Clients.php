<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Clients extends KA_Model {

    public $data = [
        "table"  => "clients",
        
		//"primary" => "ID",

		// $razon_social, $nif, $calle, $codigo_postal, $poblacion, $provincia, $email = null
		"add" => [
			"columns" => [
                "razon_social",
                "nif",
                "calle",
                "codigo_postal",
                "poblacion",
                "provincia"
			],
			"optionals" => [
                "email"
			]
 		],

		"edit" => [
			"optionals" => [
                "razon_social",
                "nif",
                "calle",
                "codigo_postal",
                "poblacion",
                "provincia",
                "email"               
            ],
			"where" => [
				"columns" => [
					'idclient' => "int"
				]
			]
		],

		"get" => [
			"where" => [
				"columns" => [
					'idclient' => "int"
				]
            ]
        ], 		

		"delete" => [
			"where" => [
				"columns" => [
					'idclient' => "int"
				]
			],
		],

		
        "get_list" => [
        	"select" => "
        		clients.*"
        ]


	];

	// Esta función finalmente no se ha utilizado
	function search ($data){


		$searchStr = $data['searchStr'];


		$datos = $this->db
					->where('MATCH (`razon_social`, `nif`, `email`, `calle`, `codigo_postal`, `poblacion`, `provincia`) AGAINST ( "'.$searchStr.'" )', NULL, FALSE)
					->get('clients');


		$datos = $datos->result_array();

		return $datos;		
	}


	

}