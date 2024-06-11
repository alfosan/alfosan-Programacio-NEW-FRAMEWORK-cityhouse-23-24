-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-06-2024 a las 18:38:26
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cityhouse`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id_carrito` int(11) NOT NULL,
  `id_vivienda` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `price` varchar(100) DEFAULT NULL,
  `img_vivienda` varchar(255) DEFAULT NULL,
  `name_city` varchar(500) DEFAULT NULL,
  `tipos` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id_category` int(100) NOT NULL,
  `categorys` varchar(100) NOT NULL,
  `category_icon` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id_category`, `categorys`, `category_icon`) VALUES
(1, 'Nueva', 'module\\home\\view\\img_icon\\Categotys\\casa_nueva.jpg'),
(2, 'Segunda mano', 'module\\home\\view\\img_icon\\Categotys\\segunda_mano.jpg'),
(3, 'Primera linea', 'module\\home\\view\\img_icon\\Categotys\\primera_linea.jpg'),
(4, 'Diseño', 'module\\home\\view\\img_icon\\Categotys\\casa_diseño.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `city`
--

CREATE TABLE `city` (
  `id_city` int(100) NOT NULL,
  `name_city` varchar(100) DEFAULT NULL,
  `img_city` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `city`
--

INSERT INTO `city` (`id_city`, `name_city`, `img_city`) VALUES
(1, 'Valencia', 'module\\home\\view\\img_icon\\City\\Valencia.jpg'),
(2, 'Barcelona', 'module\\home\\view\\img_icon\\City\\Barcelona.jpg'),
(3, 'Sevilla', 'module\\home\\view\\img_icon\\City\\Sevilla.jpg'),
(4, 'Alicante', 'module\\home\\view\\img_icon\\City\\Alicante.jpg'),
(5, 'Teruel', 'module\\home\\view\\img_icon\\City\\Teruel.png'),
(6, 'Madrid', 'module\\home\\view\\img_icon\\City\\Madrid.jpg'),
(7, 'Granada', 'module\\home\\view\\img_icon\\City\\Madrid.jpg'),
(8, 'Bolivia', 'module\\home\\view\\img_icon\\City\\Alicante.jpg'),
(9, 'Albacete', 'module\\home\\view\\img_icon\\City\\Sevilla.jpg'),
(10, 'Ontinyent', 'module\\home\\view\\img_icon\\City\\Barcelona.jpg'),
(12, 'Merida', 'module\\home\\view\\img_icon\\City\\Valencia.jpg'),
(117, 'Valladolid', 'module\\home\\view\\img_icon\\City\\Teruel.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customed_rooms`
--

CREATE TABLE `customed_rooms` (
  `id_custom_room` int(11) NOT NULL,
  `name_room` varchar(100) DEFAULT NULL,
  `icon_custom` varchar(100) DEFAULT NULL,
  `img_custom` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `customed_rooms`
--

INSERT INTO `customed_rooms` (`id_custom_room`, `name_room`, `icon_custom`, `img_custom`) VALUES
(1, 'BODEGA', 'view\\images\\home\\customs\\icons\\uvas.png', 'view\\images\\home\\customs\\img\\bodega.jpg'),
(2, 'CASINO', 'view\\images\\home\\customs\\icons\\juego-de-cartas.png', 'view\\images\\home\\customs\\img\\casino1.jpg'),
(3, 'CINE', 'view\\images\\home\\customs\\icons\\cine.png', 'view\\images\\home\\customs\\img\\cine.png'),
(4, 'SAUNA', 'view\\images\\home\\customs\\icons\\sauna.png', 'view\\images\\home\\customs\\img\\sauna.jpg'),
(5, 'GYM', 'view\\images\\home\\customs\\icons\\deporte.png', 'view\\images\\home\\customs\\img\\gym.jpg'),
(6, 'GOLF', 'view\\images\\home\\customs\\icons\\golf.png', 'view\\images\\home\\customs\\img\\golf.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exceptions`
--

CREATE TABLE `exceptions` (
  `type_error` int(10) NOT NULL,
  `spot` varchar(100) NOT NULL,
  `current_date_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `extras`
--

CREATE TABLE `extras` (
  `id_extra` int(100) NOT NULL,
  `name_extra` varchar(100) NOT NULL,
  `icon_extra` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `extras`
--

INSERT INTO `extras` (`id_extra`, `name_extra`, `icon_extra`) VALUES
(1, 'CALEFACCIÓN', 'view\\images\\extras\\calentador.png'),
(2, 'ASCENSOR', 'view\\images\\extras\\ascensor.png'),
(3, 'JARDÍN', 'view\\images\\extras\\jardin.png'),
(4, 'GARAJE', 'view\\images\\extras\\garaje.png'),
(5, 'BALCÓN', 'view\\images\\extras\\balcon.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `id_factura` int(11) NOT NULL,
  `id_vivienda` int(11) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `name_city` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `cant` int(11) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `facturas`
--

INSERT INTO `facturas` (`id_factura`, `id_vivienda`, `tipo`, `name_city`, `price`, `username`, `cant`, `date`) VALUES
(6, 287, 'Duplex', 'Barcelona', 263000.00, '3eiasl_google', 1, '2024-06-06 08:41:17'),
(7, 288, 'Casa', 'Sevilla', 1200.00, '3eiasl_google', 1, '2024-06-06 08:41:17'),
(8, 286, 'Piso', 'Valencia', 660.00, '3eiasl_google', 1, '2024-06-06 08:43:14'),
(31, 1, 'Casa', 'Valencia', 300000.00, '3eiasl_google', 1, '2024-06-08 13:41:56'),
(32, 3, 'Piso', 'Sevilla', 150.00, '3eiasl_google', 5, '2024-06-08 13:41:56'),
(33, 286, 'Piso', 'Valencia', 660.00, '3eiasl_google', 3, '2024-06-08 17:11:45'),
(35, 4, 'Apartamento', 'Alicante', 250.00, '3eiasl_google', 1, '2024-06-10 08:17:37'),
(37, 3, 'Piso', 'Sevilla', 150.00, '3eiasl_google', 2, '2024-06-11 14:19:29'),
(38, 1, 'Casa', 'Valencia', 300000.00, 'yomogana', 3, '2024-06-11 15:12:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id_imagenes` int(100) NOT NULL,
  `id_vivienda` int(100) NOT NULL,
  `img_ruta` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id_imagenes`, `id_vivienda`, `img_ruta`) VALUES
(1, 1, 'view\\images\\shop\\details_carrusel\\id_1_casa\\1.jpg'),
(2, 2, 'view\\images\\shop\\details_carrusel\\id_2_chalet\\3.jpg'),
(3, 3, 'view\\images\\shop\\details_carrusel\\id_3_piso\\4.jpg'),
(4, 4, 'view\\images\\shop\\details_carrusel\\id_4_apartamento\\3.jpg'),
(5, 5, 'view\\images\\shop\\details_carrusel\\id_5_casa\\2.jpg'),
(6, 6, 'view\\images\\shop\\details_carrusel\\id_6_chalet\\1.jpg'),
(7, 7, 'view\\images\\shop\\details_carrusel\\id_7_piso\\2.jpg'),
(8, 8, 'view\\images\\shop\\details_carrusel\\id_8_apartamento\\2.jpg'),
(9, 1, 'view\\images\\shop\\details_carrusel\\id_1_casa\\2.jpg'),
(10, 2, 'view\\images\\shop\\details_carrusel\\id_2_chalet\\4.jpg'),
(11, 3, 'view\\images\\shop\\details_carrusel\\id_3_piso\\3.jpg'),
(12, 4, 'view\\images\\shop\\details_carrusel\\id_4_apartamento\\1.jpg'),
(13, 5, 'view\\images\\shop\\details_carrusel\\id_5_casa\\4.jpg'),
(14, 6, 'view\\images\\shop\\details_carrusel\\id_6_chalet\\4.jpg'),
(15, 7, 'view\\images\\shop\\details_carrusel\\id_7_piso\\3.jpg'),
(16, 8, 'view\\images\\shop\\details_carrusel\\id_8_apartamento\\4.jpg'),
(17, 1, 'view\\images\\shop\\details_carrusel\\id_1_casa\\3.jpg'),
(18, 2, 'view\\images\\shop\\details_carrusel\\id_2_chalet\\1.jpg'),
(19, 3, 'view\\images\\shop\\details_carrusel\\id_3_piso\\1.jpg'),
(20, 4, 'view\\images\\shop\\details_carrusel\\id_4_apartamento\\4.jpg'),
(21, 5, 'view\\images\\shop\\details_carrusel\\id_5_casa\\1.jpg'),
(22, 6, 'view\\images\\shop\\details_carrusel\\id_6_chalet\\2.jpg'),
(24, 8, 'view\\images\\shop\\details_carrusel\\id_8_apartamento\\3.jpg'),
(25, 1, 'view\\images\\shop\\details_carrusel\\id_1_casa\\4.jpg'),
(26, 2, 'view\\images\\shop\\details_carrusel\\id_2_chalet\\2.jpg'),
(27, 3, 'view\\images\\shop\\details_carrusel\\id_3_piso\\2.jpg'),
(28, 4, 'view\\images\\shop\\details_carrusel\\id_4_apartamento\\2.jpg'),
(29, 5, 'view\\images\\shop\\details_carrusel\\id_5_casa\\3.jpg'),
(30, 6, 'view\\images\\shop\\details_carrusel\\id_6_chalet\\3.jpg'),
(31, 7, 'view\\images\\shop\\details_carrusel\\id_7_piso\\1.jpg'),
(32, 8, 'view\\images\\shop\\details_carrusel\\id_8_apartamento\\1.jpg'),
(34, 7, 'view\\images\\shop\\details_carrusel\\id_7_piso\\4.jpg'),
(47, 9, 'view\\images\\shop\\details_carrusel\\id_3_piso\\4.jpg'),
(48, 9, 'view\\images\\shop\\details_carrusel\\id_3_piso\\3.jpg'),
(49, 9, 'view\\images\\shop\\details_carrusel\\id_3_piso\\2.jpg'),
(50, 9, 'view\\images\\shop\\details_carrusel\\id_3_piso\\1.jpg'),
(51, 10, 'view\\images\\shop\\details_carrusel\\id_7_piso\\1.jpg'),
(52, 10, 'view\\images\\shop\\details_carrusel\\id_7_piso\\2.jpg'),
(53, 10, 'view\\images\\shop\\details_carrusel\\id_7_piso\\3.jpg'),
(54, 10, 'view\\images\\shop\\details_carrusel\\id_7_piso\\4.jpg'),
(55, 11, 'view\\images\\shop\\details_carrusel\\id_1_casa\\4.jpg'),
(56, 11, 'view\\images\\shop\\details_carrusel\\id_1_casa\\3.jpg'),
(57, 11, 'view\\images\\shop\\details_carrusel\\id_1_casa\\2.jpg'),
(58, 11, 'view\\images\\shop\\details_carrusel\\id_1_casa\\1.jpg'),
(59, 12, 'view\\images\\shop\\details_carrusel\\id_8_apartamento\\4.jpg'),
(60, 12, 'view\\images\\shop\\details_carrusel\\id_8_apartamento\\3.jpg'),
(61, 12, 'view\\images\\shop\\details_carrusel\\id_8_apartamento\\2.jpg'),
(62, 12, 'view\\images\\shop\\details_carrusel\\id_8_apartamento\\1.jpg'),
(63, 13, 'view\\images\\shop\\details_carrusel\\id_1_casa\\1.jpg'),
(64, 13, 'view\\images\\shop\\details_carrusel\\id_1_casa\\2.jpg'),
(65, 13, 'view\\images\\shop\\details_carrusel\\id_1_casa\\3.jpg'),
(66, 13, 'view\\images\\shop\\details_carrusel\\id_1_casa\\4.jpg'),
(67, 15, 'view\\images\\shop\\details_carrusel\\id_1_casa\\2.jpg'),
(68, 15, 'view\\images\\shop\\details_carrusel\\id_1_casa\\1.jpg'),
(69, 15, 'view\\images\\shop\\details_carrusel\\id_1_casa\\3.jpg'),
(70, 15, 'view\\images\\shop\\details_carrusel\\id_1_casa\\4.jpg'),
(71, 284, 'img'),
(72, 284, 'img'),
(73, 284, 'img'),
(74, 284, 'img'),
(75, 285, 'img'),
(76, 285, 'img'),
(77, 285, 'img'),
(78, 285, 'img'),
(79, 286, 'img'),
(80, 286, 'img'),
(81, 286, 'img'),
(82, 286, 'img'),
(83, 287, 'img'),
(84, 287, 'img'),
(85, 287, 'img'),
(86, 287, 'img'),
(87, 288, 'img'),
(88, 288, 'img'),
(89, 288, 'img'),
(90, 288, 'img'),
(91, 289, 'img'),
(92, 289, 'img'),
(93, 289, 'img'),
(94, 289, 'img'),
(95, 290, 'img'),
(96, 290, 'img'),
(97, 290, 'img'),
(98, 290, 'img'),
(99, 291, 'img'),
(100, 291, 'img'),
(101, 291, 'img'),
(102, 291, 'img'),
(103, 292, 'img'),
(104, 292, 'img'),
(105, 292, 'img'),
(106, 292, 'img'),
(107, 283, 'img'),
(108, 283, 'img'),
(109, 283, 'img'),
(110, 283, 'img');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mapbox`
--

CREATE TABLE `mapbox` (
  `id_mapbox` int(11) NOT NULL,
  `name_city` varchar(100) DEFAULT NULL,
  `longi` varchar(100) DEFAULT NULL,
  `lat` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mapbox`
--

INSERT INTO `mapbox` (`id_mapbox`, `name_city`, `longi`, `lat`) VALUES
(1, 'Valencia', '-0.375', '39.4699'),
(2, 'Madrid', '-3.7038', '40.4168'),
(3, 'Barcelona', '2.1734', '41.3851'),
(4, 'Ontinyent', '-0.6063', '38.8226'),
(5, 'Sevilla', '-5.9845', '37.3891'),
(6, 'Alicante', '-0.4907', '38.3452'),
(7, 'Valencia', '-0.395', '39.4799'),
(8, 'Madrid', '-3.8038', '40.5168'),
(9, 'Barcelona', '2.1834', '41.4851'),
(10, 'Ontinyent', '-0.6863', '38.9226'),
(11, 'Sevilla', '-5.9995', '37.4291'),
(12, 'Alicante', '-0.6907', '38.4952');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operation`
--

CREATE TABLE `operation` (
  `id_operation` int(100) NOT NULL,
  `operation_type` varchar(100) NOT NULL,
  `img_operation` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `operation`
--

INSERT INTO `operation` (`id_operation`, `operation_type`, `img_operation`) VALUES
(1, 'Compra', 'module\\home\\view\\img_icon\\Operations\\compra.png'),
(2, 'Alquiler', 'module\\home\\view\\img_icon\\Operations\\alquiler.jpg'),
(3, 'Compartir', 'module\\home\\view\\img_icon\\Operations\\compartir.jpg'),
(4, 'Alquilar una Habitación', 'module\\home\\view\\img_icon\\Operations\\alquiler_habitacion.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo`
--

CREATE TABLE `tipo` (
  `id_type` int(100) NOT NULL,
  `tipos` varchar(100) NOT NULL,
  `type_icon` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo`
--

INSERT INTO `tipo` (`id_type`, `tipos`, `type_icon`) VALUES
(1, 'Casa', 'module\\home\\view\\img_icon\\Type\\Casa.jpg'),
(2, 'Chalet', 'module\\home\\view\\img_icon\\Type\\Chalet.jpg'),
(3, 'Piso', 'module\\home\\view\\img_icon\\Type\\Piso.jpg'),
(4, 'Apartamento', 'module\\home\\view\\img_icon\\Type\\apartamento.jpg'),
(5, 'Duplex', 'module\\home\\view\\img_icon\\Type\\Duplex.jpg'),
(6, 'Local', 'module\\home\\view\\img_icon\\Type\\local.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` bigint(20) NOT NULL,
  `username` varchar(25) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `type_user` varchar(50) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `token_email` varchar(100) DEFAULT NULL,
  `activate` tinyint(1) NOT NULL DEFAULT 0,
  `numAttempts` int(1) DEFAULT NULL,
  `token_otp` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`, `email`, `type_user`, `avatar`, `token_email`, `activate`, `numAttempts`, `token_otp`) VALUES
(1, 'GymMaster69', '$2y$12$LggSHVZ5BTZaLoI40TNBOe8h.90zD1W6qm7LkvL8JwigqDzyITu/q', 'gymaster69@gmail.com', 'client', 'https://i.pravatar.cc/500?u=edabb60e60a59298a46c9b8ab76ca545', NULL, 0, 3, NULL),
(4, 'yomogana', '$2y$12$8mSTu/cgSHikIJGj2N1vXOl6x6cBgHMQUe2823wKdlRJR/n4IMqKy', '3eiasl@gmail.com', 'client', '/proyectos/FRAMEWORK_CITYHOUSE/view/images/profile/profile_img_users/img_yomogana.png', '', 1, NULL, NULL),
(6, 'Xavi GOD', '$2y$12$Cwc6ovrX/8U9rgQ72zw7sOsit3jouOQpMyoSBmAufk52085I09Z1m', 'xavi@gmail.com', 'client', 'https://i.pravatar.cc/500?u=e0972c3309c890a36aa459f8d53f48c6', NULL, 0, 3, NULL),
(16, 'javirios', '$2y$12$pfGsDS9a2SrwxvOnxBpDsO6KWG5ya2Q.Rc6EVMZjp0aN4XMKapsui', 'javi@gmail.com', 'client', 'https://i.pravatar.cc/500?u=6e4b63ab335d3fd6055d0a9ebbb50894', NULL, 0, 3, '266f'),
(17, '3eiasl_google', '', '3eiasl@gmail.com_google', 'client', '/proyectos/FRAMEWORK_CITYHOUSE/view/images/profile/profile_img_users/img_3eiasl_google.png', '', 0, 3, '651b'),
(23, 'pepito', '$2y$10$Aqu.1tCDlWpuJ8qyDK5H5O7xeEuCXUmPmIvx/pz5kUmcxfYRF3eKS', 'pepito@gmail.com', 'client', 'https://robohash.org/42c58abd933c11304fcaa7a18cefaaaa', '', 1, NULL, NULL);

--
-- Disparadores `users`
--
DELIMITER $$
CREATE TRIGGER `update_username` AFTER UPDATE ON `users` FOR EACH ROW BEGIN
    IF OLD.username != NEW.username THEN
        -- Update username in vivienda_likes table
        UPDATE vivienda_likes
        SET username = NEW.username
        WHERE username = OLD.username;

        -- Update username in carrito table
        UPDATE carrito
        SET username = NEW.username
        WHERE username = OLD.username;

        -- Update username in facturas table
        UPDATE facturas
        SET username = NEW.username
        WHERE username = OLD.username;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vivienda`
--

CREATE TABLE `vivienda` (
  `id_vivienda` int(100) NOT NULL,
  `id_catastro` int(100) NOT NULL,
  `m2` int(100) NOT NULL,
  `f_construccion` varchar(100) NOT NULL,
  `n_habitaciones` int(100) NOT NULL,
  `n_banos` int(100) NOT NULL,
  `img_vivienda` varchar(100) NOT NULL,
  `id_type` int(100) NOT NULL,
  `id_imagenes` int(100) NOT NULL,
  `id_city` int(100) NOT NULL,
  `ubicacion` varchar(1000) NOT NULL,
  `vistas` int(11) NOT NULL,
  `id_mapbox` int(11) DEFAULT NULL,
  `stock` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vivienda`
--

INSERT INTO `vivienda` (`id_vivienda`, `id_catastro`, `m2`, `f_construccion`, `n_habitaciones`, `n_banos`, `img_vivienda`, `id_type`, `id_imagenes`, `id_city`, `ubicacion`, `vistas`, `id_mapbox`, `stock`) VALUES
(1, 123, 150, '2021-09-22', 3, 2, 'module\\shop\\view\\img_shop\\casa_1.jpg', 1, 1, 1, 'Calle de Guadalquivir,1,2', 270, 1, 1),
(2, 234, 140, '2022-03-30', 1, 2, 'module\\shop\\view\\img_shop\\chalet_1.jpg', 2, 2, 1, 'Calle de Alfonso el Sabio ,45,3', 247, 2, 5),
(3, 345, 120, '2017-04-26', 4, 3, 'module\\shop\\view\\img_shop\\piso_1.jpg', 3, 3, 3, 'Gran Via,77,3', 71, 3, 7),
(4, 456, 130, '2013-07-01', 2, 1, 'module\\shop\\view\\img_shop\\apartamento_3.jpg', 4, 4, 4, 'Alandalus Maximus,91,1', 45, 4, 12),
(5, 567, 90, '2024-01-14', 3, 2, 'module\\shop\\view\\img_shop\\casa_2.jpg', 1, 5, 5, 'Costa Proseno,21,2', 22, 5, 4),
(6, 678, 170, '2005-02-08', 3, 2, 'module\\shop\\view\\img_shop\\chalet_2.jpg', 2, 6, 1, 'Calle de los Juzgados,16,2', 8, 6, 5),
(7, 789, 220, '2005-10-05', 2, 2, 'module\\shop\\view\\img_shop\\piso_2.jpg', 3, 7, 3, 'Calle de la Rosa de Guadalupe,15,4', 147, 7, 6),
(8, 890, 340, '2012-05-22', 5, 3, 'module\\shop\\view\\img_shop\\apartamento_2.jpg', 4, 8, 2, 'Calle de la jurisdicción Romana,33,3', 19, 8, 7),
(9, 8894, 550, '12/10/2001', 4, 3, 'module\\shop\\view\\img_shop\\casa_2.jpg', 3, 9, 6, 'Calle de todos los santos 38,3', 13, 9, 3),
(10, 4564, 130, '12/05/2006', 2, 2, 'module\\shop\\view\\img_shop\\apartamento_2.jpg', 5, 10, 5, 'Calle los mendigos 3,4', 36, 10, 2),
(11, 5668, 100, '01/10/2004', 3, 3, 'module\\shop\\view\\img_shop\\apartamento_2.jpg', 6, 12, 2, 'Calle xavi perez 24,16', 9, 11, 3),
(12, 2258, 160, '07/10/1973', 4, 2, 'module\\shop\\view\\img_shop\\piso_2.jpg', 5, 13, 1, 'Calle takis 120,4', 16, 12, 5),
(13, 9547, 480, '28/11/1998', 6, 4, 'module\\shop\\view\\img_shop\\chalet_1.jpg', 1, 14, 6, 'Calle filipinos 55,8', 7, 1, 4),
(15, 5594, 550, '10/07/2023', 3, 2, 'module\\shop\\view\\img_shop\\apartamento_2.jpg', 4, 2, 6, 'Direccion 0', 7, 2, 16),
(283, 5569, 120, '20/05/2020', 3, 2, 'module\\shop\\view\\img_shop\\casa_1.jpg', 1, 1, 1, 'Dirección 1', 175, 3, 4),
(284, 3265, 150, '2022-02-20', 4, 3, 'module\\shop\\view\\img_shop\\chalet_1.jpg', 2, 2, 2, 'Dirección 2', 203, 4, 2),
(285, 221, 100, '2022-03-25', 2, 1, 'module\\shop\\view\\img_shop\\casa_1.jpg', 1, 3, 3, 'Dirección 3', 182, 5, 4),
(286, 879, 200, '2022-04-30', 5, 3, 'module\\shop\\view\\img_shop\\piso_1.jpg', 3, 4, 1, 'Dirección 4', 255, 6, 3),
(287, 978946, 180, '2022-05-15', 4, 2, 'module\\shop\\view\\img_shop\\chalet_1.jpg', 5, 5, 2, 'Dirección 5', 221, 1, 5),
(288, 89792, 90, '2022-06-20', 2, 1, 'module\\shop\\view\\img_shop\\casa_1.jpg', 1, 6, 3, 'Dirección 6', 175, 2, 3),
(289, 56445, 160, '2022-07-25', 3, 2, 'module\\shop\\view\\img_shop\\piso_1.jpg', 3, 7, 1, 'Dirección 7', 234, 3, 6),
(290, 235, 140, '2022-08-30', 4, 2, 'module\\shop\\view\\img_shop\\chalet_1.jpg', 2, 8, 2, 'Dirección 8', 192, 5, 7),
(291, 979, 110, '2022-09-15', 2, 1, 'module\\shop\\view\\img_shop\\casa_1.jpg', 1, 9, 3, 'Dirección 9', 204, 6, 9),
(292, 5948, 170, '2022-10-20', 3, 2, 'module\\shop\\view\\img_shop\\piso_1.jpg', 3, 10, 1, 'Dirección 10', 242, 1, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vivienda_category`
--

CREATE TABLE `vivienda_category` (
  `id_category` int(100) NOT NULL,
  `id_vivienda` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vivienda_category`
--

INSERT INTO `vivienda_category` (`id_category`, `id_vivienda`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(1, 5),
(2, 6),
(3, 7),
(4, 8),
(3, 9),
(1, 10),
(2, 11),
(3, 12),
(4, 13),
(4, 283),
(2, 284),
(3, 285),
(4, 286),
(1, 287),
(2, 288),
(3, 289),
(4, 290),
(4, 291),
(2, 292),
(3, 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vivienda_custom`
--

CREATE TABLE `vivienda_custom` (
  `id_vivienda` int(11) DEFAULT NULL,
  `id_custom_room` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vivienda_custom`
--

INSERT INTO `vivienda_custom` (`id_vivienda`, `id_custom_room`) VALUES
(1, 1),
(3, 2),
(5, 3),
(6, 4),
(9, 5),
(11, 6),
(13, 4),
(4, 1),
(2, 5),
(4, 6),
(7, 4),
(8, 2),
(12, 3),
(10, 1),
(283, 1),
(283, 3),
(284, 4),
(286, 6),
(285, 5),
(285, 6),
(287, 2),
(288, 3),
(289, 1),
(290, 4),
(281, 5),
(292, 4),
(282, 6),
(290, 1),
(289, 2),
(287, 3),
(15, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vivienda_extra`
--

CREATE TABLE `vivienda_extra` (
  `id_vivienda` int(100) NOT NULL,
  `id_extra` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vivienda_extra`
--

INSERT INTO `vivienda_extra` (`id_vivienda`, `id_extra`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 1),
(7, 2),
(8, 3),
(1, 3),
(2, 1),
(3, 2),
(4, 5),
(2, 4),
(8, 1),
(9, 3),
(9, 4),
(10, 5),
(10, 2),
(11, 1),
(11, 4),
(12, 5),
(12, 2),
(12, 1),
(13, 5),
(13, 4),
(10, 3),
(284, 2),
(286, 4),
(287, 1),
(288, 2),
(289, 3),
(290, 4),
(291, 5),
(284, 5),
(286, 1),
(287, 2),
(288, 3),
(284, 3),
(286, 3),
(286, 3),
(286, 3),
(283, 1),
(283, 3),
(283, 4),
(285, 2),
(283, 5),
(292, 3),
(292, 4),
(15, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vivienda_likes`
--

CREATE TABLE `vivienda_likes` (
  `id_like` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `id_vivienda` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vivienda_likes`
--

INSERT INTO `vivienda_likes` (`id_like`, `username`, `id_vivienda`) VALUES
(2, 'javirios', 3),
(14, 'Xavi GOD', 3),
(29, 'Xavi GOD', 2),
(35, 'Xavi GOD', 4),
(36, 'Xavi GOD', 1),
(163, 'pepito', 4),
(165, 'pepito', 2),
(167, 'pepito', 1),
(169, 'pepito', 3),
(266, '3eiasl_google', 1),
(267, '3eiasl_google', 3),
(268, '3eiasl_google', 4),
(271, '3eiasl_google', 2),
(275, 'yomogana', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vivienda_operation`
--

CREATE TABLE `vivienda_operation` (
  `id_vivienda` int(100) NOT NULL,
  `id_operation` int(100) NOT NULL,
  `price` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vivienda_operation`
--

INSERT INTO `vivienda_operation` (`id_vivienda`, `id_operation`, `price`) VALUES
(1, 1, '300000'),
(2, 2, '410'),
(3, 3, '150'),
(4, 4, '250'),
(5, 1, '250000'),
(6, 2, '780'),
(7, 3, '275'),
(8, 4, '180'),
(9, 3, '260'),
(10, 1, '78000'),
(11, 2, '320'),
(12, 4, '660'),
(13, 1, '170000'),
(283, 1, '350000'),
(284, 2, '420'),
(285, 3, '330'),
(286, 4, '660'),
(287, 1, '263000'),
(288, 2, '1200'),
(289, 3, '780'),
(290, 4, '550'),
(291, 4, '399'),
(292, 2, '975'),
(15, 4, '360');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id_carrito`),
  ADD KEY `id_vivienda` (`id_vivienda`),
  ADD KEY `username` (`username`);

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indices de la tabla `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id_city`);

--
-- Indices de la tabla `customed_rooms`
--
ALTER TABLE `customed_rooms`
  ADD PRIMARY KEY (`id_custom_room`);

--
-- Indices de la tabla `extras`
--
ALTER TABLE `extras`
  ADD PRIMARY KEY (`id_extra`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`id_factura`),
  ADD KEY `id_vivienda` (`id_vivienda`),
  ADD KEY `username` (`username`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id_imagenes`),
  ADD KEY `id_vivienda` (`id_vivienda`);

--
-- Indices de la tabla `mapbox`
--
ALTER TABLE `mapbox`
  ADD PRIMARY KEY (`id_mapbox`);

--
-- Indices de la tabla `operation`
--
ALTER TABLE `operation`
  ADD PRIMARY KEY (`id_operation`);

--
-- Indices de la tabla `tipo`
--
ALTER TABLE `tipo`
  ADD PRIMARY KEY (`id_type`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `vivienda`
--
ALTER TABLE `vivienda`
  ADD PRIMARY KEY (`id_vivienda`),
  ADD KEY `id_type` (`id_type`),
  ADD KEY `id_imagenes` (`id_imagenes`),
  ADD KEY `id_city` (`id_city`),
  ADD KEY `id_mapbox` (`id_mapbox`);

--
-- Indices de la tabla `vivienda_category`
--
ALTER TABLE `vivienda_category`
  ADD KEY `id_vivienda` (`id_vivienda`),
  ADD KEY `id_category` (`id_category`);

--
-- Indices de la tabla `vivienda_custom`
--
ALTER TABLE `vivienda_custom`
  ADD KEY `id_vivienda` (`id_vivienda`),
  ADD KEY `id_custom_room` (`id_custom_room`);

--
-- Indices de la tabla `vivienda_extra`
--
ALTER TABLE `vivienda_extra`
  ADD KEY `id_extra` (`id_extra`),
  ADD KEY `id_vivienda` (`id_vivienda`);

--
-- Indices de la tabla `vivienda_likes`
--
ALTER TABLE `vivienda_likes`
  ADD PRIMARY KEY (`id_like`),
  ADD KEY `username` (`username`),
  ADD KEY `id_vivienda` (`id_vivienda`);

--
-- Indices de la tabla `vivienda_operation`
--
ALTER TABLE `vivienda_operation`
  ADD KEY `id_vivienda` (`id_vivienda`),
  ADD KEY `id_operation` (`id_operation`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id_carrito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=440;

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `city`
--
ALTER TABLE `city`
  MODIFY `id_city` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT de la tabla `extras`
--
ALTER TABLE `extras`
  MODIFY `id_extra` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `id_factura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id_imagenes` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT de la tabla `mapbox`
--
ALTER TABLE `mapbox`
  MODIFY `id_mapbox` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `operation`
--
ALTER TABLE `operation`
  MODIFY `id_operation` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tipo`
--
ALTER TABLE `tipo`
  MODIFY `id_type` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=831;

--
-- AUTO_INCREMENT de la tabla `vivienda`
--
ALTER TABLE `vivienda`
  MODIFY `id_vivienda` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=293;

--
-- AUTO_INCREMENT de la tabla `vivienda_likes`
--
ALTER TABLE `vivienda_likes`
  MODIFY `id_like` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=276;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`id_vivienda`) REFERENCES `vivienda` (`id_vivienda`);

--
-- Filtros para la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`id_vivienda`) REFERENCES `vivienda` (`id_vivienda`);

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`id_vivienda`) REFERENCES `vivienda` (`id_vivienda`);

--
-- Filtros para la tabla `vivienda`
--
ALTER TABLE `vivienda`
  ADD CONSTRAINT `vivienda_ibfk_1` FOREIGN KEY (`id_type`) REFERENCES `tipo` (`id_type`),
  ADD CONSTRAINT `vivienda_ibfk_2` FOREIGN KEY (`id_imagenes`) REFERENCES `imagenes` (`id_imagenes`),
  ADD CONSTRAINT `vivienda_ibfk_3` FOREIGN KEY (`id_city`) REFERENCES `city` (`id_city`),
  ADD CONSTRAINT `vivienda_ibfk_4` FOREIGN KEY (`id_mapbox`) REFERENCES `mapbox` (`id_mapbox`);

--
-- Filtros para la tabla `vivienda_category`
--
ALTER TABLE `vivienda_category`
  ADD CONSTRAINT `vivienda_category_ibfk_1` FOREIGN KEY (`id_vivienda`) REFERENCES `vivienda` (`id_vivienda`),
  ADD CONSTRAINT `vivienda_category_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`);

--
-- Filtros para la tabla `vivienda_extra`
--
ALTER TABLE `vivienda_extra`
  ADD CONSTRAINT `vivienda_extra_ibfk_1` FOREIGN KEY (`id_extra`) REFERENCES `extras` (`id_extra`),
  ADD CONSTRAINT `vivienda_extra_ibfk_2` FOREIGN KEY (`id_vivienda`) REFERENCES `vivienda` (`id_vivienda`);

--
-- Filtros para la tabla `vivienda_operation`
--
ALTER TABLE `vivienda_operation`
  ADD CONSTRAINT `vivienda_operation_ibfk_1` FOREIGN KEY (`id_vivienda`) REFERENCES `vivienda` (`id_vivienda`),
  ADD CONSTRAINT `vivienda_operation_ibfk_2` FOREIGN KEY (`id_operation`) REFERENCES `operation` (`id_operation`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
