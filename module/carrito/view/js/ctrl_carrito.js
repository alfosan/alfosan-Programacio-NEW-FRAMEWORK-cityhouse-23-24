// --------------------------------------
// -------------------------------------- CARGAMOS EL CARRITO
// --------------------------------------
var all_data_carrito = [];

function load_carrito() {
  var username = localStorage.getItem('username');
  console.log(username);
  $.ajax({
    url: friendlyURL('?module=carrito&op=load_carrito'),
    type: 'POST',
    dataType: 'json',
    data: { username: username },
    success: function(response) {
      console.log(response);
      if (response.length > 0) {
        all_data_carrito = response; // Almacena los datos del carrito en la variable global
        let cartItemsHTML = '';
        let totalPrice = 0;
        let tableHTML = `
          <table class="table">
            <thead>
              <tr>
                <th>VIVIENDA</th>
                <th>CANT</th>
                <th>PRICE €</th>
              </tr>
            </thead>
            <tbody>`;
        // Función para formatear el precio con puntos
        function formatPriceWithDots(price) {
          let [integerPart, decimalPart] = price.toFixed(2).split('.');
          let withDots = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
          return `${withDots},${decimalPart}`;
        }

        response.forEach(item => {
          let itemTotalPrice = item.price * item.encargos;
          totalPrice += itemTotalPrice;
          cartItemsHTML += `
            <div class="row border-top border-bottom">
              <div class="row main align-items-center cart-item">
                <div class="col-2">
                  <img class="img-fluid" src="${item.img_vivienda}" alt="Product Image">
                </div>
                <div class="col">
                  <div class="row text-muted">${item.tipos}</div>
                  <div class="row">En ${item.name_city}</div>
                </div>
                <div class="col">
                  <a href="#" class="minus" data-id="${item.id_vivienda}">-</a>
                  <a href="#" class="border" data-encargos="${item.encargos}">${item.encargos}</a>
                  <a href="#" class="plus" data-id="${item.id_vivienda}">+</a>
                </div>
                <div class="col">€ ${formatPriceWithDots(itemTotalPrice)} <span class="close" data-id="${item.id_vivienda}">&#10005;</span></div>
              </div>
            </div>`;
          
          tableHTML += `
            <tr>
              <td>${item.tipos} en  ${item.name_city}</td>
              <td>${item.encargos}</td>
              <td>${itemTotalPrice.toFixed(2)}</td>
            </tr>`;
        });

        tableHTML += `</tbody></table>`;
        
        $('.cart').append(cartItemsHTML);
        $('.num_vivienda_and_price').html(tableHTML);
        update_cart_count(response.length, totalPrice);
      } else {
        $('.cart').append('<div class="row main align-items-center">No items in cart</div>');
        $('.num_vivienda_and_price').html('');
        update_cart_count(0, 0);
        // show_recomendations(); PROXIMAMENTE EN CINES
      }
    },
    error: function(xhr, status, error) {
      console.error(xhr.responseText);
    }
  });
}

// --------------------------------------
// -------------------------------------- REFRESH CONTADOR DEL CARRITO 
// --------------------------------------


function update_cart_count(count, totalPrice) {
    function formatPriceWithDots(price) {
        let [integerPart, decimalPart] = price.toFixed(2).split('.');
        let withDots = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${withDots},${decimalPart}`;
    }

    $('.title .col.align-self-center.text-right.text-muted').text(`${count} items`);
    
    $('.summary .row .col').first().text(`ITEMS ${count}`);
    
    $('.summary .row .col.text-right').first().text(`€ ${formatPriceWithDots(totalPrice)}`);

    let shippingCost = parseFloat($('.summary select option:selected').text().match(/[\d\.]+/));
    let finalTotalPrice = totalPrice + (shippingCost || 0);
    $('.summary .row').last().find('.col.text-right').text(`€ ${formatPriceWithDots(finalTotalPrice)}`);
}

// --------------------------------------
// -------------------------------------- + y - DEL CARRITO
// --------------------------------------

$(document).on('click', '.plus', function() {
    var id_vivienda = $(this).data('id');
    var encargos = parseInt($(this).siblings('.border').data('encargos'));
    insert_vivienda(id_vivienda, encargos, $(this));
});


$(document).on('click', '.minus', function() {
    var id_vivienda = $(this).data('id');
    delete_vivienda(id_vivienda, $(this));
});


// --------------------------------------
// -------------------------------------- CUANDO ES + INSERTAR
// --------------------------------------

function insert_vivienda(id_vivienda, encargos, element) {
    var username = localStorage.getItem('username');
    $.ajax({
        url: friendlyURL('?module=carrito&op=carrito_info_vivienda'),
        type: 'POST',
        dataType: 'json',
        data: {
            id_vivienda: id_vivienda
        },
        success: function(response) {
            if (response[0].stock > 0) {
                console.log(encargos);
                var already_stock = response[0].stock;
                const img_vivienda = response[0].img_vivienda.replace(/\\/g, '/');

                if (encargos < already_stock) {
                    $.ajax({
                        url: friendlyURL('?module=carrito&op=add_to_carrito'),
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            id_vivienda: id_vivienda,
                            username: username,
                            img_vivienda: img_vivienda,
                            name_city: response[0].name_city,
                            price: response[0].price,
                            tipos: response[0].tipos
                        },
                        success: function(response) {
                            console.log(response, 'LA RESPUESTA ES ESTAAAAA');
                            console.log('Se ha añadido esta vivienda al carrito correctamente.');
                            updateCartCount(element, 1);

                            // Actualizar el valor de encargos en el HTML
                            var newEncargos = encargos + 1;
                            element.siblings('.border').data('encargos', newEncargos).text(newEncargos);
                            window.location.reload();

                        },
                        error: function(xhr, status, error) {
                            console.error(xhr.responseText);
                            console.error('ERROR DESDE EL INSERT VIVIENDA');
                        }
                    });
                } else {
                    toastr.error('ERROR SOLO HAY ' + response[0].stock + ' VIVIENDAS EN STOCK');
                }
            } else {
                toastr.error('ERROR ESTA VIVIENDA NO ESTA EN STOCK');
            }
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
            console.error('ERROR DESDE EL carrito_info_vivienda VIVIENDA DEL INSERT');
        }
    });
}

// --------------------------------------
// -------------------------------------- CUANDO ES - DELETE
// --------------------------------------

function delete_vivienda(id_vivienda, element) {
    var username = localStorage.getItem('username');
    $.ajax({
        url: friendlyURL('?module=carrito&op=carrito_info_vivienda'),
        type: 'POST',
        dataType: 'json',
        data: {
            id_vivienda: id_vivienda
        },
        success: function(response) {
            $.ajax({
                url: friendlyURL('?module=carrito&op=delete_to_carrito'),
                type: 'POST',
                dataType: 'json',
                data: {
                    id_vivienda: id_vivienda,
                    username: username
                },
                success: function(response) {
                    console.log(response, 'LA RESPUESTA ES ESTAAAAA');
                    console.log('Se ha eliminado esta vivienda del carrito correctamente.');
                    updateCartCount(element, -1);
                    window.location.reload();
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                    console.error('ERROR DESDE EL DELETE VIVIENDA');
                }
            });
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
            console.error('ERROR DESDE EL carrito_info_vivienda VIVIENDA DEL DELETE');
        }
    });
}

// --------------------------------------
// -------------------------------------- REFRESCAR EL VALOR DEL + y - A TEIMPO REAL
// --------------------------------------

function updateCartCount(element, change) {
    var encargosElement = element.siblings('.border');
    var currentEncargos = parseInt(encargosElement.text());
    encargosElement.text(currentEncargos + change);
  
    if (currentEncargos + change === 0) {
      location.reload();
    }
  }

// --------------------------------------
// -------------------------------------- ELIMINAR UNA VIVIENDA DEL CARRITO CON LA CANTIDAD QUE SEA
// --------------------------------------

  $(document).on('click', '.close', function() {
    var id_vivienda = $(this).data('id');
    console.log(id_vivienda);
    Swal.fire({
      title: '¿Eliminar vivienda del carrito?',
      text: '¿Estás seguro de que quieres eliminar esta vivienda del carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        delete_close_vivienda(id_vivienda);
        $(this).parent().parent().remove();
      } else {
        console.log('Eliminación cancelada');
      }
    });
  });

function delete_close_vivienda(id_vivienda) {
    var username = localStorage.getItem('username');

    $.ajax({
        url: friendlyURL('?module=carrito&op=delete_to_carrito_all'),
        type: 'POST',
        dataType: 'json',
        data: {
            id_vivienda: id_vivienda,
            username: username
        },
        success: function(response) {
            console.log(response, 'LA RESPUESTA ES ESTAAAAA');
            console.log('Se ha eliminado esta vivienda del carrito correctamente.');
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
            console.error('ERROR DESDE EL DELETE VIVIENDA');
        }
    });
}

// --------------------------------------
// -------------------------------------- VACIAR EL CARRITO ENTERO
// --------------------------------------

$(document).on('click', '.vaciar_carrito', function() {
    Swal.fire({
      title: '¿Eliminar todo el carrito?',
      text: '¿Estás seguro de que quieres vaciar las viviendas del carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        delete_all_viviendas();
  
        $('.cart-item').empty(); 
  
        update_cart_count(0);
      } else {
        console.log('Eliminación cancelada');
      }
    });
  });
  

function delete_all_viviendas() {
    var tokens = localStorage.getItem('user_tokens');
    var access_token = JSON.parse(tokens).access_token;

    $.ajax({
        url: friendlyURL('?module=carrito&op=vaciar_carrito'),
        type: 'POST',
        dataType: 'json',
        data: {
            access_token: access_token
        },
        success: function(response) {
            console.log(response, 'LA RESPUESTA ES ESTAAAAA');
            console.log('Se ha vaciado todo el correctamente.');
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
            console.error('ERROR DESDE EL DELETE VIVIENDA');
        }
    });
}

// --------------------------------------
// -------------------------------------- AÑADIR VIVIENDA AL CARRITO
// --------------------------------------

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

    $clone.addClass('fly-animation');

    $clone.one('animationend', function() {
        $clone.remove();
        contador_carrito(); 
    });

    $.ajax({
        url: friendlyURL('?module=carrito&op=carrito_info_vivienda'),
        type: 'POST',
        dataType: 'json',
        data: {id_vivienda: id_vivienda},
        success: function(response) {
            console.log('response',response);
            const img_vivienda = response[0].img_vivienda.replace(/\\/g, '/'); // Reemplaza las barras invertidas por barras normales
            console.log(img_vivienda);
            console.log(response[0].name_city);
            console.log(response[0].price);
            console.log(response[0].tipos);
            console.log('response',response);
            $.ajax({
                url: friendlyURL('?module=carrito&op=add_to_carrito'),
                type: 'POST',
                dataType: 'json',
                data: {
                    id_vivienda: id_vivienda,
                    username: username,
                    img_vivienda: img_vivienda, // Utiliza la ruta con las barras normales
                    name_city: response[0].name_city,
                    price: response[0].price,
                    tipos: response[0].tipos
                },
                success: function(response) {
                    console.log(response,'LA RESPUESTA ES ESTAAAAA');
                    console.log('Se ha añadido esta vivienda al carrito correctamente.');
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                    console.error('ERROR DESDE EL CARRITOOOOOoooOOoOoOOo');
                }
            });
    
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
            console.error('ERROR DESDE EL CARRITOOOOOoooOOoOoOOo');
        }
    });
    

    
});

// --------------------------------------
// -------------------------------------- CONTADOR DEL HEADER DEL CARRITO
// --------------------------------------

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

    $(document).on('click', '.checkout', function() {
        console.log(all_data_carrito);
        Swal.fire({
        title: '¿Comprar Carrito?',
        text: '¿Estás seguro de que quieres comprar las viviendas del carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, comprar',
        cancelButtonText: 'No, cancelar'
        }).then((result) => {
        if (result.isConfirmed) {
            insert_carrito_to_factura(all_data_carrito);
        } else {
            console.log('Compra cancelada');
        }
        });
    });

    function insert_carrito_to_factura(all_data_carrito) {
        console.log(all_data_carrito[0].tipos);
        console.log(all_data_carrito[0].name_city);
        console.log(all_data_carrito[1].id_vivienda);
        console.log(all_data_carrito[1].username);
        console.log(all_data_carrito[2].price);
        console.log(all_data_carrito[2].encargos);
        $.ajax({
            url: friendlyURL('?module=carrito&op=insert_factura'),
            type: 'POST',
            dataType: 'json',
            data: {all_data_carrito: all_data_carrito},
            success: function(response) {
                if (response.status === 'success') {
                    console.log('INSERCION CORRECTA A FACTURAS: ', response);
                } else {
                    console.error('Errorrrrrrrr:');
                }
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
                console.error('ERROR DESDE EL FACTURAS CARRITO');
            }
        });
    }


$(document).ready(function() {
    load_carrito();
    contador_carrito();
});