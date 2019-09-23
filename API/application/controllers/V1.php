<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class V1 extends KA_API_Controller {


	public $secure = [
		"table_user" => "users", 		// tabla
		"column" => [
			"unique_column" => "iduser",	// Dato único dónde se harán LEFT JOINS, etc.
			"users" => "name",			// User que se mandará
			"password" =>   [			// Puede ser texto plano o no
				"name_col" => "password",	// [opt] Nombre de la columna
				"encrypt" => "sha1"			// [opt] sha1, md5, text
			]
		],
		"token"	=> "token",				// Nombre de la columna del token
		"salt"	=> "something",			// [opt] Salta que se usa en la generación de tokens
		"select" => "*",				// [opt] Las columnas que devolverá. Tiene que estar unique_column
		"ID_admin" => [					// [opt] Datos del admin con todos los permisos
			"name_ID" => "ID",
			"value" => "1"
		]
	];

    public $data = [

    	// Productos
		"products" => [
			"model" => "Products", /* Podemos meterle alias */
			"folder" => "products", /* Si no se pone se coge el string de "modelo" */
			"methods" => [
				"add",
				"edit",
				"delete",  
				"get",
				"getbycode",
				"get_list",
				"get_stock",        				
			]
		],

		// Users
		"users" => [
			"model" => "Users", /* Podemos meterle alias */
			"folder" => "users", /* Si no se pone se coge el string de "modelo" */
			"methods" => [
				"add",
				"edit",
				"delete", 
				"get",
				"get_list",
                "change_password",
			]
		],

		// Categorias
		"categories" => [
			"model" => "Categories", /* Podemos meterle alias */
			"folder" => "categories", /* Si no se pone se coge el string de "modelo" */
			"methods" => [
				"add",
				"edit",
				"delete",  
				"get",
				"get_list",
				"search",             				
			]
		],

		// Marcas
		"brands" => [
			"model" => "Brands", /* Podemos meterle alias */
			"folder" => "brands", /* Si no se pone se coge el string de "modelo" */
			"methods" => [
				"add",
				"edit",
				"delete",  
				"get",
				"get_list",
				"search",           				
			]
		],

		// Tickets
		"tickets" => [
			"model" => "Tickets", /* Podemos meterle alias */
			"folder" => "tickets", /* Si no se pone se coge el string de "modelo" */
			"methods" => [
				"add",
				"edit",
				"delete",  
				"get",
				"get_list",
				"add_compra",       				
			]
		],

		// Lineas de Tickets
		"ticket_line" => [
			"model" => "Ticket_line", /* Podemos meterle alias */
			"folder" => "ticket_line", /* Si no se pone se coge el string de "modelo" */
			"methods" => [
				"add",
				"edit",
				"delete",  
				"get",
				"get_list",
				"get_by_date",
				"delete_all_by_ticket",              				
			]
		],

		// Clientes
		"clients" => [
			"model" => "Clients", /* Podemos meterle alias */
			"folder" => "clients", /* Si no se pone se coge el string de "modelo" */
			"methods" => [
				"add",
				"edit",
				"delete",  
				"get",
				"get_list",           				
			]
		],

		// Facturas
		"facturas" => [
			"model" => "Facturas", /* Podemos meterle alias */
			"folder" => "facturas", /* Si no se pone se coge el string de "modelo" */
			"methods" => [
				"add",
				"edit",
				"delete",  
				"get",
				"get_list",              				
			]
		],

		// Lineas de Facturas
		"factura_lines" => [
			"model" => "Factura_lines", /* Podemos meterle alias */
			"folder" => "factura_lines", /* Si no se pone se coge el string de "modelo" */
			"methods" => [
				"add",
				"edit",
				"delete",  
				"get",
				"get_list",              				
			]
		],		


		// Log de cambios en productos, no usado es para futuras versiones...
		"products_log" => [
			"model" => "Products_log", /* Podemos meterle alias */
			"folder" => "products_log", /* Si no se pone se coge el string de "modelo" */
			"methods" => [
				"add",
				"get",
				"get_list",
			]
		]

		

		
	
    ]; 

}