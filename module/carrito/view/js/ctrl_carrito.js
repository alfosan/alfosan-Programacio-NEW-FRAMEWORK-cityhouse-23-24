
// function load_carrito(){
//   var tokens = localStorage.getItem('user_tokens');
//   if (!tokens) {
//       window.location.href = 'http://localhost/proyectos/FRAMEWORK_CITYHOUSE/login';
//       return;
//   }

//   var username = localStorage.getItem('username');

//   $.ajax({
//       url: friendlyURL('?module=carrito&op=load_carrito'),
//       type: 'GET',
//       dataType: 'json',
//       data: {username: username},
//       success: function(response) {
//           if (response.status === 'success') {
//               // Lógica para mostrar los productos en el carrito
//               console.log(response.data);
//           } else {
//               console.log(response.message);
//           }
//       },
//       error: function(xhr, status, error) {
//           console.error(xhr.responseText);
//       }
//   });
// }

$(document).on('click', '.carrito-button', function() {
    var tokens = localStorage.getItem('user_tokens');
    
    if (!tokens) {
        window.location.href = 'http://localhost/proyectos/FRAMEWORK_CITYHOUSE/login';
        return;
    }
  
    var id_vivienda = $(this).attr('id');
    console.log('ID de la vivienda_CARRITO:', id_vivienda);
    var username = localStorage.getItem('username');
    console.log(username);

    // Crear un clon del botón para la animación
    var $button = $(this);
    var $clone = $button.clone().css({
        position: 'absolute',
        top: $button.offset().top,
        left: $button.offset().left,
        width: $button.width(),
        height: $button.height(),
        zIndex: 1000
    }).appendTo('body');

    // Añadir la clase de animación
    $clone.addClass('fly-animation');

    // Al finalizar la animación, eliminar el clon
    $clone.one('animationend', function() {
        $clone.remove();
        contador_carrito(); // Actualizar el contador del carrito después de la animación
    });

    $.ajax({
        url: friendlyURL('?module=carrito&op=add_to_carrito'),
        type: 'POST',
        dataType: 'json',
        data: {id_vivienda: id_vivienda, username: username},
        success: function(response) {
            console.log('Se ha añadido esta vivienda al carrito correctamente.');
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
            console.error('ERROR DESDE EL CARRITOOOOOoooOOoOoOOo');
        }
    });
});

function contador_carrito() {
    var username = localStorage.getItem('username');

    $.ajax({
        url: friendlyURL('?module=carrito&op=count_carrito'),
        type: 'POST',
        dataType: 'json',
        data: {username: username},
        success: function(response) {
            if (response.status === 'success') {
                console.log('El número de viviendas en el carrito es de: ', response.data.count);
                $('#contador_carrito').text(response.data.count);
            } else {
                console.error('Error:', response.message);
            }
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
            console.error('ERROR DESDE EL CARRITOOOOOoooOOoOoOOo COUNT');
        }
    });
}

$(document).ready(function() {
//   load_carrito();
    contador_carrito();
});