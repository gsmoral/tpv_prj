<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Products extends KA_Model {

    public $data = [
        "table"  => "products",
        
		"primary" => "ID",

		"add" => [
			"columns" => [
                "name",
                "codigo",
                "pvd",
                "pvp",
                "taxes",
                "id_brand" => "int",
                "id_category" => "int"
			],
			"optionals" => [
                "description",
                "stock" => "int",
                "image"
			]
 		],

		"edit" => [
			"optionals" => [
                "name",
                "codigo",
                "pvd",
                "pvp",
                "taxes",
                "id_brand" => "int",
                "id_category" => "int",
                "description",
                "stock" => "int",
                "image"               
            ],
			"where" => [
				"columns" => [
					'idproduct' => "int"
				]
			]
		],

		"get" => [
			"where" => [
				"columns" => [
					'idproduct' => "int"
				]
            ]
        ], 		

		"delete" => [
			"where" => [
				"columns" => [
					'idproduct' => "int"
				]
			],
		],

		
        "get_list" => [
        	"select" => "
        		products.*,
        		brands.name as brand_name,
        		categories.name as category_name",
        	"join" => [
        		"categories" => [
        			"on" => "categories.idcategory = products.id_category",
        			"type" => "left"],
        		"brands" => [
        			"on" => "brands.idbrand = products.id_brand",
        			"type" => "left"]
        	]

        ]


	];

	function getByCode ($data){

		$code = $data['codigo'];

		$datos = $this->db
					->where('codigo', $code)
					->get('products');

		$datos = $datos->row_array();

		return $datos;		
	}

	function get_stock ($data){

		$quantity = $data['quantity'];

		//var_dump($quantity);

		$datos = $this->db
				->select("products.*, brands.name as brand_name, categories.name as category_name")
				->from('products')
				->join("brands", "brands.idbrand = products.id_brand", "left")
				->join("categories", "categories.idcategory = products.id_category", "left")
				->where('stock <=', $quantity)
				->order_by('stock', 'DESC')
				->get()
				->result();

		return $datos;		
	}

	// Esta función finalmente no se ha utilizado
	function search ($data){


		$searchStr = $data['searchStr'];

		$datos = $this->db
					->where('MATCH (`name`, `codigo`, `description`) AGAINST ( "'.$searchStr.'" )', NULL, FALSE)
					->get('products');


		$datos = $datos->result_array();

		return $datos;		
	}
	

}