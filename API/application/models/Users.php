<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends KA_Model {

    public $data = [
        "table"  => "users",
        
		//"primary" => "ID",

		// $name, $password, $profile, $surname = NULL, $email = NULL
		"add" => [
			"columns" => [
                "name",
                "password",
                "profile"
			],
			"optionals" => [
                "surname",
                "email"
			]
 		],

		"edit" => [
			"optionals" => [
                "name",
                "password",
                "profile",
                "surname",
                "email"               
            ],
			"where" => [
				"columns" => [
					'iduser' => "int"
				]
			]
		],

		"get" => [
			"where" => [
				"columns" => [
					'iduser' => "int"
				]
            ]
        ], 		

		"delete" => [
			"where" => [
				"columns" => [
					'iduser' => "int"
				]
			],
		],

		
        "get_list" => [
        	"select" => "
        		users.iduser,
        		users.name,
        		users.surname,
        		users.profile,
        		users.email"
        ]


	];


	

}