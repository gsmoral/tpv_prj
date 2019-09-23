-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-09-2019 a las 15:57:42
-- Versión del servidor: 10.3.15-MariaDB
-- Versión de PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tpv_test`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brands`
--

CREATE TABLE `brands` (
  `idbrand` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `brands`
--

INSERT INTO `brands` (`idbrand`, `name`) VALUES
(1, 'Danone'),
(2, 'Frigo'),
(5, 'Marcilla'),
(8, 'Coca cola'),
(10, 'Cecotec'),
(16, 'Enri');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `idcategory` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`idcategory`, `name`) VALUES
(4, 'Bebidas'),
(5, 'Alimentacion'),
(7, 'Fresco'),
(8, 'Congelado'),
(13, 'Material oficina');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clients`
--

CREATE TABLE `clients` (
  `idclient` int(11) NOT NULL,
  `razon_social` varchar(100) NOT NULL,
  `nif` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `calle` varchar(200) NOT NULL,
  `codigo_postal` char(5) NOT NULL,
  `poblacion` varchar(100) NOT NULL,
  `provincia` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clients`
--

INSERT INTO `clients` (`idclient`, `razon_social`, `nif`, `email`, `calle`, `codigo_postal`, `poblacion`, `provincia`) VALUES
(1, 'Prueba', '72345678V', 'asdfa@local.com', 'C/ Abellaneda', '08226', 'Terrassa', 'Barcelona'),
(3, 'Kaira', '12345678D', '', 'Joan Miro 10', '08226', 'Terrassa', 'Barcelona'),
(4, 'Prueba', '12345678V', '', 'Joan Miro 10', '08226', 'Terrassa', 'Barcelona'),
(6, 'Tio pepe', '1234569893s', 'tiopepe@local.com', 'C/ Sant Juan', '08221', 'Terrassa', 'Barcelona'),
(7, 'Bar tapeo', '84546636', 'pepe@local.com', 'C/ Sant Benito', '08221', 'Sabadell', 'Barcelona'),
(9, 'Teletienda', '123495757ANG', 'prueba@local.com', 'Virgen del puño', '08225', 'Terrassa', 'Barcelona'),
(12, 'Priebaaaa', '112477578686', 'pepe@local.com', 'C/ Sant Benito', '08221', 'Terrassa', 'Barcelona'),
(13, 'Tio pepe', 'dddsasasas', 'pepe@local.com', 'C/ Sant Benito', '08221', 'Terrassa', 'Barcelona');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `idfactura` int(11) NOT NULL,
  `num_fact` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `total` decimal(6,2) DEFAULT NULL,
  `id_client` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `facturas`
--

INSERT INTO `facturas` (`idfactura`, `num_fact`, `date`, `total`, `id_client`, `id_user`) VALUES
(20, 3, '2019-07-03 13:11:07', '1.68', 1, 4),
(21, 0, '2019-07-03 13:11:34', NULL, 1, 4),
(22, 1, '2019-07-03 13:13:44', NULL, 1, 4),
(25, 2, '2019-07-03 13:15:46', NULL, 1, 4),
(27, 4, '2019-07-03 13:32:07', NULL, 1, 4),
(28, 1, '2019-07-23 10:20:05', '11.50', 7, 4),
(30, 1, '2019-07-23 10:22:28', '11.50', 7, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura_lines`
--

CREATE TABLE `factura_lines` (
  `idfactura_lines` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_code` varchar(100) NOT NULL,
  `quantity` decimal(6,3) NOT NULL,
  `taxes` int(11) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `total` decimal(6,2) NOT NULL,
  `id_factura` int(11) NOT NULL,
  `id_product` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `factura_lines`
--

INSERT INTO `factura_lines` (`idfactura_lines`, `product_name`, `product_code`, `quantity`, `taxes`, `price`, `total`, `id_factura`, `id_product`) VALUES
(1, 'Cola cola', '', '2.000', 10, '1.20', '2.40', 20, 3),
(3, 'Cola cola', '', '2.000', 10, '1.20', '2.40', 20, 3),
(4, 'Cola cola', '', '2.000', 10, '1.20', '2.40', 20, 3),
(5, 'Cola cola', '', '2.000', 10, '1.20', '2.40', 20, 3),
(7, 'Cola cola', '', '2.000', 10, '1.20', '2.40', 27, 4),
(8, 'Cola cola', '', '5.000', 10, '1.20', '6.00', 27, 4),
(9, 'Cola cola', '', '2.000', 10, '1.20', '2.40', 27, 4),
(10, 'Cola cola', '', '2.000', 10, '1.20', '2.40', 27, 4),
(11, 'Coca Cola', '123495757ANG', '1.000', 10, '1.50', '0.00', 30, 14),
(12, 'Coca Cola', '123495757ANG', '1.000', 10, '1.50', '0.00', 30, 14),
(13, 'Coca Cola', '123495757ANG', '1.000', 10, '1.50', '0.00', 30, 14),
(14, 'Coca Cola', '123495757ANG', '1.000', 10, '1.50', '0.00', 30, 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `idproduct` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `codigo` varchar(100) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `pvd` decimal(6,2) NOT NULL,
  `pvp` decimal(6,2) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `taxes` enum('21','10') NOT NULL,
  `id_brand` int(11) NOT NULL,
  `id_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`idproduct`, `name`, `codigo`, `description`, `stock`, `pvd`, `pvp`, `image`, `taxes`, `id_brand`, `id_category`) VALUES
(3, 'Iogurt Natural x4', '123456789AD', 'Iogurt Natural paquete de 4 unidades', 16, '2.10', '2.50', NULL, '10', 1, 4),
(4, 'Azucarilla', '23456789', 'Azucar blanquilla', 4, '1.25', '1.67', NULL, '10', 1, 4),
(7, 'Azucar Blanquilla', 'ajdhd564', 'Azucar blanquilla', 5, '0.00', '1.68', NULL, '10', 5, 5),
(14, 'Coca cola', '123495757ANG', '', 8, '1.00', '1.50', NULL, '10', 8, 4),
(20, 'Cafe con leche', 'CAFE12345', 'Café con leche 12 capsulas', 2, '3.01', '3.69', '', '21', 5, 4),
(21, 'Cafe con leche', 'CAFE12345', 'Café con leche 12 capsulas', 1, '3.01', '3.69', '', '21', 5, 4),
(23, 'Cafe fuerte', 'CAFE23456', 'Café fuerte 12 capsulas', 3, '3.10', '3.79', '', '21', 5, 4),
(24, 'Galletas', 'qwert12345', 'Galletas choco', 12, '1.00', '1.00', NULL, '21', 5, 5),
(26, 'Libreta', '8412771083830', 'Libreta con anillas', 5, '0.30', '0.75', NULL, '21', 16, 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_log`
--

CREATE TABLE `products_log` (
  `idproduct_log` int(11) NOT NULL,
  `change_type` enum('Nuevo','Modificado','Eliminado') NOT NULL,
  `change_description` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_user` int(11) NOT NULL,
  `id_product` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `products_log`
--

INSERT INTO `products_log` (`idproduct_log`, `change_type`, `change_description`, `created_at`, `id_user`, `id_product`) VALUES
(1, 'Nuevo', 'Nuevo producto creado', '2019-07-02 12:34:45', 4, 3),
(2, 'Nuevo', 'Nuevo producto creado', '2019-07-02 12:35:25', 4, 3),
(3, 'Nuevo', 'Nuevo producto creado', '2019-07-02 12:35:26', 4, 3),
(4, 'Nuevo', 'Nuevo producto creado', '2019-07-02 12:35:26', 4, 3),
(5, 'Nuevo', 'Nuevo producto creado', '2019-07-02 12:35:27', 4, 3),
(6, 'Nuevo', 'Prueba', '2019-07-23 14:01:52', 4, 3),
(7, 'Nuevo', 'Nuevo producto creado', '2019-07-23 14:07:22', 4, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets`
--

CREATE TABLE `tickets` (
  `idticket` int(11) NOT NULL,
  `date` timestamp NULL DEFAULT current_timestamp(),
  `total` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tickets`
--

INSERT INTO `tickets` (`idticket`, `date`, `total`) VALUES
(108, '2019-07-17 07:25:26', 10.03),
(109, '2019-07-17 10:43:08', 7.04),
(130, '2019-09-02 09:51:08', 2.5),
(134, '2019-09-02 09:57:40', 4.17),
(135, '2019-09-02 10:05:33', 9.17),
(136, '2019-09-02 10:06:28', 12.86),
(137, '2019-09-02 10:12:30', 7.86),
(138, '2019-09-02 10:14:26', 4.17),
(140, '2019-09-02 10:17:13', 6.19),
(141, '2019-09-02 11:14:48', 2.5),
(142, '2019-09-02 11:15:15', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket_lines`
--

CREATE TABLE `ticket_lines` (
  `idticket_lines` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_code` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `taxes` int(11) NOT NULL,
  `pvd` decimal(6,2) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `total` decimal(6,2) NOT NULL,
  `id_ticket` int(11) NOT NULL,
  `id_product` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ticket_lines`
--

INSERT INTO `ticket_lines` (`idticket_lines`, `product_name`, `product_code`, `quantity`, `taxes`, `pvd`, `price`, `total`, `id_ticket`, `id_product`) VALUES
(86, 'Azucar', '123456789AD', 1, 10, '0.00', '1.68', '1.68', 108, 3),
(87, 'Azucarilla', '23456789', 5, 10, '0.00', '1.67', '8.35', 108, 4),
(89, 'Azucar', '123456789AD', 3, 10, '0.00', '1.68', '5.04', 109, 3),
(90, 'Coca cola', '123495757ANG', 2, 10, '0.00', '1.00', '2.00', 109, 14),
(99, 'Iogurt Natural x4', '123456789AD', 1, 10, '0.00', '2.50', '2.50', 130, 3),
(104, 'Azucarilla', '23456789', 1, 10, '0.00', '1.67', '1.67', 134, 3),
(105, 'Iogurt Natural x4', '123456789AD', 1, 10, '0.00', '2.50', '2.50', 134, 3),
(106, 'Azucarilla', '23456789', 1, 10, '0.00', '1.67', '1.67', 135, 4),
(107, 'Iogurt Natural x4', '123456789AD', 3, 10, '0.00', '2.50', '7.50', 135, 3),
(108, 'Azucarilla', '23456789', 1, 10, '0.00', '1.67', '1.67', 136, 4),
(109, 'Iogurt Natural x4', '123456789AD', 3, 10, '0.00', '2.50', '7.50', 136, 3),
(110, 'Cafe con leche', 'CAFE12345', 1, 21, '0.00', '3.69', '3.69', 136, 20),
(111, 'Azucarilla', '23456789', 1, 10, '0.00', '1.67', '1.67', 137, 4),
(112, 'Iogurt Natural x4', '123456789AD', 1, 10, '0.00', '2.50', '2.50', 137, 3),
(113, 'Cafe con leche', 'CAFE12345', 1, 21, '0.00', '3.69', '3.69', 137, 20),
(114, 'Azucarilla', '23456789', 1, 10, '0.00', '1.67', '1.67', 138, 4),
(115, 'Iogurt Natural x4', '123456789AD', 1, 10, '0.00', '2.50', '2.50', 138, 3),
(118, 'Cafe con leche', 'CAFE12345', 1, 21, '0.00', '3.69', '3.69', 140, 20),
(119, 'Iogurt Natural x4', '123456789AD', 1, 10, '0.00', '2.50', '2.50', 140, 3),
(120, 'Iogurt Natural x4', '123456789AD', 1, 10, '0.00', '2.50', '2.50', 141, 3),
(121, 'Iogurt Natural x4', '123456789AD', 2, 10, '0.00', '2.50', '5.00', 142, 3);

--
-- Disparadores `ticket_lines`
--
DELIMITER $$
CREATE TRIGGER `restarStock` AFTER INSERT ON `ticket_lines` FOR EACH ROW Update products
set products.stock = products.stock - new.quantity
where products.idproduct = new.id_product
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `iduser` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `token` varchar(150) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `profile` enum('Admin','User') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`iduser`, `email`, `name`, `surname`, `password`, `token`, `created_at`, `updated_at`, `profile`) VALUES
(4, 'admin@test.com', 'Admin', 'Administrador', '601f1889667efaebb33b8c12572835da3f027f78', '01ec0098c943d1ca8e969a46bdfc34133e0dd327', '2019-06-28 07:27:10', NULL, 'Admin'),
(50, 'juan@test.es', 'adolfo', 'Pereza', 'cbcce4ebcf0e63f32a3d6904397792720f7e40ba', 'fd51ac1fc36a2e3787db427f993dc74a6ec47871', '2019-07-11 10:13:35', NULL, 'User');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`idbrand`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`idcategory`);

--
-- Indices de la tabla `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`idclient`);
ALTER TABLE `clients` ADD FULLTEXT KEY `idx` (`razon_social`,`nif`,`email`,`calle`,`codigo_postal`,`poblacion`,`provincia`);
ALTER TABLE `clients` ADD FULLTEXT KEY `idx2` (`razon_social`,`calle`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`idfactura`),
  ADD KEY `FK_ticket_client_idx` (`id_client`),
  ADD KEY `FK_ticket_user_idx` (`id_user`);

--
-- Indices de la tabla `factura_lines`
--
ALTER TABLE `factura_lines`
  ADD PRIMARY KEY (`idfactura_lines`),
  ADD KEY `FK_ticketline_product_idx` (`id_product`),
  ADD KEY `FK_facturaline_factura_idx` (`id_factura`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`idproduct`),
  ADD KEY `FK_products_brands_idx` (`id_brand`),
  ADD KEY `FK_products_category_idx` (`id_category`);
ALTER TABLE `products` ADD FULLTEXT KEY `idx_products` (`name`,`codigo`,`description`);

--
-- Indices de la tabla `products_log`
--
ALTER TABLE `products_log`
  ADD PRIMARY KEY (`idproduct_log`),
  ADD KEY `FK_change_user_idx` (`id_user`),
  ADD KEY `FK_change_product_idx` (`id_product`);

--
-- Indices de la tabla `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`idticket`);

--
-- Indices de la tabla `ticket_lines`
--
ALTER TABLE `ticket_lines`
  ADD PRIMARY KEY (`idticket_lines`),
  ADD KEY `FK_ticket_idx` (`id_ticket`),
  ADD KEY `FK_ticketline_product_idx` (`id_product`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`iduser`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `brands`
--
ALTER TABLE `brands`
  MODIFY `idbrand` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `idcategory` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `clients`
--
ALTER TABLE `clients`
  MODIFY `idclient` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `idfactura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `factura_lines`
--
ALTER TABLE `factura_lines`
  MODIFY `idfactura_lines` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `idproduct` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `products_log`
--
ALTER TABLE `products_log`
  MODIFY `idproduct_log` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tickets`
--
ALTER TABLE `tickets`
  MODIFY `idticket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;

--
-- AUTO_INCREMENT de la tabla `ticket_lines`
--
ALTER TABLE `ticket_lines`
  MODIFY `idticket_lines` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `iduser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD CONSTRAINT `FK_ticket_client0` FOREIGN KEY (`id_client`) REFERENCES `clients` (`idclient`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ticket_user0` FOREIGN KEY (`id_user`) REFERENCES `users` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `factura_lines`
--
ALTER TABLE `factura_lines`
  ADD CONSTRAINT `FK_facturaline_factura` FOREIGN KEY (`id_factura`) REFERENCES `facturas` (`idfactura`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ticketline_product0` FOREIGN KEY (`id_product`) REFERENCES `products` (`idproduct`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK_products_brands` FOREIGN KEY (`id_brand`) REFERENCES `brands` (`idbrand`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_products_category` FOREIGN KEY (`id_category`) REFERENCES `categories` (`idcategory`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `products_log`
--
ALTER TABLE `products_log`
  ADD CONSTRAINT `FK_change_product` FOREIGN KEY (`id_product`) REFERENCES `products` (`idproduct`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_change_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ticket_lines`
--
ALTER TABLE `ticket_lines`
  ADD CONSTRAINT `FK_ticket` FOREIGN KEY (`id_ticket`) REFERENCES `tickets` (`idticket`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ticketline_product` FOREIGN KEY (`id_product`) REFERENCES `products` (`idproduct`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
