
        console.log('ENTRAMOS EN EL PROFILE CORRECTAMENTE.');
        function loadFactura() {
            $('.footer').hide();
            //   var username = localStorage.getItem('username');
            //   console.log(username);
            var tokens = localStorage.getItem('user_tokens');
            if (!tokens) {
                window.location.href = 'http://localhost/proyectos/FRAMEWORK_CITYHOUSE/login';
                return;
            }

            var access_token = JSON.parse(tokens).access_token;
            $.ajax({
                url: friendlyURL('?module=profile&op=load_factura'),
                type: 'POST',
                dataType: 'json',
                data: { access_token: access_token },
                success: function(response) {
                    console.log(response); 
                    if (response.length > 0) {
                        let uniqueInvoiceIds = [...new Set(response.map(item => item.id_factura))];
                        uniqueInvoiceIds.forEach(id => {
                            let totalPrice = 0;
                            let tableHTML = '';
                            response.filter(item => item.id_factura === id).forEach(item => {
                                let itemPrice = parseFloat(item.price);
                                let itemCant = parseInt(item.cant);
                                let itemTotalPrice = itemPrice * itemCant;
                                totalPrice += itemTotalPrice;
                                tableHTML += `
                                    <tr>
                                        <td>${item.tipo} en ${item.name_city}</td>
                                        <td>${itemCant}</td>
                                        <td>€ ${formatPriceWithDots(itemPrice)}</td>
                                        <td>€ ${formatPriceWithDots(itemTotalPrice)}</td>
                                    </tr>
                                `;
                            });
        
                            let currentDate = new Date();
                            let formattedDate = currentDate.toLocaleDateString();
                            let formattedTime = currentDate.toLocaleTimeString();
        
                            let invoiceHTML = `
                                <br><br><br>
                                <hr>
                                <div class="invoice">
                                    <div class="icons-factura">
                                        <a href="#" class="download_pdf"><img src="/proyectos/FRAMEWORK_CITYHOUSE/view/images/profile/flecha-hacia-abajo.png" "alt="Descargar"></a>&nbsp;&nbsp;
                                        <a href="#" class="qr"><img src="/proyectos/FRAMEWORK_CITYHOUSE/view/images/profile/codigo-qr.png" alt="QR"></a>
                                    </div>
                                    <div class="header_prof">
                                        <h1>Factura #${id}</h1>
                                        <p>Num Factura #${id}</p>
                                    </div>
                                    <div class="details">
                                        <div class="left">
                                            <p><strong>Cliente: ${response[0].username}</strong></p>
                                            <p><strong>Fecha: ${formattedDate} ${formattedTime}</strong></p>
                                        </div>
                                        <div class="right">
                                            <p><strong class="toalprice_fact">Precio Total: € ${formatPriceWithDots(totalPrice)}</strong></p>
                                            <p><strong>Estado: Comprado</strong></p>
                                        </div>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Tipo Vivienda</th>
                                                <th>Cantidad</th>
                                                <th>Precio unitario</th>
                                                <th>Precio por linea</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${tableHTML}
                                        </tbody>
                                    </table>
                                </div>`;
                            // Agregar la factura al cuerpo del documento
                            document.body.insertAdjacentHTML('beforeend', invoiceHTML);
                        });
                    } else {
                        alert('No se encontraron datos para esta factura.');
                    }
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });
        
            // Función para formatear el precio con puntos
            function formatPriceWithDots(price) {
                let [integerPart, decimalPart] = price.toFixed(2).split('.');
                let withDots = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                return `${withDots},${decimalPart}`;
            }
        }


        $(document).on('click', '.download_pdf img', function(e) {
            e.preventDefault();
            let id_factura = $(this).closest('.invoice').find('.header_prof h1').text().split('#')[1].trim(); // Obtén el id de factura del encabezado correspondiente
        
            console.log('AQUIII ESTA EL ID FACTURAAA', id_factura);
        
            $.ajax({
                url: friendlyURL('?module=profile&op=generate_pdf_factura'),
                type: 'POST',
                dataType: 'json',
                data: {
                    id_factura: id_factura
                },
                success: function(response) {
                    console.log(response, 'LA RESPUESTA ES ESTAAAAA');
                    console.log('Se ha creado el pdf correctamente.');
                    window.location.href ='/proyectos/FRAMEWORK_CITYHOUSE/pdfs_and_qr/pdf/factura_'+id_factura+'.pdf';
                
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                    console.error('ERROR DESDE EL GENERATE PDF FACTURA');
                }
            });
        
        });

        function load_likes() {
            //   var username = localStorage.getItem('username');
            //   console.log(username);
            var tokens = localStorage.getItem('user_tokens');
            if (!tokens) {
                window.location.href = 'http://localhost/proyectos/FRAMEWORK_CITYHOUSE/login';
                return;
            }

            var access_token = JSON.parse(tokens).access_token;
            $.ajax({
                url: friendlyURL("?module=profile&op=all_vivienda_liked"),
                type: 'POST',
                dataType: 'json',
                data: { access_token: access_token },
                success: function(response) {
                    console.log(response);
                    // Convertir el array de IDs a una cadena separada por comas
                    var ids_viviendas = response.map(function(item) {
                        return item.id_vivienda;
                    }).join(',');
        
                    $.ajax({
                        url: friendlyURL("?module=profile&op=print_vivienda_liked"),
                        type: 'POST',
                        dataType: 'json',
                        data: { ids_viviendas: ids_viviendas },
                        success: function(response) {
                            console.log(response);
                            var data = response;
                            for (var row in data) {
                                var listContent = $('<div></div>').attr({ 'id': data[row].id_vivienda, 'class': 'list_content_shop' }).appendTo('#content_shop_vivienda');
                                listContent.html(
                                    "<div class='borde'>" + 
                                        "<div>" +
                                        "<div class='row1'>" +
                                        "<div class='col-lg-4 col-sm-4'><a href='#' class='thumbnail'><img src='/proyectos/FRAMEWORK_CITYHOUSE/"+ data[row].img_vivienda +"' alt='blog title' id='" + data[row].id_vivienda + "' class='more_info_list more1'></a></div>" +
                                        "<div id='" + data[row].id_vivienda + "' class='col-lg-8 col-sm-8 more_info_list more1'>" +
                                            "<div class='price'>" + data[row].price + " €</div>" + 
                                            "<h3><b><em>" + data[row].tipos + "</b></em> en " + data[row].ubicacion + " en <em>" + data[row].name_city + "</em></h3>" +
                                            "<div class='list_icons'><img src='/proyectos/FRAMEWORK_CITYHOUSE/view/images/shop/cama.png'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='/proyectos/FRAMEWORK_CITYHOUSE/view/images/shop/banera.png'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='/proyectos/FRAMEWORK_CITYHOUSE/view/images/shop/zona.png'></div>" +
                                            "<div class='text_details'>&nbsp;" + data[row].n_habitaciones + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data[row].n_banos + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data[row].m2 + "&nbsp;m²</div>" +
                                            "<div class='info'><b>Para&nbsp;&nbsp;<b>" + data[row].operation_type + "</div>" +                                               
                                        "</div>" +
                                        "<div id='" + data[row].id_vivienda + "' class='like-button'></div>" + 
                                        "<div class='contador_likes'>" +
                                            "<div class='counter_likes'></div>" + 
                                        "</div>" +
                                        "<div id='" + data[row].id_vivienda + "' stock-id='" + data[row].stock + "' class='carrito-button'></div>" +
                                        "<div class='carrito-stock'>" + data[row].stock + " En Stock</div>" + 
                                    "</div>" +
                                "</div>");
        
                                // carrusel_list(listContent.find('.carrusel_list'));
                                counter_likes(data[row].id_vivienda);
                            }
        
                            markLiked();
                            // mapBox_all(data);
                        },
                        error: function(xhr, status, error) {
                            console.error(xhr.responseText);
                            console.error('ERROR DESDE EL CONTADOR DE LIKES EN PROFILE');
                            $('#error_message').html(
                                '<h1>¿ NO LE DISTE LIKE A NINGUNA VIVIENDA TODAVIA ?</h1>' +
                                '<button id="go_to_shop">Ir a la tienda</button>' +
                                '<br>' +
                                '<img src="/proyectos/FRAMEWORK_CITYHOUSE/view/images/profile/mylikes/error_no_likes.jpg" alt="No has dado like a ninguna vivienda">' 
                                
                                
                            );
                            $('#go_to_shop').click(function() {
                                window.location.href = friendlyURL("?module=shop");
                            });
                        }
                    });       
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                    console.error('ERROR DESDE EL CONTADOR DE LIKES EN PROFILE');
                }
            });        
        }

        $(document).on('click', '.like-button', function() {
            var tokens = localStorage.getItem('user_tokens');
            if (!tokens) {
                window.location.href = 'http://localhost/proyectos/FRAMEWORK_CITYHOUSE/login';
                return;
            }
        
            var id_vivienda = $(this).attr('id');
            console.log('ID de la vivienda:', id_vivienda);
        
            var likeButton = $(this);
            var isLiked = likeButton.hasClass('liked');
            var access_token = JSON.parse(tokens).access_token;
        
            $.ajax({
                url: friendlyURL('?module=shop&op=vivienda_liked'),
                type: 'GET',
                dataType: 'json',
                data: {
                    access_token: access_token,
                    id_vivienda: id_vivienda,
                    isLiked: isLiked ? 1 : 0
                },
                success: function(response) {
                    console.log(response);
                    if (isLiked) {
                        likeButton.removeClass('liked');
                        likeButton.css('background-image', "url('/proyectos/FRAMEWORK_CITYHOUSE/view/images/shop/likes/like.png')");
                    } else {
                        likeButton.addClass('liked');
                        likeButton.css('background-image', "url('/proyectos/FRAMEWORK_CITYHOUSE/view/images/shop/likes/dislike.png')");
                        window.location.reload();

                    }
        
                    // Actualizar el contador de likes después de cambiar el estado de "like"
                    counter_likes(id_vivienda);
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });
        });
        
        function markLiked() {
            var tokens = localStorage.getItem('user_tokens');
            if (!tokens) {
                return;
            }
        
            var access_token = JSON.parse(tokens).access_token;
        
            $.ajax({
                url: friendlyURL('?module=shop&op=know_likes_user'),
                type: 'GET',
                dataType: 'json',
                data: {
                    access_token: access_token
                },
                success: function(response) {
                    console.log("Likes received from server:", response);
                    response.forEach(function(id) {
                        markLikedButton(id);
                    });
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });
        }
        
        
        function markLikedButton(id, isLiked) {
            // console.log("Marking liked button for ID:", id);
            var idString = id.id_vivienda.toString();
            var likeButton = $('.like-button[id="' + idString + '"]');
            if (likeButton.length > 0) {
                if (isLiked) {
                    likeButton.addClass('liked').css('background-image', "url('/proyectos/FRAMEWORK_CITYHOUSE/view/images/shop/likes/dislike.png')");
                } else {
                    likeButton.removeClass('liked').css('background-image', "url('/proyectos/FRAMEWORK_CITYHOUSE/view/images/shop/likes/like.png')");
                }
            } else {
                console.error("Like button not found for ID:", idString);
            }
        }
        
        function counter_likes(id_vivienda) {
            // console.log(id_vivienda);
            $.ajax({
                url: friendlyURL('?module=shop&op=count_likes'),
                type: 'GET',
                dataType: 'json',
                data: {
                    id_vivienda: id_vivienda
                },
                success: function(response) {
                    if (response.error) {
                        console.error("Error al obtener el contador de likes:", response.error);
                    } else {
                        var likesCount = response.likes_count;
                        $('#' + id_vivienda + ' .counter_likes').text(likesCount);
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Error al obtener el contador de likes:", error);
                    console.error(xhr.responseText);
                }
            });
        }


        $(document).on('click', '.qr img', function(e) {
            e.preventDefault();
            let id_factura = $(this).closest('.invoice').find('.header_prof h1').text().split('#')[1].trim();
        
            console.log('AQUIII ESTA EL ID FACTURAAA PARA EL QR', id_factura);
        
            $.ajax({
                url: friendlyURL('?module=profile&op=generate_pdf_factura'),
                type: 'POST',
                dataType: 'json',
                data: {
                    id_factura: id_factura
                },
                success: function(response) {
                    console.log(response, 'LA RESPUESTA ES ESTAAAAA');
                    console.log('Se ha creado el pdf correctamente.');
                    $.ajax({
                        url: friendlyURL('?module=profile&op=generate_qr'),
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            id_factura: id_factura
                        },
                        success: function(response) {
                            console.log(response, 'LA RESPUESTA ES ESTAAAAA');
                            console.log('Se ha creado el QR correctamente.');
                            window.location.href = '/proyectos/FRAMEWORK_CITYHOUSE/pdfs_and_qr/qr/myqrcode_' + id_factura + '.png';
                        },
                        error: function(xhr, status, error) {
                            console.error(xhr.responseText);
                            console.error('ERROR DESDE EL GENERATE QR FACTURA');
                            window.location.href = '/proyectos/FRAMEWORK_CITYHOUSE/pdfs_and_qr/qr/myqrcode_' + id_factura + '.png';
                        }
                    });
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                    console.error('ERROR DESDE EL GENERATE PDF FACTURA');
                }
            });
        });
        


        // -------------------------------- DROPZONE PROFILE

        $(document).ready(function() {
            $('#avatar_profile').on('click', function() {
                $('#avatar-dropzone').slideToggle();
                $('#change-avatar').toggle();
            });
           
            Dropzone.options.avatarDropzone = {
                paramName: 'file',
                maxFilesize: 2,
                acceptedFiles: 'image/png,image/jpeg', // Aceptar solo archivos PNG y JPG
                addRemoveLinks: true,
                dictRemoveFile: 'x',
                maxFiles: 1,
                init: function() {
                    this.on('addedfile', function(file) {
                        if (this.files[1] != null) {
                            this.removeFile(this.files[0]);
                        }
                        console.log('Archivo añadido: ' + file.name);
                    });
                    this.on('success', function(file, response) {
                        console.log('Archivo subido correctamente: ' + response);
                        var removeButton = Dropzone.createElement("<button class='dz-remove'>x</button>");
                        file.previewElement.appendChild(removeButton);
                        removeButton.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            this.removeFile(file);
                            $.post('/delete', { filename: file.name });
                        }.bind(this));
                    });
                    this.on('error', function(file, response) {
                        console.log('Error al subir archivo: ' + response);
                    });
                }
            };
        
            // Add the "Clear Dropzone" button
            var clearButton = $('<button class="clear-dropzone">X</button>');
            clearButton.css({
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '25px',
                height: '25px',
                textAlign: 'center',
                lineHeight: '25px',
                cursor: 'pointer'
            });
            $('.avatar-container').append(clearButton);
        
            clearButton.on('click', function() {
                Dropzone.forElement('#avatar-dropzone').removeAllFiles(true);
            });
        
            $('#change-avatar').on('click', function() {
                var tokens = localStorage.getItem('user_tokens');
                var access_token = JSON.parse(tokens).access_token;
                var formData = new FormData();
                var file = Dropzone.forElement('#avatar-dropzone').files[0];
                formData.append('avatar', file);
                formData.append('access_token', access_token); 
            
                $.ajax({
                    url: friendlyURL('?module=profile&op=save_avatar'),
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        console.log('Archivo guardado correctamente:', response);
            
                        $.ajax({
                            url: friendlyURL('?module=profile&op=profile_images'),
                            type: 'POST',
                            data: { access_token: access_token },
                            success: function(response) {
                                var images = JSON.parse(response);
                                console.log(images);
                                var userImage = images.image;
                                $.ajax({
                                    url: friendlyURL('?module=profile&op=save_avatar_db'),
                                    type: 'POST',
                                    data: { access_token: access_token, image: userImage },
                                    success: function(response) {
                                        console.log('avatar guardados correctamente:', response);
                                        toastr.success('SE CAMBIO LA FOTO DE PERFIL CORRECTAMENTE.');
                                        setTimeout(function() {
                                            window.location.reload();
                                        }, 2000);

                                    },
                                    error: function(xhr, status, error) {
                                        console.error('Error al guardar los usernames:', error);
                                    }
                                });
                            },
                            error: function(xhr, status, error) {
                                console.error('Error al recolectar las imágenes:', error);
                            }
                        });
                    },
                    error: function(xhr, status, error) {
                        console.error('Error al guardar el archivo:', error);
                    }
                });
            });
        });
        
        function loadProfile() {
            var tokens = localStorage.getItem('user_tokens');
            if (!tokens) {
                window.location.href = 'http://localhost/proyectos/FRAMEWORK_CITYHOUSE/login';
                return;
            }
        
            var access_token = JSON.parse(tokens).access_token;
            
            $.ajax({
                url: friendlyURL('?module=profile&op=know_user_profile'),
                type: 'POST',
                dataType: 'json',
                data: {
                    access_token: access_token
                },
                success: function(data) {
                    $('.Username-value').text(data.username);
                    $('.email-value').text(data.email);
                    if (data.avatar) {
                        $('#avatar_profile').attr('src', data.avatar);
                    }
                },
                error: function(error) {
                    console.log('Error fetching profile data:', error);
                }
            });
        }
        
        
        $(document).ready(function() {
            $('#change-username').on('click', function() {
                if ($('#username-change-form').length === 0) {
                    var formHtml = `
                        <div id="username-change-form">
                            <input type="text" id="new-username" placeholder="New Username">
                            <button id="save-username">Save</button>
                        </div>`;
                    $(this).parent().after(formHtml);
                } else {
                    $('#username-change-form').toggle();
                }
        
                $('#save-username').on('click', function() {
                    var newUsername = $('#new-username').val();
        
                    if (newUsername.length < 5) {
                        alert('Username must be at least 5 characters long.');
                        return;
                    }
                    console.log(newUsername);
        
                    var tokens = localStorage.getItem('user_tokens');
                    if (!tokens) {
                        window.location.href = 'http://localhost/proyectos/FRAMEWORK_CITYHOUSE/login';
                        return;
                    }
        
                    var access_token = JSON.parse(tokens).access_token;
                    localStorage.setItem('username', newUsername);
                    $('.Username-value').text(newUsername);
                    $.ajax({
                        url: friendlyURL('?module=profile&op=change_user_profile'),
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            access_token: access_token,
                            new_username: newUsername
                        },
                        success: function(response) {
                            console.log(response);
                            // localStorage.setItem('username', response[0].username);
                            // newUsername = "anything' OR '1'='1"
                            localStorage.setItem('user_tokens', response);

                            $('#username-change-form').hide();
                            toastr.success('SE CAMBIO EL USERNAME CORRECTAMENTE.');
                            
                        },
                        error: function(error) {
                            console.log('Error updating username:', error);
                            toastr.error('ERROR ESTE USUARIO YA ESTA OCUPADO, PRUEBA CON UNO DIFERENTE.');
                            setTimeout(function() {
                                window.location.reload();
                            }, 2000);
                        }
                    });
                });
            });
        
            // Load profile data when the page loads
            loadProfile();
        });


        $(document).ready(function() {
            $('#change-email').on('click', function() {
                if ($('#email-change-form').length === 0) {
                    var formHtml = `
                        <div id="email-change-form">
                            <input type="text" id="new-email" placeholder="New email">
                            <button id="save-email">Save</button>
                        </div>`;
                    $(this).parent().after(formHtml);
                } else {
                    $('#email-change-form').toggle();
                }
        
                $('#save-email').on('click', function() {
                    var newEmail = $('#new-email').val();
                    var emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail)\.(com|es)$/;
        
                    if (!emailRegex.test(newEmail)) {
                        alert('Please enter a valid email address ending with @gmail.com, @hotmail.com, @gmail.es, or @hotmail.es');
                        return;
                    }
        
                    console.log(newEmail);
        
                    var tokens = localStorage.getItem('user_tokens');
                    if (!tokens) {
                        window.location.href = 'http://localhost/proyectos/FRAMEWORK_CITYHOUSE/login';
                        return;
                    }
        
                    var access_token = JSON.parse(tokens).access_token;
                    $.ajax({
                        url: friendlyURL('?module=profile&op=change_email_profile'),
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            access_token: access_token,
                            new_email: newEmail
                        },
                        success: function(response) {
                            console.log(response);
                            localStorage.removeItem('user_tokens');
                            $('#email-change-form').hide();
                            toastr.success('SE HA CAMBIADO CORRECTAMENTE EL EMAIL, DIRIGETE A TU EMAIL Y VERIFICALO.');
                            setTimeout(function() {
                                window.location.href = 'http://localhost/proyectos/FRAMEWORK_CITYHOUSE/login';
                            }, 3000);
                        },
                        error: function(error) {
                            console.log('Error updating email:', error);
                            toastr.success('SE HA CAMBIADO CORRECTAMENTE EL EMAIL, PERO SOLO PUEDES ENVIAR EMAILS AL TUYO PROPIO ENTONCES ESTO ES UNA SIMULACON.');
                            setTimeout(function() {
                                window.location.reload();
                            }, 5000);
                        }
                    });
                });
            });
        
            // Load profile data when the page loads
            loadProfile();
        });

        $(document).on('click', '#change-password', function() {
            Swal.fire({
            title: '¿CHANGE PASSWORD?',
            text: '¿Estas seguro de que quieres cambiar la contraseña? Se le desactivara la cuenta y tendra que volver a logear.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, comprar',
            cancelButtonText: 'No, cancelar'
            }).then((result) => {
            if (result.isConfirmed) {
                change_password();
            } else {
                console.log('Cambio de passwd cancelado');
            }
            });
        });

        function change_password() {

                var tokens = localStorage.getItem('user_tokens');
                if (!tokens) {
                    window.location.href = 'http://localhost/proyectos/FRAMEWORK_CITYHOUSE/login';
                    return;
                }
    
                var access_token = JSON.parse(tokens).access_token;
                $.ajax({
                    url: friendlyURL('?module=profile&op=know_user_profile'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        access_token: access_token
                    },
                    success: function(response) {
                        console.log(response);
                        console.log(response.email);
                        $.ajax({
                            url: friendlyURL('?module=profile&op=send_recover_email'),
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                email_forg: response.email
                            },
                            success: function(response) {
                                console.log(response);
                                localStorage.removeItem('user_tokens');
                                // $('#email-change-form').hide();
                                toastr.success('SE LE DESACTIVARA LA CEUNTA Y LE LLEGARA UN ENAIL PARA CAMBIAR LA CONTRASEÑA.');
                                setTimeout(function() {
                                    window.location.href = 'http://localhost/proyectos/FRAMEWORK_CITYHOUSE/login';
                                }, 4000);
                            },
                            error: function(error) {
                                console.log('Error SENDING EMAIL PASSWORD::', error);
                            }
                        });
                    },
                    error: function(error) {
                        console.log('Error RECOVERING PASSWORD:', error);
                    }
                });
               
            }

        $(document).ready(function() {
            loadProfile();
            // loadFactura();
            // load_likes();
        });