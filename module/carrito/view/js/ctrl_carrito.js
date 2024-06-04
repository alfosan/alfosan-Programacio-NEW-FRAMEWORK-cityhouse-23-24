
function load_carrito() {
    var username = localStorage.getItem('username');
    console.log(username);
    $.ajax({
        url: friendlyURL('?module=carrito&op=load_carrito'),
        type: 'POST',
        dataType: 'json',
        data: {username: username},
        success: function(response) {
            console.log(response);
            if (response.length > 0) {
                let cartItemsHTML = '';
                response.forEach(item => {
                    cartItemsHTML += `
                        <div class="row border-top border-bottom">
                            <div class="row main align-items-center">
                                <div class="col-2">
                                    <img class="img-fluid" src="${item.img_vivienda}" alt="Product Image">
                                </div>
                                <div class="col">
                                    <div class="row text-muted">Product ${item.id_vivienda}</div>
                                    <div class="row">Description for Product ${item.id_vivienda}</div>
                                </div>
                                <div class="col">
                                    <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a>
                                </div>
                                <div class="col">&euro; ${item.price} <span class="close">&#10005;</span></div>
                            </div>
                        </div>`;
                });
                $('.cart').append(cartItemsHTML);
                update_cart_count(response.length);
            } else {
                $('.cart').append('<div class="row main align-items-center">No items in cart</div>');
                update_cart_count(0);
            }
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}

function update_cart_count(count) {
    $('.title .col.align-self-center.text-right.text-muted').text(`${count} items`);
}


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
    load_carrito();
    contador_carrito();
});