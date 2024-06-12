# CITYHOUSE

![PHP](https://img.shields.io/badge/-PHP-9cf)
![JS](https://img.shields.io/badge/-JS-yellow)
![JQUERY](https://img.shields.io/badge/-JQUERY-orange)
![MYSQL](https://img.shields.io/badge/-MYSQL-lightgrey)
![JWT](https://img.shields.io/badge/-JWT-grey)

## Descripción

Esta aplicación simula una plataforma de comercio electrónico sobre viviendas nuevas , usadas, para comprar, para alquilar y muchas cosas más. Con una interfaz de usuario intuitiva y fácil de usar, los usuarios pueden navegar por diferentes categorías de viviendas, ver fotos y especificaciones detalladas, comparar precios y características antes de realizar una compra. Se han implementado funcionalidades enfocadas a mejorar la experiencia del usuario, tales como los filtros dinámicos, realizar like a las viviendas y consultar aquellas consultas previas que hemos realizado.
En esta versión el proyecto anterior, ha sido migrado al Framework proporcionado por la profesora. Este FW se basa en la arquitectura Modelo -> Vista -> Controlador. 

## Funciones

1. __Sobre la web:__

 A nivel general de la web, tenemos funcionalidades que se puede realizar desde cualquier ventana:
  * Buscador de productos dinámico con asistencia al buscar "autosearch".
  * Acciones sobre nuestra sesión de usuario.
  * Comprobación del token del usuario mediante JWT.

2. __Home:__ 🏨

 En el modulo Home el usuario tomará contacto con la web:
  * Filtro para buscar dinámicamente
  * Carrousel sobre marcas con salto de página
  * Filtros establecidos con salto de página
  * Ultimas visitas
  * Mas visitadas
  * Recomendaciones

 <p align="left">
  <img src="https://github.com/alfosan/images_fw/blob/main/home.PNG" alt="Profile" width="300"/>
</p>

 3. __Shop:__ 📃
 
  El módulo de Shop es el más importante de la aplicación, el usuario puede filtrar, ordenar la busqueda, acceder a los detalles del producto y agregarlo al carrito, a la lista de deseos con los likes, entre muchas otras cosas.
  * Listado de productos
  * Ordenar productos
  * Filtrar productos
  * Mapa con las viviendas geolocalizadas
  * Paginación
  * Scroll Relacionado
  * Seleccionar la cantidad de productos que queremos añadir al carrito
  * Likes

 <p align="left">
  <img src="https://github.com/alfosan/images_fw/blob/main/shop.PNG" alt="Profile" width="300"/>
</p>

4. __Login/Register:__ 🚪

 Es el módulo con más seguridad de la aplicación, en el podemos darnos de alta o iniciar sesión con nuestra cuenta.
  * Validación de usuarios no dados de alta anteriormente
  * Validación de datos en cliente y servidor
  * Social login implementado (github, google)
  * Recuperar contraseña mediante email, cambiar contraseña.
  * Fail Attempts y OTP wassap.

<p align="left">
  <img src="https://github.com/alfosan/images_fw/blob/main/login.PNG" alt="Profile" width="300"/>
</p>

5. __Cart:__ 👜

 En el veremos nuestra cesta de compra y realizaremos el checkout del carrito.
 * Agregar o eliminar productos con el "+" y "-"
 * Eliminar linea de Productos, eliminar todo el carrito.
 * Tabla a tiempo real que calcula precios.
 * Finalizar pedido
 * Seguridad con transacciones para no realizar pedidos erroneos o si no estan en stock.
 * Procedimiento almacenado para procesar la compra

<p align="left">
  <img src="https://github.com/alfosan/images_fw/blob/main/carrito.PNG" alt="Profile" width="300"/>
</p>

6. __Profile:__ 🧑

En este módulo hemos implementado las facturas, lista de deseos y fileUpload.
* En las facturas tenemos una API de PDF para descargarlas y otra de QR.
* En la lista de deseos hemos implementado para poder ponerlo en el carrito directamente y quitándole el like eliminarlo.
* Y en el FileUpload implementamos el cambio de avatar con el DropZone junto al username, password y email.

<p align="left">
  <img src="https://github.com/alfosan/images_fw/blob/main/uploadfile.PNG" alt="Profile" width="300"/>
</p>
<p align="left">
  <img src="https://github.com/alfosan/images_fw/blob/main/mylikes.PNG" alt="Mylikes" width="400"/>
</p>
<p align="left">
  <img src="https://github.com/alfosan/images_fw/blob/main/facturas.PNG" alt="Facturas" width="400"/>
</p>




