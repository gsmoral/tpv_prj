<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	public function index(){
		$this->load->view('welcome_message');
	}

	
	// Producto
	public function products(){
		$this->load->model("Products", "products");

		// name, codigo, pvd, pvp, taxes, id_brand, id_category, description = NULL, stock = NULL, image = NULL		
		$string = json_encode([ 
			"name" => "Cafe con leche", 
			"codigo" => "CAFE12345", 
			"pvd" => "3.01", 
			"pvp" => "3.69", 
			"taxes" => "10",
			"id_brand" => "5",
			"id_category" => "4",
			"description" => "Café con leche 12 capsulas",
			"stock" => "1",
			"image" => ""]);
		//$tmp = $this->products->add($string);
		$string = json_encode([
			"idproduct" => 23,
			"name" => "Cafe fuerte", 
			"codigo" => "CAFE23456", 
			"pvd" => "3.10", 
			"pvp" => "3.79", 
			"taxes" => "21",
			"id_brand" => "5",
			"id_category" => "4",
			"description" => "Café fuerte 12 capsulas",
			"stock" => "3",
			"image" => ""]);	
		//$string = json_encode([ "ID" => 6, "ID_tmp_ticket" => "2018-12-03 14:00:52", "ID_producto" => "3", "nombre_producto" => "Verduras", "neto" => "69.28", "iva" => "21", "coste" => "31.76" ]);		
		//$tmp = $this->products->edit($string);			
		//$tmp = $this->products->get( json_encode([ "idproduct" => 23]) );
		//$tmp = $this->products->delete( json_encode([ "idproduct" => 22]) );
		//$tmp = $this->products->get_list();
		//$tmp = $this->products->getbycode( json_encode([ "codigo" => "123456789AD"]) );
		//$tmp = $this->products->getbycode( json_encode([ "idproduct" => 23]) );
		
		//var_dump( $tmp);

	}

	
	// Usuarios
	public function users(){
		$this->load->model("Users", "users");

		// $name, $password, $profile, $surname = NULL, $email = NULL
		$string = json_encode([ 
			"name" => "Carlos", 
			"password" => "A12345678", 
			"profile" => "Admin", 
			"surname" => "Buendia", 
			"email" => "carlos@local.es"]);
		//$tmp = $this->users->add($string);
		$string = json_encode([
			"iduser" => 53,
			"name" => "Carlos", 
			"password" => "A12345678", 
			"profile" => "Admin", 
			"surname" => "Buendia Lopez", 
			"email" => "carlos@local.es"]);	
		//$string = json_encode([ "ID" => 6, "ID_tmp_ticket" => "2018-12-03 14:00:52", "ID_producto" => "3", "nombre_producto" => "Verduras", "neto" => "69.28", "iva" => "21", "coste" => "31.76" ]);		
		//$tmp = $this->users->edit($string);			
		//$tmp = $this->users->get( json_encode([ "iduser" => 53]) );
		//$tmp = $this->users->delete( json_encode([ "iduser" => 53]) );
		//$tmp = $this->users->get_list();
		//$tmp = $this->users->getbycode( json_encode([ "codigo" => "123456789AD"]) );
		//$tmp = $this->users->getbycode( json_encode([ "idproduct" => 23]) );
		
		//var_dump( $tmp);

	}

	// Categorias
	public function categories(){
		$this->load->model("Categories", "categories");

		$string = json_encode([ 
			"name" => "Carlos"]);
		//$tmp = $this->categories->add($string);
		$string = json_encode([
			"idcategory" => 11,
			"name" => "Aguas"]);		
		//$tmp = $this->categories->edit($string);			
		//$tmp = $this->categories->get( json_encode([ "idcategory" => 11]) );
		//$tmp = $this->categories->delete( json_encode([ "idcategory" => 11]) );
		//$tmp = $this->categories->get_list();
		
		//var_dump( $tmp);

	}

	// Categorias
	public function brands(){
		$this->load->model("Brands", "brands");

		$string = json_encode([ 
			"name" => "Carlos"]);
		//$tmp = $this->brands->add($string);
		$string = json_encode([
			"idbrand" => 11,
			"name" => "Epson"]);		
		//$tmp = $this->brands->edit($string);			
		//$tmp = $this->brands->get( json_encode([ "idbrand" => 11]) );
		//$tmp = $this->brands->delete( json_encode([ "idbrand" => 11]) );
		//$tmp = $this->brands->get_list();
		
		//var_dump( $tmp);

	}

	// Tickets
	public function tickets(){
		$this->load->model("Tickets", "tickets");

		$date = date("Y-m-d H:i:s");
		$string = json_encode([ 
			"date" => $date,
			"total" => 11.5]);
		//$tmp = $this->tickets->add($string);
		$string = json_encode([
			"idticket" => 111,
			"date" => $date,
			"total" => 13.5]);		
		//$tmp = $this->tickets->edit($string);			
		//$tmp = $this->tickets->get( json_encode([ "idticket" => 111]) );
		//$tmp = $this->tickets->delete( json_encode([ "idticket" => 111]) );
		//$tmp = $this->tickets->get_list();
		
		//var_dump( $tmp);

	}

	// Lineas de Tickets
	public function ticket_line(){
		$this->load->model("Ticket_line", "ticket_line");

		//$product_name, $product_code, $quantity, $taxes, $price, $id_ticket, $id_product
		$string = json_encode([ 
			"product_name" => "Coca Cola",
			"product_code" => "123495757ANG",
			"quantity" => 1,
			"taxes" => 10,
			"price" => 1.50,
			"id_ticket" => 110,
			"id_product" => 14]);
		//$tmp = $this->ticket_line->add($string);
		$string = json_encode([
			"idticket_lines" => 97,
			"product_name" => "Coca Cola",
			"product_code" => "123495757ANG",
			"quantity" => 4,
			"taxes" => 10,
			"price" => 1.50,
			"total" => 12.10,
			"id_ticket" => 110,
			"id_product" => 14]);		
		//$tmp = $this->ticket_line->edit($string);			
		//$tmp = $this->ticket_line->get( json_encode([ "idticket_lines" => 97]) );
		//$tmp = $this->ticket_line->delete( json_encode([ "idticket_lines" => 95]) );
		//$tmp = $this->ticket_line->get_list();

		//$tmp = $this->ticket_line->get_list( json_encode( ["id_ticket" => 110]) );
		
		//var_dump( $tmp);

	}

	// Clientes
	public function clients(){
		$this->load->model("Clients", "clients");

		//$razon_social, $nif, $calle, $codigo_postal, $poblacion, $provincia, $email = null
		$string = json_encode([ 
			"razon_social" => "Teletienda",
			"nif" => "123495757ANG",
			"calle" => "Virgen del puño",
			"codigo_postal" => "08225",
			"poblacion" => "Terrassa",
			"provincia" => "Barcelona",
			"email" => "prueba@local.com"]);
		//$tmp = $this->clients->add($string);
		$string = json_encode([
			"idclient" => 10,
			"razon_social" => "Teletienda",
			"nif" => "12376tgb",
			"calle" => "Virgen del rocio",
			"codigo_postal" => "08225",
			"poblacion" => "Terrassa",
			"provincia" => "Barcelona",
			"email" => "prueba@local.com"]);		
		//$tmp = $this->clients->edit($string);			
		//$tmp = $this->clients->get( json_encode([ "idclient" => 10]) );
		//$tmp = $this->clients->delete( json_encode([ "idclient" => 10]) );
		//$tmp = $this->clients->get_list();
		$tmp = $this->clients->search("08224");
		
		var_dump( $tmp);

	}

	// Facturas
	public function facturas(){
		$this->load->model("Facturas", "facturas");

		$date = date("Y-m-d H:i:s");
		$string = json_encode([ 
			"num_fact" => 1,
			"date" => $date,
			"total" => 11.5,
			"id_client" => 7,
			"id_user" => 4]);
		//$tmp = $this->facturas->add($string);
		$string = json_encode([
			"idfactura" => 29,
			"num_fact" => 1,
			"date" => $date,
			"total" => 13.5,
			"id_client" => 7,
			"id_user" => 4]);		
		//$tmp = $this->facturas->edit($string);			
		//$tmp = $this->facturas->get( json_encode([ "idfactura" => 29]) );
		//$tmp = $this->facturas->delete( json_encode([ "idfactura" => 29]) );
		//$tmp = $this->facturas->get_list();
		
		//var_dump( $tmp);
	}
	
		// Lineas de Facturas
	public function factura_line(){
		$this->load->model("Factura_line", "factura_line");

		$string = json_encode([ 
			"product_name" => "Coca Cola",
			"product_code" => "123495757ANG",
			"quantity" => 1,
			"taxes" => 10,
			"price" => 1.50,
			"id_factura" => 30,
			"id_product" => 14]);
		//$tmp = $this->factura_line->add($string);
		$string = json_encode([
			"idfactura_lines" => 15,
			"product_name" => "Coca Cola",
			"product_code" => "123ANG",
			"quantity" => 4,
			"taxes" => 10,
			"price" => 1.50,
			"total" => 12.10,
			"id_factura" => 30,
			"id_product" => 14]);		
		//$tmp = $this->factura_line->edit($string);			
		//$tmp = $this->factura_line->get( json_encode([ "idfactura_lines" => 15]) );
		//$tmp = $this->factura_line->delete( json_encode([ "idfactura_lines" => 15]) );
		//$tmp = $this->factura_line->get_list();

		//$tmp = $this->factura_line->get_list( json_encode( ["id_factura" => 30]) );
		
		//var_dump( $tmp);

	}

		// Facturas
	public function products_log(){
		$this->load->model("Products_log", "products_log");

		$date = date("Y-m-d H:i:s");
		$string = json_encode([ 
			"change_type" => "Nuevo",
			"change_description" => "Nuevo producto creado",
			"created_at" => $date,
			"id_user" => 4,
			"id_product" => 3]);
		//$tmp = $this->products_log->add($string);
		
		//$tmp = $this->products_log->get( json_encode([ "idproduct_log" => 7]) );
		//$tmp = $this->products_log->get_list();
		
		//var_dump( $tmp);
	}


}
