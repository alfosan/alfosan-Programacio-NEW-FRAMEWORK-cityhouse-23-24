console.log('Entramos en el main');

// ================AJAX-PROMISE================
function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData,
            beforeSend: function() {
                $("#overlay").fadeIn(300);
            }
        }).done((data) => {
            setTimeout(function() {
                $("#overlay").fadeOut(300);
            }, 500);
            resolve(data)

        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        });
    });
}
/* LOAD MENU */
function load_menu() {

    /* TEMPORAL BUTTON */
    $('.login').show();
    $('#logoutBtn').hide();
    
    $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="?module=home&op=view" class="nav_link">Home</a>').appendTo('.nav_list');
    $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="?module=shop&op=view" class="nav_link">Shop</a>').appendTo('.nav_list');
    // $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="?module=contact&op=view" class="nav_link">Contact us</a>').appendTo('.nav_list');
    // $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="?module=contact" class="nav_link">Contact us</a>').appendTo('.nav_list');
    
    ajaxPromise('?module=login&op=data_user', 'POST', 'JSON', {token: localStorage.getItem('token')})
    .then(function(data) {
        if (data[0].user_type === 'admin') {
            menu_admin();
        }else if (data[0].user_type === 'client') {
            menu_client();
        }
        
        click_profile(data[0]);
    }).catch(function() {
        $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="?module=login&op=view" class="nav_link" data-tr="Log in">Log in</a>').appendTo('.nav_list');
    });
}


// //================LOAD-HEADER================
// function load_menu() {
//     var access_token = localStorage.getItem('access_token');
//     if (access_token) {
//         ajaxPromise('module/login_register/ctrl/ctrl_login.php?op=data_user', 'POST', 'JSON', { 'access_token': access_token })
//             .then(function(data) {
//                 console.log(data);
//                 if (data.type_user == "client") {
//                     console.log("Client logged");
//                     $('.login').hide();
//                     $('#logoutBtn').show();
//                     $('.opc_CRUD').empty();
//                     $('.opc_exceptions').empty();
//                 } else {
//                     console.log("Admin logged");
//                     $('.opc_CRUD').show();
//                     $('.opc_exceptions').show();
//                 }
//                 $('.log-icon').empty();
//                 $('#user_info').empty();
//                 $('<img src="' + data.avatar + '" alt="Avatar" class="avatar-image">').appendTo('.avatar');
//                 $('<p></p>').attr({ 'id': 'user_info' }).appendTo('#des_inf_user')
//                     .html(
//                         '<button><a id="logout"><i id="icon-logout" class="fa-solid fa-right-from-bracket"></i></a>LOG OUT</button>' +
//                         '<a>' + data.username + '<a/>'
//                     )

//             }).catch(function() {
//                 console.log("Error al cargar los datos del usuario");
//             });
//     } else {
//         console.log("No hay access_token disponible");
//         $('.opc_CRUD').empty();
//         $('.opc_exceptions').empty();
//         $('#user_info').hide();
//         $('.log-icon').empty();
//         $('.login').show();
//         $('#logoutBtn').hide();
//         $('<a href="index.php?module=ctrl_login&op=login-register_view"><i id="col-ico" class="fa-solid fa-user fa-2xl"></i></a>').appendTo('.log-icon');
//     }
// }



//================CLICK-LOGIUT================
function click_logout() {
    $(document).on('click', '#logout', function() {
        localStorage.removeItem('total_prod');
        toastr.success("Logout succesfully");
        setTimeout('logout(); ', 1000);
    });
}

//================LOG-OUT================
// function logout() {
//     ajaxPromise('module/login_register/ctrl/ctrl_login.php?op=logout', 'POST', 'JSON')
//         .then(function(data) {
//             localStorage.removeItem('access_token');
//             localStorage.removeItem('refresh_token');
//             Swal.fire({
//                 icon: 'success',
//                 title: '¡Desconexión exitosa!',
//                 text: '¡Usuario deslogueado correctamente!',
//                 showConfirmButton: false,
//                 timer: 1500 // Cierra automáticamente después de 1.5 segundos
//             });
//             setTimeout(function() {
//                 window.location.href = "/proyectos/8_MVC_CRUD/index.php?page=homepage";
//             }, 1500);
//         }).catch(function() {
//             Swal.fire({
//                 icon: 'error',
//                 title: '¡Error!',
//                 text: 'Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.',
//             });
//             console.log('Ha ocurrido un error.');
//         });
// }

function logout() {
    ajaxPromise('module/login_register/ctrl/ctrl_login.php?op=logout', 'POST', 'JSON')
        .then(function(data) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = "index.php?module=ctrl_home&op=list";
        }).catch(function() {
            console.log('Something has occured');
        });
}

// Remove localstorage('page') with click in shop
function click_shop() {
    $(document).on('click', '#opc_shop', function() {
        localStorage.removeItem('page');
        localStorage.removeItem('total_prod');
    });
}

$(document).ready(function() {
    load_menu();
    click_logout();
    click_shop();
});