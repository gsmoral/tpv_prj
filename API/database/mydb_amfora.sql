
-- Tabla usuarios
CREATE TABLE users (
  ID int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  login varchar(50) NOT NULL,
  password varchar(100) NOT NULL,
  public_name varchar(100) NOT NULL, 
  user_type enum('administrador', 'camarero', 'barman') NOT NULL,
  last_call datetime DEFAULT NULL 
);


-- La categoría de los productos
	-- 'primero', 'segundo', 'especial', 'bebida', 'postre'
CREATE TABLE product_category (
  ID int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(100) NULL,
  description varchar(100) NULL
 );


-- Tabla platos y bebidas
CREATE TABLE products (
  ID int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  ID_category int(10) NOT NULL,
  destination enum('kitchen', 'bar', 'none') NOT NULL DEFAULT 'kitchen',
  name varchar(100) NOT NULL, 
  english_name varchar(100) DEFAULT NULL,
  description varchar(100) NULL,
  image varchar(100) NULL,
  price float NOT NULL DEFAULT 0,
  vat float NOT NULL DEFAULT 0, -- iva
  cost_price int(11) DEFAULT 0,
  CONSTRAINT FOREIGN KEY (ID_category) REFERENCES product_category(ID) ON DELETE CASCADE
);


-- Alergenos, puede haber varios por producto
CREATE TABLE allergens (
  ID int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  ID_product int(10) NOT NULL,
  type enum('allergen1', 'allergen2'),
  CONSTRAINT FOREIGN KEY (ID_product) REFERENCES products(ID) ON DELETE CASCADE
);



-- MENU
CREATE TABLE menus (
  ID int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  menu_name varchar(50) NOT NULL, 
  start_date datetime DEFAULT NULL, 
  end_date datetime DEFAULT NULL, 
  price float NOT NULL DEFAULT 0,
  vat float NOT NULL DEFAULT 0 
);

-- ID_first_dish ID_second_dish ID_desert ID_drink
CREATE TABLE menus_category (
  ID int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  ID_menu int(10) NOT NULL,
  name varchar(100) NOT NULL,
  CONSTRAINT FOREIGN KEY (ID_menu) REFERENCES menus(ID) ON DELETE CASCADE
);

-- ID_first_dish ID_second_dish ID_desert ID_drink
CREATE TABLE menus_products (
  ID int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  ID_menu_category int(10) NOT NULL,
  ID_product int(10) NOT NULl,
  CONSTRAINT FOREIGN KEY (ID_menu_category) REFERENCES menus_category(ID) ON DELETE CASCADE,
  CONSTRAINT FOREIGN KEY (ID_product) REFERENCES products(ID) ON DELETE CASCADE
);






-- Tabla mesas
CREATE TABLE tables (
  ID int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  status enum('free', 'busy', 'reserved') NOT NULL, 
  table_num varchar(20) NOT NULL, 
  ID_waiter int(10) NULL, -- id camarero
  clients_num int(10) NULL,
  coord_x int(10) DEFAULT 0,
  coord_y int(10) DEFAULT 0,
  image varchar(500) DEFAULT null
);




/* PEDIDO */


-- pedido mesa
CREATE TABLE table_order(
  ID int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  ID_menu int(10) DEFAULT NULL,
  ID_product int(10) DEFAULT NULL,
  ID_waiter int(10) NOT NULL,
  price float NOT NULL DEFAULT 0,
  vat	float NOT NULL DEFAULT 0 
);

-- Una tabla donde se puede jugar con ella como si ya está servido, no, etc.
CREATE TABLE table_order_product(
	ID int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	ID_table_order int(10) NOT NULL,
	ID_product int(10) DEFAULT NULL, 
	state enum('pending', 'ready') NOT NULL DEFAULT 'pending',
	pending_datetime datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	ready_datetime datetime DEFAULT NULL,
	CONSTRAINT FOREIGN KEY (ID_table_order) REFERENCES table_order(ID) ON DELETE CASCADE
);



-- Aquí llegaría cuando todo esté OK

CREATE TABLE ticket (
  ID int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  ID_table int(10) NOT NULL, 
  ID_waiter int(10) NOT NULL, 
  payment_type enum('creditcard','cash', 'gift-check') NULL, 
  reserved_datetime datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  local_CIF			varchar(100) DEFAULT NULL,
  local_name		varchar(100) DEFAULT NULL,
  local_phone		varchar(100) DEFAULT NULL,
  local_address		varchar(150) DEFAULT NULL,
  payment_datetime datetime NULL 
);


-- Tabla que contiene los productos incluidos en un pedido
CREATE TABLE ticket_line (
  ID int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  ID_menu int(10) DEFAULT NULL,
  ID_product int(10) DEFAULT NULL,
  string_name varchar(200) NOT NULL,
  price float NOT NULL DEFAULT 0,
  vat float	NOT NULL DEFAULT 0 
);





-- Factura
CREATE TABLE bill (
  ID int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  ID_table int(10) NOT NULL, 
  ID_waiter int(10) NOT NULL, 
  payment_type enum('creditcard','cash') NULL, 
  local_CIF			varchar(100) DEFAULT NULL,
  local_name		varchar(100) DEFAULT NULL,
  local_phone		varchar(100) DEFAULT NULL,
  local_address		varchar(150) DEFAULT NULL,
  customer_CIF		varchar(100) DEFAULT NULL,
  customer_name		varchar(100) DEFAULT NULL,
  customer_phone	varchar(100) DEFAULT NULL,
  customer_address	varchar(150) DEFAULT NULL,
  created datetime NULL 
);


-- Tabla que contiene los productos incluidos en un pedido
CREATE TABLE bill_line (
  ID int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  ID_menu int(10) DEFAULT NULL,
  ID_product int(10) DEFAULT NULL,
  string_name varchar(200) NOT NULL,
  price float NOT NULL DEFAULT 0,
  vat float	NOT NULL DEFAULT 0 
);


-- Para guardar datos tipo el NIF del local, etc. Que puede cambiar.
CREATE TABLE options(
  ID int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(10) NOT NULL,
  value varchar(1000) NOT NUlL DEFAULT ''
);










