-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-01-2024 a las 19:09:36
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

--------------------------------------------
--
-- Estructura de tabla para la tabla `vivienda`
--
--------------------------------------------
CREATE TABLE `vivienda` (
  `id_vivienda` int(100) NOT NULL AUTO_INCREMENT,
  `id_catastro` int(100) NOT NULL,
  `m2` int(100) NOT NULL,
  `f_construccion` varchar(100) NOT NULL,
  `n_habitaciones` int(100) NOT NULL,
  `n_banos` int(100) NOT NULL,
  `img_vivienda` varchar(100) NOT NULL,
  `id_type` int(100) NOT NULL,
  `id_imagenes` int(100) NOT NULL,
  `id_city` int(100) NOT NULL,
  PRIMARY KEY (`id_vivienda`),
  FOREIGN KEY (`id_type`) REFERENCES `tipo`(`id_type`),
  FOREIGN KEY (`id_imagenes`) REFERENCES `imagenes`(`id_imagenes`),
  FOREIGN KEY (`id_city`) REFERENCES `city`(`id_city`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--------------------------------------------
--
-- Volcado de datos para la tabla `vivienda`
--
--------------------------------------------
INSERT INTO `vivienda` (`id_vivienda`, `id_catastro`, `m2`, `f_construccion`, `n_habitaciones`, `n_banos`, `img_vivienda`, `id_type`,`id_imagenes`,`id_city`) VALUES
(1, 123, 150, '2021-09-22', 3, 2, 'id_imagen', 1, 1, 1),
(2, 234, 140, '2022-03-30', 1, 2, 'id_imagen', 2, 1, 2),
(3, 345, 120, '2017-04-26', 4, 3, 'id_imagen', 3, 1, 3),
(4, 456, 130, '2013-07-01', 2, 1, 'id_imagen', 4, 1, 4),
(5, 567, 90, '2024-01-14', 3, 2, 'id_imagen', 1, 1, 5),
(6, 678, 170, '2005-02-08', 3, 2, 'id_imagen', 2, 1, 1),
(7, 789, 220, '2005-10-05', 2, 2, 'id_imagen', 3, 1, 3),
(8, 890, 340, '2012-05-22', 5, 3, 'id_imagen', 4, 1, 2);
--------------------------------------------
--
-- Estructura de tabla para la tabla `tipo`
--
--------------------------------------------
CREATE TABLE `tipo` (
  `id_type` int(100) NOT NULL AUTO_INCREMENT,
  `tipos` varchar(100) NOT NULL,
  `type_icon` varchar(100) NOT NULL,    -- YA ESTA
  PRIMARY KEY (`id_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--------------------------------------------
--
-- Volcado de datos para la tabla `tipo`
--
--------------------------------------------
INSERT INTO `tipo` (`id_type`, `tipos`,`type_icon`)
VALUES
(1, 'Casa','ruta'),
(2, 'Chalet','ruta'),                         -- YA ESTAs
(3, 'Piso','ruta'),
(4, 'Apartamento','ruta');
--------------------------------------------
--
-- Estructura de tabla para la tabla `category`
--
--------------------------------------------
CREATE TABLE `category` (
  `id_category` int(100) NOT NULL AUTO_INCREMENT,
  `categorys` varchar(100) NOT NULL,              
  `category_icon` varchar(100) NOT NULL,       -- YA ESTAs
  PRIMARY KEY (`id_category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--------------------------------------------
--
-- Volcado de datos para la tabla `category`
--
--------------------------------------------
INSERT INTO `category` (`id_category`, `categorys`, `category_icon`)
VALUES
(1, 'Nueva', 'ruta'),
(2, 'Segunda_mano', 'ruta'),                 -- YA ESTAs
(3, 'Primera_linea', 'ruta'),
(4, 'Diseno', 'ruta');
--------------------------------------------
--
-- Estructura de tabla para la tabla `city`
--
--------------------------------------------
CREATE TABLE `city` (
  `id_city` int(100) NOT NULL AUTO_INCREMENT,
  `name_city` varchar(100) DEFAULT NULL,               -- YA ESTAs
  PRIMARY KEY (`id_city`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--------------------------------------------
--
-- Volcado de datos para la tabla `city`
--
--------------------------------------------
INSERT INTO `city` (`id_city`, `name_city`) VALUES
(1, 'Valencia'),
(2, 'Barcelona'),                          -- YA ESTAs
(3, 'Sevilla'),
(4, 'Alicante'),
(5, 'Teruel'),
(6, 'Madrid');
--------------------------------------------
--
-- Estructura de tabla para la tabla `exceptions`
--
--------------------------------------------
CREATE TABLE `exceptions` (
  `type_error` int(10) NOT NULL,
  `spot` varchar(100) NOT NULL,                      -- YA ESTAs
  `current_date_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--------------------------------------------
--
-- Volcado de datos para la tabla `exceptions` MAS ADELEANTE INSERTAR DATOS
--
--------------------------------------------

-- AQUI IRIA LA TABLA EXCEPTION

--------------------------------------------
--
-- Estructura de tabla para la tabla `extras`
--
--------------------------------------------
CREATE TABLE `extras` (
  `id_extra` int(100) NOT NULL AUTO_INCREMENT,
  `name_extra` varchar(100) NOT NULL,                  -- YA ESTAs
  PRIMARY KEY (`id_extra`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--------------------------------------------
--
-- Volcado de datos para la tabla `extras`
--
--------------------------------------------
INSERT INTO `extras` (`id_extra`, `name_extra`) VALUES
(1, 'calefaccion'),
(2, 'ascensor'),
(3, 'jardin'),                                       -- YA ESTAs
(4, 'garaje'),
(5, 'balcon');
--------------------------------------------
--
-- Estructura de tabla para la tabla `model`
--
--------------------------------------------
CREATE TABLE `vivienda_extra` (
  `id_vivienda` int(100) NOT NULL,
  `id_extra` int(100) DEFAULT NULL,
  FOREIGN KEY (`id_extra`) REFERENCES `extras`(`id_extra`),
  FOREIGN KEY (`id_vivienda`) REFERENCES `vivienda`(`id_vivienda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--------------------------------------------
--
-- Estructura de tabla para la tabla `operation`
--
--------------------------------------------
CREATE TABLE `operation` (
  `id_operation` int(100) NOT NULL AUTO_INCREMENT,                 -- YA ESTAs
  `operation_type` varchar(100) NOT NULL,
  `img_operation` varchar(100) NOT NULL,
  PRIMARY KEY (`id_operation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--------------------------------------------
--
-- Volcado de datos para la tabla `type_motor`
--
--------------------------------------------
INSERT INTO `operation` (`id_operation`, `operation_type`) VALUES
(1, 'compra','ruta'),
(2, 'alquiler','ruta'),                                -- YA ESTAs
(3, 'compartir','ruta'),
(4, 'alquiler_habiracion','ruta');
--------------------------------------------
--
-- Estructura de tabla para la tabla `vivienda_operation`
--
--------------------------------------------
CREATE TABLE `vivienda_operation` (
  `id_vivienda` int(100) NOT NULL,
  `id_operation` int(100) NOT NULL,
  `price` int(100) NOT NULL,
  FOREIGN KEY (`id_vivienda`) REFERENCES `vivienda`(`id_vivienda`),
  FOREIGN KEY (`id_operation`) REFERENCES `operation`(`id_operation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--------------------------------------------
--
-- Estructura de tabla para la tabla `imagenes`
--
--------------------------------------------
CREATE TABLE `imagenes` (
  `id_imagenes` int(100) NOT NULL AUTO_INCREMENT,
  `id_vivienda` int(100) NOT NULL,
  `img_ruta` varchar(100) NOT NULL,
  PRIMARY KEY (`id_imagenes`),
  FOREIGN KEY (`id_vivienda`) REFERENCES `vivienda`(`id_vivienda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--------------------------------------------
--
-- Volcado de datos para la tabla `imagenes`
--
--------------------------------------------
INSERT INTO `imagenes` (`id_imagenes`, `id_vivienda`,`img_ruta`) VALUES
(1,1, 'ruta'),
(2,2, 'ruta'),
(3,3, 'ruta'),
(4,4, 'ruta');

-- ALTER TABLE `imagenes`
-- ADD FOREIGN KEY (`id_vivienda`)
-- REFERENCES `vivienda`(`id_vivienda`);

--------------------------------------------
--
-- Estructura de tabla para la tabla `vivienda_category`
--
--------------------------------------------
CREATE TABLE `vivienda_category` (
  `id_category` int(100) NOT NULL,
  `id_vivienda` int(100) NOT NULL,
  FOREIGN KEY (`id_vivienda`) REFERENCES `vivienda`(`id_vivienda`),
  FOREIGN KEY (`id_category`) REFERENCES `category`(`id_category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--------------------------------------------

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
