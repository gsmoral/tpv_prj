<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Facturas extends KA_Model {

    public $data = [
        "table"  => "facturas",
        
		//"primary" => "ID",

		"add" => [
			"columns" => [
				"num_fact" => "int",
				"date",
                "total",
                "id_client" => "int",
                "id_user" => "int"
			]
 		],

		"edit" => [
			"optionals" => [
				"num_fact" => "int",
				"date",
                "total",
                "id_client" => "int",
                "id_user" => "int"               
            ],
			"where" => [
				"columns" => [
					'idfactura' => "int"
				]
			]
		],

		"get" => [
			"where" => [
				"columns" => [
					'idfactura' => "int"
				]
            ]
        ], 		

		"delete" => [
			"where" => [
				"columns" => [
					'idfactura' => "int"
				]
			],
		],

		
        "get_list" => [
        	"select" => "
        		facturas.*"
        ]


	];


	

}