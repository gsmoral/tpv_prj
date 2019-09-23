<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Tickets extends KA_Model {

    public $data = [
        "table"  => "tickets",
        
		//"primary" => "ID",

		"add" => [
			"columns" => [
                "total"
			]
 		],

		"edit" => [
			"optionals" => [
				"date",
                "total"               
            ],
			"where" => [
				"columns" => [
					'idticket' => "int"
				]
			]
		],

		"get" => [
			"where" => [
				"columns" => [
					'idticket' => "int"
				]
            ]
        ], 		

		"delete" => [
			"where" => [
				"columns" => [
					'idticket' => "int"
				]
			],
		],

		
        "get_list" => [
        	"select" => "tickets.*, Date_format(tickets.date,'%d/%m/%Y') as dia, Date_format(tickets.date,'%H:%i') as hora"
        ]


	];

	function add_compra ($data){

		//var_dump($data["compra"]);

		// Insertamos el registro en la base de datos
		$dataTicket = array(
		 	'date' => date("Y-m-d H:i:s"),
		 	'total' => $data["total"]);

		$this->db->insert('tickets', $dataTicket);

		// Devolvemos id del registro creado
		$id_ticket = $this->db->insert_id();

		foreach ($data["compra"] as $key => $value) {
			var_dump($value["nombre"]);

			// Insertamos el registro en la base de datos
			$dataTicketLine = array(
				'product_name' => $value["nombre"],
				'product_code' => $value["codigo"],
				'quantity' => $value["cantidad"],
				'taxes' => $value["taxes"],
				'pvd' => $value["pvd"],
				'price' => $value["precio"], 
				'total' => $value["total"], 
				'id_ticket' => $id_ticket, 
				'id_product' => $value["idproduct"]);

			$this->db->insert('ticket_lines', $dataTicketLine);
			
			// Devolvemos id del producto creado
			//return $this->db->insert_id();

		}
	
	}
	

}