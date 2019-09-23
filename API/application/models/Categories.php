<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Categories extends KA_Model {

    public $data = [
        "table"  => "categories",
        
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
					'idcategory' => "int"
				]
			]
		],

		"get" => [
			"where" => [
				"columns" => [
					'idcategory' => "int"
				]
            ]
        ], 		

		"delete" => [
			"where" => [
				"columns" => [
					'idcategory' => "int"
				]
			],
		],

		
        "get_list" => [
        	"select" => "
        		categories.*"
        ]


	];

	function search ($data){

		$searchStr = $data['searchStr'];

		$datos = $this->db
					->like('name', $searchStr)
					->get('categories');


		$datos = $datos->result_array();

		return $datos;		
	}
	

}