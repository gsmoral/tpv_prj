<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Products_log extends KA_Model {

    public $data = [
        "table"  => "products_log",
        
		//"primary" => "ID",

		"add" => [
			"columns" => [
				"change_type",
				"change_description",
				"created_at",
				"id_user" => "int",
                "id_product" => "int"
			]
 		],


		"get" => [
			"where" => [
				"columns" => [
					'idproduct_log' => "int"
				]
            ]
        ], 		

		
        "get_list" => [
        	"select" => "
        		products_log.*"
        ]


	];


	

}