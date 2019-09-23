<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Brands extends KA_Model {

    public $data = [
        "table"  => "brands",
        
		//"primary" => "ID",

		"add" => [
			"columns" => [
                "name"
			]
 		],

		"edit" => [
			"optionals" => [
                "name"               
            ],
			"where" => [
				"columns" => [
					'idbrand' => "int"
				]
			]
		],

		"get" => [
			"where" => [
				"columns" => [
					'idbrand' => "int"
				]
            ]
        ], 		

		"delete" => [
			"where" => [
				"columns" => [
					'idbrand' => "int"
				]
			],
		],

		
        "get_list" => [
        	"select" => "
        		brands.*"
        ]


	];

	function search ($data){

		$searchStr = $data['searchStr'];

		$datos = $this->db
					->like('name', $searchStr)
					->get('brands');


		$datos = $datos->result_array();

		return $datos;		
	}
	

}