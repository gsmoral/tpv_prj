<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Factura_line extends KA_Model {

    public $data = [
        "table"  => "factura_lines",
        
		//"primary" => "ID",

		"add" => [
			"columns" => [
				"product_name",
                "product_code",
                "quantity",
                "taxes",
                "price",
                "id_factura" => "int",
                "id_product" => "int"
			],"optionals" => [
                "total"               
            ]
 		],

		"edit" => [
			"optionals" => [
				"product_name",
                "product_code",
                "quantity",
                "taxes",
                "price",
                "total",
                "id_factura" => "int",
                "id_product" => "int"               
            ],
			"where" => [
				"columns" => [
					'idfactura_lines' => "int"
				]
			]
		],

		"get" => [
			"where" => [
				"columns" => [
					'idfactura_lines' => "int"
				]
            ]
        ], 		

		"delete" => [
			"where" => [
				"columns" => [
					'idfactura_lines' => "int"
				]
			],
		],

		
        "get_list" => [
        	"select" => "
        		factura_lines.*",
        	"where" => [
                "optionals" => [
                    'id_factura' => "int"
                ]
            ]
        ]


	];


	

}