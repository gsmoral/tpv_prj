<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ticket_line extends KA_Model {

    public $data = [
        "table"  => "ticket_lines",
		//"primary" => "ID",

		"add" => [
			"columns" => [
				"product_name",
                "product_code",
                "quantity",
                "taxes",
                "price",
                "id_ticket" => "int",
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
                "id_ticket" => "int",
                "id_product" => "int"               
            ],
			"where" => [
				"columns" => [
					'idticket_lines' => "int"
				]
			]
		],

		"get" => [
			"where" => [
				"columns" => [
					'idticket_lines' => "int"
				]
            ]
        ], 		

		"delete" => [
			"where" => [
				"columns" => [
					'idticket_lines' => "int"
				]
			],
		],

		
        "get_list" => [
        	"select" => "
        		ticket_lines.*",
        	"where" => [
                "optionals" => [
                    'id_ticket' => "int"
                ]
            ]
        ], 		

		"delete_all_by_ticket" => [
			"where" => [
				"columns" => [
					'id_ticket' => "int"
				]
			],
		]


	];

	function get_by_date($data){

		$fecha_inicio = $data['desde'];
		$fecha_fin = $data['hasta'];

		//var_dump($fecha_inicio);
		//echo "Hola";

		$datos = $this->db->query("SELECT *, SUM(ticket_lines.quantity) as unidades_total, (ticket_lines.price - ticket_lines.pvd) as diferencia FROM ticket_lines LEFT JOIN tickets ON ticket_lines.id_ticket = tickets.idticket WHERE tickets.date BETWEEN '{$fecha_inicio}' AND '{$fecha_fin} 23:59:59' GROUP BY ticket_lines.product_code ORDER BY unidades_total DESC");

		//$datos = $this->db->query("SELECT *,SUM(ticket_lines.quantity) unidades_total FROM ticket_lines LEFT JOIN tickets ON ticket_lines.id_ticket = tickets.idticket GROUP BY ticket_lines.product_code ORDER BY unidades_total DESC");

		//$datos = $this->db->query("SELECT * FROM ticket_lines");

		$datos = $datos->result_array();	

		return $datos;
	}

	function delete_all_by_ticket($data){

		$id_ticket = $data['id_ticket'];

		//var_dump($fecha_inicio);
		//echo "Hola";

		//$datos = $this->db->query("SELECT *, SUM(ticket_lines.quantity) as unidades_total, (ticket_lines.price - ticket_lines.pvd) as diferencia FROM ticket_lines LEFT JOIN tickets ON ticket_lines.id_ticket = tickets.idticket WHERE tickets.date BETWEEN '{$fecha_inicio}' AND '{$fecha_fin} 23:59:59' GROUP BY ticket_lines.product_code ORDER BY unidades_total DESC");

		//$datos = $this->db->query("SELECT *,SUM(ticket_lines.quantity) unidades_total FROM ticket_lines LEFT JOIN tickets ON ticket_lines.id_ticket = tickets.idticket GROUP BY ticket_lines.product_code ORDER BY unidades_total DESC");

		$this->db->query("DELETE FROM ticket_lines WHERE ticket_lines.id_ticket = '{$id_ticket}'");

		//$datos = $this->db->query("SELECT * FROM ticket_lines");

		//DELETE FROM `ticket_lines` WHERE `id_ticket` = 1

		//$datos = $datos->result_array();	

		return true;
	}

	

}