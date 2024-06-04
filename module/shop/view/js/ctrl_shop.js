console.log('CARGAMOS EL SHOP JS');

function ajaxForSearch(url, type, dataType, sData = undefined) {
    ajaxPromise(url, type, dataType, sData)
        .then(function(data) {
            $('#content_shop_vivienda').empty();
            $('.date_vivienda' && '.date_img').empty();

            if (data == "error") {
                $('<div></div>').appendTo('#content_shop_vivienda')
                    .html('<h3>¡No se encuentran resultados con los filtros aplicados!</h3>');
            } else {
                for (row in data) {
                    var listContent = $('<div></div>').attr({ 'id': data[row].id_vivienda, 'class': 'list_content_shop' }).appendTo('#content_shop_vivienda');
                    listContent.html(
                        "<div class='borde'>" + 
                            "<div <a id='" + data[row].id_vivienda + "' >" +
                            "<div class='row1' >" +
                            "<div class='col-lg-4 col-sm-4 '><a href='#' class='thumbnail'><img src=" + data[row].img_vivienda + " alt='blog title' id='" + data[row].id_vivienda + "'  class='more_info_list more1'></a></div>" +
                            "<div id='" + data[row].id_vivienda + "' class='col-lg-8 col-sm-8 more_info_list more1'>" +
                                "<div class='price'>" + data[row].price + " €</div>" + 
                                "<h3><b><em>" + data[row].tipos + "</b></em> en " + data[row].ubicacion + " en <em>" + data[row].name_city + "</em></h3>" +
                                "<div class='list_icons'><img src='view/images/shop/cama.png'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='view/images/shop/banera.png'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='view/images/shop/zona.png'></div>" +
                                "<div class='text_details'>&nbsp;" + data[row].n_habitaciones + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data[row].n_banos + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data[row].m2 + "&nbsp;m²</div>" +
                                "<div class='info'><b>Para&nbsp;&nbsp;<b>" + data[row].operation_type + "</div>" +                                               
                            "</div>" +
                            "<div id='" + data[row].id_vivienda + "' class='like-button'></div>" + 
                            "<div class='contador_likes'>" +
                                "<div class='counter_likes'></div>" + 
                            "</div>" +
                            "<div id='" + data[row].id_vivienda + "' class='carrito-button'></div>" +
                            "<div class='carrito-stock'>"+ data[row].stock +" En Stock</div>" + 

                        "</div>" +
                    "</div>");

                    carrusel_list(listContent.find('.carrusel_list'));
                    counter_likes(data[row].id_vivienda);
                }

                markLiked();

                mapBox_all(data);
            }
        }).catch(function() {
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
        });
}

function clicks() {
    $(document).on("click", ".more_info_list", function() {

        $('.more_info_list').empty();
        $('#content_shop_vivienda').empty();
        $('.date_vivienda' && '.date_img').empty();
        $('.title_content').empty();
        

        var id_vivienda = this.getAttribute('id');
        console.log('El id de la vivienda es = ', id_vivienda);
        
        var storedIds = localStorage.getItem('ids_viviendas_seleccionadas');
        
        var idsArray = storedIds ? JSON.parse(storedIds) : [];
        
        var idIndex = idsArray.indexOf(id_vivienda);
        
        if (idIndex === -1) {
            if (idsArray.length < 5) {
                idsArray.push(id_vivienda);
            } else {
                idsArray.pop();
                idsArray.unshift(id_vivienda);
            }
            
            localStorage.setItem('ids_viviendas_seleccionadas', JSON.stringify(idsArray));
        } else {
            idsArray.splice(idIndex, 1);
            idsArray.unshift(id_vivienda);
            
            localStorage.setItem('ids_viviendas_seleccionadas', JSON.stringify(idsArray));
        }
        
        loadDetails(id_vivienda);
    });
}

function loadDetails(id_vivienda) {
    console.log('El id de la vivienda es = ', id_vivienda);

    ajaxPromise(friendlyURL('?module=shop&op=details_vivienda'), 'POST', 'JSON', { 'id_vivienda': id_vivienda })
    .then(function (data) {
        console.log(data);
        $('#content_shop_vivienda').empty();
        $('.date_img_dentro').empty();
        $('.date_vivinda_dentro').empty();
        $('#pagination').hide();
        $('#filters_shop_mostrar').hide();
        $('#map').hide();


        var carruselContainer = $('<div class="owl-carousel owl-theme"></div>').appendTo('.date_img');

        data.forEach(function (item) {
            item.img_ruta.forEach(function (ruta) {
                carruselContainer.append(
                    "<div class='item_details'>" +
                    "<img src='" + ruta + "' class='carousel-image' />" +
                    "</div>"
                );
            });
        });

        carruselContainer.owlCarousel({
            autoplay: true,
            rewind: true,
            margin: 20,
            responsiveClass: true,
            autoHeight: true,
            autoplayTimeout: 5000,
            smartSpeed: 800,
            nav: true,
            responsive: {
              0: {
                items: 1
              },
              800: {
                items: 3
              }
            }
        });

        for (var i = 0; i < data.length; i++) {
            $('<div></div>').attr({ 'id': data[i].id_vivienda, class: 'date_img_dentro' }).appendTo('.date_img')
                .html(
                    "<div class='container_details'>" +
                        "<h1 class='title_details'>Precioso&nbsp;&nbsp;" +   data[i].tipos + " en " +  data[i].ubicacion + "&nbsp;,&nbsp;" + data[i].name_city +"</h1>" +"<br>" +
                        "<div class='details_details'>" +
                            "<p class='price_details'>"  +  data[i].price + " € </p>" + "<br>" +
                            // "<div id='" + data[i].id_vivienda + "' class='like-button'></div>"+
                            "<ul class='features_details'> " +
                                "<li class='list_icons_details'>" + "<img src='view/images/shop/cama.png'>&nbsp;" +  data[i].n_habitaciones +"&nbsp; Habitaciones &nbsp;&nbsp;&nbsp;&nbsp;" +  "<img src='view/images/shop/banera.png'>&nbsp;&nbsp;"+  data[i].n_banos +" &nbsp;Baños&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + "<img src='view/images/shop/zona.png'>&nbsp;"+  data[i].m2 +"&nbsp; m²&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li> "+
                            "</ul> <br> "+ 
                            "<h2 class='extras_details'>EXTRAS</h2>"+
                            "<div class='filtros'>" +
                            "  <div class='filtro'>" +
                            " <br><br>" +
                            "  </div>"+
                            "  </div>"
                            );
                            var uniqueIcons = new Set(data[i].icon_extra);
                            var uniquecustom = new Set(data[i].icon_custom);
                            
                            var iconsHtml = "";
                            uniqueIcons.forEach(function(icon) {
                                iconsHtml += "<img src='" + icon + "'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                            });
                            
                            uniquecustom.forEach(function(icon_c) {
                                iconsHtml += "<img src='" + icon_c + "'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                            });
                            $('<h5>VIVIENDAS POR LA ZONA EN LA QUE TE PUEDE INTERESAR</h5>').appendTo('.title_content');

            $('.date_img_dentro:last .container_details .details_details').append("<div class='list_icons_details'>" + iconsHtml + "<b>ESTA VIVIENDA TIENE:&nbsp;&nbsp;</b>" + data[i].name_extra + ",&nbsp;" + data[i].name_room + "</div>");

            $('.date_img_dentro:last').append("</div></div>");
            more_vivienda_related(data[i].name_city);  // ACTIVAR 
            console.log('ENTRAMOS AL DETAILS');
            $('body').append("<br><br><br><br><br><br>");
        }
    }).catch(function () {
        //window.location.href = "view/inc/error404.php";
    });
}

function carrusel_list(container) {
    var carruselContainer = $('<div class="owl-carousel owl-theme"></div>').appendTo(container);
  
    ajaxPromise('/proyectos/8_MVC_CRUD/module/shop/ctrl/ctrl_shop.php?op=Carrusel_List', 'GET', 'JSON')
        .then(function(data) {
            for (row in data) {
                var imgArray = data[row].img_ruta;
                for (var i = 0; i < imgArray.length; i++) {
                    carruselContainer.append(
                        "<div class='item_details'>" +
                            "<img src='" + imgArray[i] + "' />" +
                            "<h2>"+  "hola"  + "</h2>" +
                        "</div>"
                    );
                }
            }
  
            carruselContainer.owlCarousel({
                autoplay: true,
                rewind: true,
                margin: 20,
                responsiveClass: true,
                autoHeight: true,
                autoplayTimeout: 5000,
                smartSpeed: 800,
                nav: true,
                responsive: {
                  0: {
                    items: 1
                  }
                }
            });
        })
        .catch(function() {
            // Manejar el error si es necesario
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Category HOME";
        });
}

function loadVivienda() {
    var home_filtro = (localStorage.getItem('filters_home') || undefined);
    var home_filtro_recomendations = (localStorage.getItem('filters_recomendations') || undefined);
    var shop_filtro = (localStorage.getItem('filters_shop') || undefined);
    var extras_filters = (localStorage.getItem('extras_filters') || undefined);
    var search_filters = (localStorage.getItem('filters_search') || undefined);
    var start_index = (localStorage.getItem('start_index') || undefined);
    var end_index = (localStorage.getItem('end_index') || undefined);
    // var total_prod = (localStorage.getItem('total_prod') || undefined);
    // var total_pages = (localStorage.getItem('total_pages') || undefined);
    
    // console.log(extras_filters);
    // // console.log(total_prod, 'total_prod');
    // // console.log(total_pages, 'total_pages');

    // localStorage.removeItem('filters_search');
    // localStorage.removeItem('filters_home');
    localStorage.removeItem('filters_recomendations');
    // localStorage.removeItem('filters_shop');
    localStorage.removeItem('extras_filters');

    // // Carga de filtros
    if (home_filtro != undefined) {
        var filter_shop = JSON.parse(home_filtro);
        console.log(filter_shop);
        ajaxForSearch(friendlyURL("?module=shop&op=load_filter_shop"), 'POST', 'JSON', { 'filter_shop': filter_shop, 'orderBy': orderBy, 'start_index': start_index, 'end_index': end_index });
        // console.log('filter_shop', filter_shop, 'orderBy', orderBy, 'start_index', start_index, 'end_index', end_index);
    } else if (home_filtro_recomendations != undefined) {
        var filtro1 = JSON.parse(home_filtro_recomendations);
        var id_vivienda = filtro1[0].recomendation[0];
        loadDetails(id_vivienda);

    } else if (shop_filtro != undefined) {
        var filter_shop = JSON.parse(shop_filtro);
        var orderBy = JSON.parse(localStorage.getItem('order_select')); 
        // console.log('ENTROO');
        // console.log(filter_shop);
        // console.log(orderBy, 'ORDERby');
        //highlightFilters();
        ajaxForSearch(friendlyURL("?module=shop&op=load_filter_shop"), 'POST', 'JSON', { 'filter_shop': filter_shop, 'orderBy': orderBy, 'start_index': start_index, 'end_index': end_index });
        console.log('insite_load_vivienda_shop');
        
    } else if (search_filters != undefined) {
        var filter_shop = JSON.parse(search_filters);
        // console.log('entro por search');
        // console.log(search_filters);
        var orderBy = localStorage.getItem('order_select'); 
        ajaxForSearch(friendlyURL("?module=shop&op=load_filter_shop"), 'POST', 'JSON', { 'filter_shop': filter_shop, 'orderBy': orderBy, 'start_index': start_index, 'end_index': end_index });
    
    } else if (extras_filters != undefined) {
        console.log('ENTROO');
        console.log('ENTROO');
        console.log('ENTROO');
        console.log('ENTROO');
        var filter_shop = JSON.parse(extras_filters);
        var orderBy = localStorage.getItem('order_select'); 
        // highlightFilters();
        ajaxForSearch(friendlyURL("?module=shop&op=load_filter_shop"), 'POST', 'JSON', { 'filter_shop': filter_shop, 'orderBy': orderBy, 'start_index': start_index, 'end_index': end_index });
    
     }  else { // ALL VIVIENDAS
            ajaxForSearch(friendlyURL("?module=shop&op=list_viviendas"), 'POST', 'JSON', { 'start_index': start_index, 'end_index': end_index });
            console.log('insite_pagination_all');
            // console.log('end' + end_index);
            // console.log('start' + start_index);
        }
        pagination();
        
}

function load_filter_shop() {
    ajaxPromise('?module=shop&op=load_filter_shop', 'POST', 'JSON', {})
        .then(function(data) {

            var filtroscategory = new Set(); // Usamos un conjunto para almacenar valores únicos
            var filtrosoperations = new Set();
            var filtroscity = new Set(); 
            var filtrosoperation = new Set();

            for (var i = 0; i < data.length; i++) {
                filtroscategory.add("<option value='" + data[i].categorys + "'>" + data[i].categorys + "</option>");
                filtrosoperations.add("<option value='" + data[i].operation_type + "'>" + data[i].operation_type + "</option>");
                filtroscity.add("<option value='" + data[i].name_city + "'>" + data[i].name_city + "</option>");
                filtrosoperation.add("<option value='" + data[i].tipos + "'>" + data[i].tipos + "</option>");
            }

            var filtroscategoryArray = Array.from(filtroscategory); // Convertimos el conjunto en un array
            var filtrosoperationsArray = Array.from(filtrosoperations);
            var filtroscityArray = Array.from(filtroscity);
            var filtrostypeArray = Array.from(filtrosoperation); 

            // console.log(filtrosHtml);
            // console.log(filtrosoperations);
            // console.log(filtroscity);

            // HTML CON SELECTS DINAMICOS
            var dynamicFiltersHTML =
                "<div id='filters_shop' class='filters_shop'>" +
                "   <div class='filtros'>" +
                "       <div class='filtro'>" +
                "           <select class='category_select' name='category_select'>" +
                "               <option value='' disabled selected hidden>Tipo de vivienda</option>" +
                "               <optgroup label='CATEGORYS'>" +
                                filtroscategoryArray +
                "               </optgroup>" +
                "           </select>" +
                "       </div>" +
                "   <div class='filtro'>" +
                "       <select class='operation_select' name='operation_select'>" +
                "           <option value='' disabled selected hidden>Tipo de operación</option>" +
                "           <optgroup label='OPERACIÓN'>" +
                                filtrosoperationsArray +
                "           </optgroup>" +
                "       </select>" +
                "   </div>" +
                "   <div class='filtro'>" +
                "       <select class='city_select' name='city_select'>" +
                "           <option value='' disabled selected hidden>Ciudad</option>" +
                "           <optgroup label='CIUDAD'>" +
                                filtroscityArray+ 
                "           </optgroup>" +
                "       </select>" +
                "   </div>" +
                "   <div class='filtro'>" +
                "       <select class='type_select' name='type_select'>" +
                "           <option value='' disabled selected hidden>Tipos</option>" +
                "           <optgroup label='TIPOS'>" +
                                filtrostypeArray+
                "           </optgroup>" +
                "       </select>" +
                "   </div>" +
                "   <div class='filtro'>" +
                "       <select class='order_select' name='order_select'>" +
                "           <option value='' disabled selected hidden>Ordenar por:</option>" +
                "           <optgroup label='ORDER'>" +
                                "<option value='v.m2'> Metros cuadrados m2</option>"+
                                "<option value='v.n_banos'> Numero de baños</option>"+
                                "<option value='v.n_habitaciones'> Numero de habitaciones</option>"+
                                "<option value='v.vistas'>Más populares</option>"+
                "           </optgroup>" +
                "       </select>" +
                "   </div>" +
                "   <div class='filtro'>" +
                "       <button class='btn_filters' id='openModalBtn'>PRECIO $</button>" + 
                "       <div id='myModal' class='modal'>" + 
                "           <div class='modal-content'>" +
                "               <span><h2 class='title_modalprice'>Seleccione un precio máximo.</h2></span>" +
                "               <span class='close'>&times;</span>" +
                "               <div class='slider-container'>" +
                "                   <div>" +
                "                       <input type='radio' name='priceType' value='venta' id='venta' checked>" +
                "                       <label for='venta'>Compra</label>" +
                "                   </div>" +
                "                   <input type='range' min='0' max='300000' value='300000' class='slider' id='priceSlider'>" +
                "                   <p>Seleccione el precio máximo: <b class='price_modal'>$<length id='priceValue'>0</length></b></p>" +
                "                   <div>" +
                "                       <input type='radio' name='priceType' value='alquiler' id='alquiler'>" +
                "                       <label for='alquiler'>Alquiler</label>" +
                "                   </div>" +
                "                   <input type='range' min='0' max='9000' value='9000' class='slider' id='priceSlider_2'>" +
                "                   <p>Seleccione el precio máximo: <b class='price_modal'>$<length id='priceAlquier'>0</length></b></p>"+
                "                   <input type='button' class='filter_button' id='filter_button_inside_modal_price' value='SEARCH'>" +
                "               </div>" +
                "           </div>" +
                "       </div>" +
                "   </div>" +
                "   <div class='filtro'>" +
                "       <button class='btn_filters' id='openModalBtn_2'>EXTRAS</button>" + 
                "       <div id='myModal_2' class='modal_2'>" + 
                "           <div class='modal-content_2'>" +
                "               <h2>Extras de vivienda:</h2>" +
                "               <span class='close_2'>&times;</span>" +
                "               <div>" +
                "                   <label class='label_2'><input type='checkbox' name='name_extra' value='ASCENSOR'> Ascensor</label>" +
                "                   <label class='label_2'><input type='checkbox' name='name_extra' value='JARDÍN'> Jardín</label>" +
                "                   <label class='label_2'><input type='checkbox' name='name_extra' value='CALEFACCIÓN'> Calefacción</label>" +
                "               </div>" +
                "               <div>" +
                "                   <label class='label_2'><input type='checkbox' name='name_extra' value='BALCÓN'> Balcón</label>" +
                "                   <label class='label_2'><input type='checkbox' name='name_extra' value='PISCINA'> Piscina</label>" +
                "                   <label class='label_2'><input type='checkbox' name='name_extra' value='GARAJE'> Garaje</label>" +
                "               </div>" +
                "               <input type='button' class='filter_button_extras' id='filter_button_inside_modal_extras' value='SEARCH'>" +
                "           </div>" +
                "       </div>" +
                "   </div>" +
                "   <input type='button' class='filter_button filter_button_outside_modal' id='filter_button_outside_modal' value='SEARCH'>" +
                "   &nbsp;" +
                "   <input type='button' class='remove_filters' id='buttons_filters' value='REMOVE'>" +
                "</div>" +
                "<script src='view/js/modal_price.js'></script>"+
                "<script src='view/js/modal_extras.js'></script>";

            $('#filters_shop_mostrar').html(dynamicFiltersHTML);

            // Llamar highlightFilters
            highlightFilters();
            secundario_del_highlightFilters();
            //console.log(dynamicFiltersHTML);

        })
        .catch(function() {
            console.error("Error al cargar los datos del select dinámico.");
        });

    $(document).on('click', '.remove_filters', function() {
        remove_filters();
    });

    $(document).on('click', '#filter_button_inside_modal_price', function() {
        filter_button_inside_modal_price();
    });
}

$(document).on('click', '.filter_button_outside_modal', function () {
    filter_button_outside_modal();
});

function filter_button_outside_modal() {
    // BORRAMOS ESTOS DOS PARA QUE CUANDO PULSE UNA PAGINA Y DESPUES APLIQUE UN FILTRO, QUE SE BORREN Y EMPIECE DESDE LA PAGINA 1 .
    localStorage.removeItem('page_num');
    localStorage.removeItem('start_index');

    var filters_shop = [];
    
    // Filtro categorys
    var categorys = $('.category_select').val();
    if (categorys) {
        localStorage.setItem('category_select', categorys);
        filters_shop.push(['categorys', categorys]);
    }

    // Filtro operation
    var operation_type = $('.operation_select').val();
    if (operation_type) {
        localStorage.setItem('operation_select', operation_type);
        filters_shop.push(['operation_type', operation_type]);
    }

    // Filtro city
    var name_city = $('.city_select').val();
    if (name_city) {
        localStorage.setItem('city_select', name_city);
        filters_shop.push(['name_city', name_city]);
    }

    // Filtro type
    var tipos = $('.type_select').val();
    if (tipos) {
        localStorage.setItem('type_select', tipos);
        filters_shop.push(['tipos', tipos]);
    }

    // ORDENAR
    var orderBy = $('.order_select').val();
    if (orderBy) {
        localStorage.setItem('order_select', JSON.stringify([orderBy])); 
    }
    
    localStorage.setItem('filters_shop', JSON.stringify(filters_shop));
    
    // RECARGAR
    window.location.reload();
}

function filter_button_inside_modal_price() {
    // Eliminar cualquier controlador de eventos anterior
    $('#filter_button_inside_modal_price').off('click');

    // Asignar controlador de eventos al botón de búsqueda
    $('#filter_button_inside_modal_price').click(function() {
        var priceSliderValue;
        var priceType;

        if ($('#venta').is(':checked')) {
            priceSliderValue = $('#priceSlider').val();
            priceType = 'Compra';
        } else if ($('#alquiler').is(':checked')) {
            priceSliderValue = $('#priceSlider_2').val();
            priceType = 'Alquiler';
        }

        // Guardar los filtros solo cuando se hace clic en SEARCH
        var filters_shop = [];
        filters_shop.push(['price', priceSliderValue]);
        filters_shop.push(['operation_type', priceType]); // Almacenar el tipo de precio
        localStorage.setItem('filters_shop_temporary', JSON.stringify(filters_shop));

        // Ocultar el modal después de guardar los filtros
        $('#myModal').hide();
        applyFiltersAndReload();
    });
}

function applyFiltersAndReload() {
    var filters_shop = [];

    if (localStorage.getItem('filters_shop_temporary')) {
        var tempFilters = JSON.parse(localStorage.getItem('filters_shop_temporary'));
        filters_shop = filters_shop.concat(tempFilters);
    }

    localStorage.setItem('filters_shop', JSON.stringify(filters_shop));

    if (filters_shop.length > 0) {
        window.location.reload();
    }
}
// CONTROLADOR DE EVENTOS AL ABRIR EL MODAL
$('#openModalBtn').click(function() {
    console.log("Abriendo modal de filtros...");
    var filters_shop = JSON.parse(localStorage.getItem('filters_shop_temporary'));
    if (filters_shop) {
        var priceFilter = filters_shop.find(filter => filter[0] === 'price');
        if (priceFilter) {
            if (filters_shop.find(filter => filter[0] === 'operation_type' && filter[1] === 'Compra')) {
                $('#venta').prop('checked', true);
                $('#priceSlider').val(priceFilter[1]);
                $('#priceValue').text(priceFilter[1]);
            } else if (filters_shop.find(filter => filter[0] === 'operation_type' && filter[1] === 'Alquiler')) {
                $('#alquiler').prop('checked', true);
                $('#priceSlider_2').val(priceFilter[1]);
                $('#priceAlquier').text(priceFilter[1]);
            }
        }
    }
});

function filter_button_inside_modal_extras() {
    $(document).ready(function () {
        $(document).on('click', '#filter_button_inside_modal_extras', function () {
            var extras_filters = [];

            $("input[name='name_extra']:checked").each(function () {
                extras_filters.push(['name_extra', $(this).val()]); // Guarda el nombre del filtro y su valor como un subarray
            });

            // Almacenar los filtros como un array JSON en localStorage
            localStorage.setItem('extras_filters', JSON.stringify(extras_filters));

            window.location.reload();
        });

        // Cargar valores seleccionados de los filtros desde localStorage
        function loadFiltersFromLocalStorage() {
            var filtersString = localStorage.getItem('extras_filters');
            if (filtersString) {
                var filters = JSON.parse(filtersString);
                filters.forEach(function (filter) {
                    $("input[name='name_extra'][value='" + filter[1] + "']").prop('checked', true); // Accede al valor del filtro en el segundo elemento del subarray
                });
            }
        }
        loadFiltersFromLocalStorage();
    });
}

function highlightFilters() {
    var category_select = localStorage.getItem('category_select');
    var operation_select = localStorage.getItem('operation_select');
    var city_select = localStorage.getItem('city_select');
    var type_select = localStorage.getItem('type_select');
    var orderBy = localStorage.getItem('order_select');

    if (category_select) {
        $('.category_select').val(category_select);
    }

    if (operation_select) {
        $('.operation_select').val(operation_select);
    }

    if (city_select) {
        $('.city_select').val(city_select);
    }

    if (type_select) {
        $('.type_select').val(type_select);
    }
    if (orderBy) {
        var orderByArray = JSON.parse(orderBy);
        if (orderByArray.length > 0) {
            $('.order_select').val(orderByArray[0]);
        }
    }
}

function secundario_del_highlightFilters(){

    $('.category_select').change(function() {
        localStorage.setItem('category_select', $(this).val());
    });

    $('.operation_select').change(function() {
        localStorage.setItem('operation_select', $(this).val());
    });

    $('.city_select').change(function() {
        localStorage.setItem('city_select', $(this).val());
    });

    $('.type_select').change(function() {
        localStorage.setItem('type_select', $(this).val());
    });

    $('.order_select').change(function() {
        localStorage.setItem('order_select', JSON.stringify([$(this).val()])); 
    });
}

function pagination() {
    // console.log('ABSDBHABSUDBUAB1278319827398');
    var shop_filtro = (localStorage.getItem('filters_shop') || undefined);
    var home_filtro = (localStorage.getItem('filters_home') || undefined);
    var search_filters = (localStorage.getItem('filters_search') || undefined);
    var extras_filters = (localStorage.getItem('extras_filters') || undefined);

    // console.log(shop_filtro, 'shop');
    // console.log(home_filtro, 'home');
    // console.log(search_filters, 'search');
    // console.log(extras_filters, 'extras');

    localStorage.removeItem('filters_search');
    localStorage.removeItem('filters_home');
    localStorage.removeItem('filters_shop');
    localStorage.removeItem('filters_shop');

    var url;

    if (search_filters != undefined) {
        var filter_shop = JSON.parse(search_filters);
        console.log('CON FILTROS SEARCH');
        console.log(filter_shop);
        url = "?module=shop&op=count_shop";

    } else if (home_filtro != undefined) {
        var filter_shop = JSON.parse(home_filtro);
        console.log('CON FILTROS HOME');
        console.log(filter_shop);
        url = "?module=shop&op=count_shop";

    } else if (shop_filtro != undefined) {
        var filter_shop = JSON.parse(shop_filtro);
        console.log('CON FILTROS SHOP');
        url = "?module=shop&op=count_shop";

    }else if (extras_filters != undefined) {
        var filter_shop = JSON.parse(extras_filters);
        console.log('CON FILTROS SHOP');
        url = "?module=shop&op=count_shop";

    }  else {
        console.log('SIN FILTROS');
        url = "?module=shop&op=count_all";
    }

    ajaxPromise(friendlyURL(url), 'POST', 'JSON', { 'filter_shop': filter_shop })
        .then(function(data) {
            console.log(data);
            var total_prod = data[0].contador;
            var total_pages = Math.ceil(total_prod / 4);

            localStorage.setItem('total_prod', total_prod);
            localStorage.setItem('total_pages', total_pages);

            // console.log(total_prod, 'total_prod');
            // console.log(total_pages, 'total_pages');

            $('#pagination').empty();

            // SI LAS VIVIENDAS SON MENORES A 4 TRAS FILTRAR
            if (total_prod < 4) {
                return;
            }

            var orderBy = localStorage.getItem('order_select');
            var filters_shop = JSON.parse(localStorage.getItem('filters_shop') || localStorage.getItem('extras_filters'));

            var appliedFilters = {
                'orderBy': orderBy,
                'filters_shop': filters_shop
            };

            var page_num = localStorage.getItem('page_num');
            if (!page_num) {
                localStorage.setItem('page_num', 1);
            }
            
            // CONTENEDOR DE PAGINACIÓN
            var paginationContainer = $('<div>').addClass('pagination-container wow zoomIn mar-b-1x').attr('data-wow-duration', '0.5s');
            var paginationList = $('<ul>').addClass('pagination');
            
            // BOTON PREVIOUS
            var previousButton = $('<li>').addClass('pagination-item--wide first');
            var previousImg = $('<img>').addClass('pagination-link--wide pagination-item--wide first').attr('src', 'view/images/shop/pagination/flecha_izquierda.png').attr('alt', 'Previous');
            previousImg.click(goToLastPage);
            previousButton.append(previousImg);
            paginationList.append(previousButton);

            for (var i = 1; i <= total_pages; i++) {
                var paginationItem = $('<li>').addClass('pagination-item');
                var paginationLink = $('<a>').addClass('pagination-link').text(i);

                if (i == page_num) {
                    paginationItem.addClass('is-active');
        
                }

                // Agrega un evento de clic a cada enlace de paginación
                paginationLink.click(function(event) {

                    var page_num = parseInt($(this).text());
                    var start_index = (page_num - 1) * 4;
                    var end_index = 4;

                    // console.log('end' + end_index);
                    // console.log('start' + start_index);

                    localStorage.setItem('start_index', start_index);
                    localStorage.setItem('end_index', end_index);
                    localStorage.setItem('page_num', page_num);

                    localStorage.setItem('filters_shop', JSON.stringify(appliedFilters));

                    // Verificar si la solicitud viene de otros filtros
                    loadVivienda();
                    
                    if (search_filters != undefined) { // SEARCH
                        var filter_shop = JSON.parse(search_filters);
                        ajaxForSearch(friendlyURL("?module=shop&op=load_filter_shop"), 'POST', 'JSON', { 'filter_shop': filter_shop, 'orderBy': orderBy, 'start_index': start_index, 'end_index': end_index });
                        console.log('insite_pagination_search');

                    } else if (home_filtro != undefined) { // HOME
                        var filter_shop = JSON.parse(home_filtro);
                        ajaxForSearch(friendlyURL("?module=shop&op=load_filter_shop"), 'POST', 'JSON', { 'filter_shop': filter_shop, 'orderBy': orderBy, 'start_index': start_index, 'end_index': end_index });
                        console.log('insite_pagination_home');

                    } else if (shop_filtro != undefined) { // SHOP
                        var filter_shop = JSON.parse(shop_filtro);
                        ajaxForSearch(friendlyURL("?module=shop&op=load_filter_shop"), 'POST', 'JSON', { 'filter_shop': filter_shop, 'orderBy': orderBy, 'start_index': start_index, 'end_index': end_index });
                        console.log('insite_pagination_shop');

                    } else if (extras_filters != undefined) { // SHOP
                        var filter_shop = JSON.parse(extras_filters);
                        ajaxForSearch(friendlyURL("?module=shop&op=load_filter_shop"), 'POST', 'JSON', { 'filter_shop': filter_shop, 'orderBy': orderBy, 'start_index': start_index, 'end_index': end_index });
                        console.log('insite_pagination_shop');

                    }  else { // ALL VIVIENDAS
                        ajaxForSearch(friendlyURL("?module=shop&op=list_viviendas"), 'POST', 'JSON', { 'start_index': start_index, 'end_index': end_index });
                        console.log('insite_pagination_all');
                       
                    }
                });
            
                paginationItem.append(paginationLink);
                paginationList.append(paginationItem);
            }

            // BOTON NEXT
            var nextButton = $('<li>').addClass('pagination-item--wide last');
            var nextImg = $('<img>').addClass('pagination-link--wide last pagination-item--wide').attr('src', 'view/images/shop/pagination/flecha_derecha.png').attr('alt', 'Next');
            nextImg.click(goToNextPage);
            nextButton.append(nextImg);
            paginationList.append(nextButton);

            paginationContainer.append(paginationList);

            $('#pagination').append(paginationContainer);

            var page_num = localStorage.getItem('page_num');
            
            if (page_num) {
                $('#pagination .pagination-link').eq(page_num - 1).trigger('click');

            }

        });
        
        //  loadVivienda();
}
// Función para ir a la página siguiente con filtros aplicados
function goToNextPage() {
    var currentPage = parseInt(localStorage.getItem('page_num')) || 1;
    var totalPages = parseInt(localStorage.getItem('total_pages')) || 1;
    var appliedFilters = JSON.parse(localStorage.getItem('appliedFilters')) || {};

    if (currentPage < totalPages) {
        localStorage.setItem('page_num', currentPage + 1);
        pagination(appliedFilters); // Actualizar la paginación con los filtros aplicados
    }
}

// Función para ir a la página anterior con filtros aplicados
function goToLastPage() {
    var currentPage = parseInt(localStorage.getItem('page_num')) || 1;
    var appliedFilters = JSON.parse(localStorage.getItem('appliedFilters')) || {};

    if (currentPage > 1) {
        localStorage.setItem('page_num', currentPage - 1);
        pagination(appliedFilters); // Actualizar la paginación con los filtros aplicados
    }
}


function vivienda_related(loadeds = 0, name_city, total_items) {
    console.log('ENTRAMOS AL VIVIENDAS RELEATED');
    console.log('LA CIUDAD ES', name_city);

    let items = 3;
    let loaded = loadeds;
    let city = name_city;
    let total_item = total_items;

    // console.log('loaded', loaded);
    // console.log('city', city);
    // console.log('total_items', total_items);

    ajaxPromise(friendlyURL("?module=shop&op=vivienda_related"), 'POST', 'JSON', { 'city': city, 'loaded': loaded, 'items': items })
        .then(function(data) {
            // console.log('PASAS LA RESPUESTA AJAX Y DEVUELVES:');
            // console.log(data);

            if (loaded == 0) {
                for (row in data) {
                    if (data[row].id_vivienda !== undefined) {
                        $('<div></div>').attr({ 'id': data[row].id_vivienda, 'class': 'bordeado more_info_list more1 col-lg-4 col-sm-6 scroll_viviendas list_content_shop' }).appendTo('.title_content')
                            .html(
                                "<div class='properties'>" +
                                "<br>"+
                                    "<div class='image-holder'><img src='" + (data[row].img_vivienda || '') + "' class='img-responsive' alt='properties'>" +
                                    "</div>" +
                                    "<h4>Tipo: <a href='property-detail.php?id=" + data[row].tipos + "'>" + (data[row].tipos ? data[row].tipos : '') + "</a></h4>" +
                                    "<h4>Ubicación: <a href='property-detail.php?id=" + data[row].ubicacion + "'>" + (data[row].ubicacion ? data[row].ubicacion : '') + "</a></h4>" +
                                    "<h4>Tipo: <a href='property-detail.php?id=" + data[row].operation_type + "'>" + (data[row].operation_type ? data[row].operation_type : '') + "</a></h4>" +
                                    "<div class='properties1'>" +
                                    "<p class='price'>Precio: " + (data[row].price || '') + " €</p>" +
                                    "<div class='listing-detail'>" +
                                        "<div class = 'list_icons'>" + "<img src='view/images/shop/cama.png'>" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "<img src='view/images/shop/banera.png'>" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ "<img src='view/images/shop/zona.png'>" +  "</div>" +
                                        "<div class='text_details'>" + "&nbsp;"+ data[row].n_habitaciones + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data[row].n_banos + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data[row].m2 + "&nbsp;m²" +"</div>"+
                                    "</div>" +
                                    "</div>" +
                                    // "<div class='btn btn-primary ' id='" + data[row].id_vivienda + "'>¿Te interesa?</div>" +
                                    "<br>"+
                                "</div>"
                            );
                    }
                    console.log(data[row].price, 'PRECIO DE LA VIVIENDA');
                }
                
            } else {

                for (row in data) {
                    if (data[row].id_vivienda !== undefined) {
                        $('<div></div>').attr({ 'id': data[row].id_vivienda, 'class': ' bordeado more_info_list more1 col-lg-4 col-sm-6 scroll_viviendas' }).appendTo('.title_content')
                            .html(
                                "<div class='properties'>" +
                                "<br>"+
                                    "<div class='image-holder'><img src='" + (data[row].img_vivienda || '') + "' class='img-responsive' alt='properties'>" +
                                    "</div>" +
                                    "<h4>Tipo: <a href='property-detail.php?id=" + data[row].tipos + "'>" + (data[row].tipos ? data[row].tipos : '') + "</a></h4>" +
                                    "<h4>Ubicación: <a href='property-detail.php?id=" + data[row].ubicacion + "'>" + (data[row].ubicacion ? data[row].ubicacion : '') + "</a></h4>" +
                                    "<h4>Tipo: <a href='property-detail.php?id=" + data[row].operation_type + "'>" + (data[row].operation_type ? data[row].operation_type : '') + "</a></h4>" +
                                    "<div class='properties1'>" +
                                    "<p class='price'>Precio: " + (data[row].price || '') + " €</p>" +
                                    "<div class='listing-detail'>" +
                                        "<div class = 'list_icons'>" + "<img src='view/images/shop/cama.png'>" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "<img src='view/images/shop/banera.png'>" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ "<img src='view/images/shop/zona.png'>" +  "</div>" +
                                        "<div class='text_details'>" + "&nbsp;"+ data[row].n_habitaciones + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data[row].n_banos + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data[row].m2 + "&nbsp;m²" +"</div>"+
                                    "</div>" +
                                    "</div>" +
                                    // "<div class='btn btn-primary ' id='" + data[row].id_vivienda + "'>¿Te interesa?</div>" +
                                    "<br>"+
                                "</div>"
                            );
                    }
                }
                
            }
            // Agregar botón de "Ver más" fuera del bucle
            $('<div></div>').attr({ 'id': 'more_car__button', 'class': 'more_car__button' }).appendTo('body')
                .html(
                    '<button class="load_more_button" id="load_more_button">VER MÁS</button>'
                );

            var total_viviendas = total_item - 3;
            // console.log('AAAAAAA', total_viviendas);
            // console.log('BBBBBBB', total_item);

            if (total_viviendas <= loaded) {
                $('#load_more_button').text("No hay más viviendas"); // Actualiza el texto del botón
                $('.load_more_button').prop('disabled', true); // Deshabilita el botón
            }
            
        }).catch(function() {
            console.log("error vivienda_related");
        });
}
// }

// // Agregar botón de "Ver más" fuera del bucle
// if ($('#more_car__button').length === 0) {
//     $('<div></div>').attr({ 'id': 'more_car__button', 'class': 'more_car__button' }).appendTo('body')
//         .html(
//             '<button class="load_more_button" id="load_more_button">VER MÁS</button>'
//         );
// }

// var total_viviendas = total_item - 3;
// console.log('AAAAAAA', total_viviendas);
// console.log('BBBBBBB', total_item);

// if (total_viviendas <= loaded) {
//     $('#load_more_button').text("No hay más viviendas"); // Actualiza el texto del botón
//     $('.load_more_button').prop('disabled', true); // Deshabilita el botón
// }

// }).catch(function() {
// console.log("error vivienda_related");
// });
// }


function more_vivienda_related(name_city) {
    console.log('ENTRAMOS AL MORE VIVIENDAS');
    var name_city = name_city;
    var items = 0;
    ajaxPromise(friendlyURL('?module=shop&op=count_more_viviendas_related'), 'POST', 'JSON', { 'name_city': name_city })
        .then(function(data) {
            console.log('PASA POR EL COUNT');
            console.log(data);
            var total_items = data[0].num_total;
            vivienda_related(0, name_city, total_items); // Llama a vivienda_related con el total de elementos
            $(document).on("click", '.load_more_button', function() {
                items = items + 3;
                $('.more_car__button').empty();
                vivienda_related(items, name_city, total_items); // Llama a vivienda_related con la cantidad cargada adicional
            });
        }).catch(function() {s
            console.log('error total_items');
        });
}

// ------------------------------------------------------
// ------------------------------------------------------ LIKES
// ------------------------------------------------------

var isLiked = false;

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
                likeButton.css('background-image', "url('view/images/shop/likes/like.png')");
            } else {
                likeButton.addClass('liked');
                likeButton.css('background-image', "url('view/images/shop/likes/dislike.png')");
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
            likeButton.addClass('liked').css('background-image', "url('view/images/shop/likes/dislike.png')");
        } else {
            likeButton.removeClass('liked').css('background-image', "url('view/images/shop/likes/like.png')");
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

function load_carrito_view(){
    var tokens = localStorage.getItem('user_tokens');
    if (!tokens) {
        window.location.href = 'http://localhost/proyectos/FRAMEWORK_CITYHOUSE/login';
        return;
    }

    window.location.href='http://localhost/proyectos/FRAMEWORK_CITYHOUSE/carrito';

}





function mapBox_all(data) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [-0.61667, 38.83966492354664], // starting position [lng, lat]
        zoom: 6 // starting zoom
    });

    for (let i = 0; i < data.length; i++) {
        const lng = parseFloat(data[i].longi);
        const lat = parseFloat(data[i].lat);
        console.log("Coordenadas del marcador", lng, lat);

        const imgUrls = data[i].img_ruta.split(':').map(url => url.split(':')[0]);

        let carouselHTML = '<div id="carouselExampleSlidesOnly' + i + '" class="carousel slide" data-ride="carousel">';
        carouselHTML += '<div class="carousel-inner">';
        const activeClass = ' active';
        carouselHTML += '<div class="carousel-item' + activeClass + '">';
        carouselHTML += '<img class="d-block" style="width: 100px; height: 100px;" src="' + imgUrls[0] + '" alt="Slide">';
        carouselHTML += '<div>';
        carouselHTML += '<h3>' + data[i].name_city + '</h3>';
        carouselHTML += '<p>Tipo: <b>' + data[i].tipos + '</b></p>';
        carouselHTML += '<p>Precio: <b>' + data[i].price + '€</b></p>';
        carouselHTML += '</div>';
        carouselHTML += '</div>';
        carouselHTML += '</div>';
        carouselHTML += '</div>';

        const minPopup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            maxWidth: 'none'
        }).setHTML(carouselHTML);

        const marker = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .setPopup(minPopup)
            .addTo(map);

        marker.getElement().addEventListener('mouseenter', function () {
            marker.togglePopup();
        });

        marker.getElement().addEventListener('mouseleave', function () {
            marker.togglePopup();
        });

        // Add click event to the marker to load details
        marker.getElement().addEventListener('click', function () {
            loadDetails(data[i].id_vivienda);
        });
    }
}

// function mapBox_all(data) {
//     console.log(data);

//     mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
//     const map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/mapbox/satellite-streets-v12',
//         center: [-0.375378, 39.46975], // coordinates for Valencia [lng, lat]
//         zoom: 12 // zoom level for a closer view of Valencia
//     });

//     // Agregar marcador predeterminado en el centro de Valencia
//     const valenciaMarker = new mapboxgl.Marker()
//         .setLngLat([-0.375378, 39.46975]) // coordenadas de Valencia [lng, lat]
//         .addTo(map);
// }

function mapBox(id) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [id.longi, id.lat], // starting position [lng, lat]
        zoom: 10 // starting zoom
    });
    const markerOntinyent = new mapboxgl.Marker()
    const minPopup = new mapboxgl.Popup()
    minPopup.setHTML('<h4>' + id.name_city + '</h4><p>Modelo: ' + id.categorys + '</p>' +
        '<p>Precio: ' + id.price + '€</p>' +
        '<img src=" ' + id.img_ruta + '"/>')
    markerOntinyent.setPopup(minPopup)
        .setLngLat([id.longi, id.lat])
        .addTo(map);
}

function remove_filters() {
    console.log("Removing filters...");
    localStorage.removeItem('filter_type');
    localStorage.removeItem('category_select');
    localStorage.removeItem('operation_select');
    localStorage.removeItem('city_select');
    localStorage.removeItem('type_select');
    localStorage.removeItem('priceValue');
    localStorage.removeItem('priceAlquier');
    localStorage.removeItem('extras_filters');
    localStorage.removeItem('filters_shop_temporary');
    localStorage.removeItem('order_select');
    localStorage.removeItem('filters_search');
    localStorage.removeItem('search_input');
    localStorage.removeItem('pagination');
    localStorage.removeItem('start_index');
    localStorage.removeItem('end_index');
    localStorage.removeItem('page_num');
    location.reload();
}

$(document).ready(function() {
    
    loadVivienda();
    clicks();
    load_filter_shop();
    markLiked();
    counter_likes();
    //////// pagination();

    //////// filter_button_outside_modal();

    highlightFilters();
    secundario_del_highlightFilters();

    filter_button_inside_modal_price();
    filter_button_inside_modal_extras();

});

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// ------------------------- filter_button_outside_modal --------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

/*
function filter_button_outside_modal() {
    var filters_shop = [];
    
    // Filtro categorys
    var categorys = $('.category_select').val();
    if (categorys) {
        localStorage.setItem('category_select', categorys);
        filters_shop.push(['categorys', categorys]);
    }

    // Filtro operation
    var operation_type = $('.operation_select').val();
    if (operation_type) {
        localStorage.setItem('operation_select', operation_type);
        filters_shop.push(['operation_type', operation_type]);
    }

    // Filtro city
    var name_city = $('.city_select').val();
    if (name_city) {
        localStorage.setItem('city_select', name_city);
        filters_shop.push(['name_city', name_city]);
    }

    // Filtro type
    var tipos = $('.type_select').val();
    if (tipos) {
        localStorage.setItem('type_select', tipos);
        filters_shop.push(['tipos', tipos]);
    }
    
    localStorage.setItem('filters_shop', JSON.stringify(filters_shop));
    
    // RECARGAR
    if (filters_shop.length > 0) {
        window.location.reload();
    }
}
*/

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// ------------------------- filter_button_outside_modal --------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------


/*
function filter_button_outside_modal() {
    var filters_shop = [];

    //Filtro category
    $('.category_select').change(function () {
        localStorage.setItem('category_select', this.value);
    });
    if (localStorage.getItem('category_select')) {
        $('.category_select').val(localStorage.getItem('category_select'));
    }
    //Filtro operation
    $('.operation_select').change(function () {
        localStorage.setItem('operation_select', this.value);
    });
    if (localStorage.getItem('operation_select')) {
        $('.operation_select').val(localStorage.getItem('operation_select'));
    }
    
    //Filtro city
    $('.city_select').change(function () {
        localStorage.setItem('city_select', this.value);
    });
    if (localStorage.getItem('city_select')) {
        $('.city_select').val(localStorage.getItem('city_select'));
    }

    //Filtro type
    $('.type_select').change(function () {
        localStorage.setItem('type_select', this.value);
    });
    if (localStorage.getItem('type_select')) {
        $('.type_select').val(localStorage.getItem('type_select'));
    }
    
    localStorage.setItem('filters_shop', JSON.stringify(filters_shop));
    
    // RECARGAR
    if (filters_shop.length > 0) {
        window.location.reload();
    }
}
*/

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------- highlightFilters -----------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

/*
function highlightFilters() {
    var all_filters = JSON.parse(localStorage.getItem('filters_shop'));

    if (all_filters && all_filters.length > 0 && all_filters[0][1] != '*') {
        $('.category_select').val(all_filters.find(filter => filter[0] === 'categorys')[1]);
    }
    if (all_filters && all_filters.length > 0 && all_filters[0][1] != '*') {
        $('.operation_select').val(all_filters.find(filter => filter[0] === 'operation_type')[1]);
    }
    if (all_filters && all_filters.length > 0 && all_filters[0][1] != '*') {
        $('.city_select').val(all_filters.find(filter => filter[0] === 'name_city')[1]);
    }
    if (all_filters && all_filters.length > 0 && all_filters[0][1] != '*') {
        $('.type_select').val(all_filters.find(filter => filter[0] === 'tipos')[1]);
    }
}

function highlightFilters() {
    var all_filters = JSON.parse(localStorage.getItem('filters_shop'));

    // Asignar los valores almacenados en localStorage a los selects
    if (all_filters) {
        $('.category_select').val(all_filters.find(filter => filter[0] === 'categorys')[1]);
        $('.operation_select').val(all_filters.find(filter => filter[0] === 'operation_type')[1]);
        $('.city_select').val(all_filters.find(filter => filter[0] === 'name_city')[1]);
        $('.type_select').val(all_filters.find(filter => filter[0] === 'tipos')[1]);
    }
}

function highlightFilters() {
    var all_filters = JSON.parse(localStorage.getItem('filters_shop'));
    localStorage.removeItem('filters_shop');

    if (all_filters && all_filters.length > 0) {
        all_filters.forEach(function(filter) {
            var filterName = filter[0];
            var filterValue = filter[1];

            switch (filterName) {
                case 'categorys':
                    $('.category_select').val(filterValue);
                    break;
                case 'operation_type':
                    $('.operation_select').val(filterValue);
                    break;
                case 'name_city':
                    $('.city_select').val(filterValue);
                    break;
                case 'tipos':
                    $('.type_select').val(filterValue);
                    break;
                default:
                    break;
            }
        });
    }
}


function highlightFilters() {
    var all_filters = JSON.parse(localStorage.getItem('filters_shop'));

    if (all_filters) {
        for (var i = 0; i < all_filters.length; i++) {
            var filterKey = all_filters[i][0];
            var filterValue = all_filters[i][1];
            $('.' + filterKey + '_select').val(filterValue);
        }
    }
}
*/



/*  SELECT DINAMICOS */


/*

function load_filter_shop() {
    // Cargar datos dinámicos para el select
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=redirect_shop', 'GET', 'JSON', {})
        .then(function(data) {
            // Construir el HTML de los filtros
            var filtrosHtml = "";
            var filtrosoperations = "";


            // Iterar sobre los datos para construir las opciones del select
            for (var i = 0; i < data.length; i++) {
                filtrosHtml += "<option value='" + data[i].categorys + "'>" + data[i].categorys + "</option>";
                filtrosoperations += "<option value='" + data[i].operation_type + "'>" + data[i].operation_type + "</option>";

            }

            // Insertar el HTML de los filtros al principio de '#filters_shop_mostrar'
            $('#filters_shop_mostrar').prepend(
                "<div id='filters_shop' class='filters_shop'>" +
                "   <div class='filtros'>" +
                "       <div class='filtro'>" +
                "           <select class='category_select' name='category_select'>" +
                "               <option value='' disabled selected hidden>Tipo de vivienda</option>" +
                "               <optgroup label='TIPO'>" +
                                    filtrosHtml +
                "               </optgroup>" +
                "           </select>" +
                "       </div>" +
                "   </div>" +
                "   <div class='filtro'>" +
                "       <select class='operation_select' name='operation_select'>" +
                "           <option value='' disabled selected hidden>Tipo de operación</option>" +
                "           <optgroup label='OPERACIÓN'>" +
                            filtrosoperations +
                "               <option value='Alquilar una Habitación'>Alquilar una Habitación</option>" +
                "           </optgroup>" +
                "       </select>" +
                "   </div>" +
                "   <div class='filtro'>" +
                "       <select class='city_select' name='city_select'>" +
                "           <option value='' disabled selected hidden>Ciudad</option>" +
                "           <optgroup label='CIUDAD'>" +
                "               <option value='Valencia'>Valencia</option>" +
                "               <option value='Barcelona'>Barcelona</option>" +
                "               <option value='Sevilla'>Sevilla</option>" +
                "               <option value='Alicante'>Alicante</option>" +
                "               <option value='Teruel'>Teruel</option>" +
                "               <option value='Madrid'>Madrid</option>" +
                "           </optgroup>" +
                "       </select>" +
                "   </div>" +
                "   <div class='filtro'>" +
                "       <select class='type_select' name='type_select'>" +
                "           <option value='' disabled selected hidden>Tipos</option>" +
                "           <optgroup label='TIPOS'>" +
                "               <option value='Piso'>Piso</option>" +
                "               <option value='Casa'>Casa</option>" +
                "               <option value='Chalet'>Chalet</option>" +
                "               <option value='Apartamento'>Apartamento</option>" +
                "               <option value='Duplex'>Duplex</option>" +
                "               <option value='Local'>Local</option>" +
                "           </optgroup>" +
                "       </select>" +
                "   </div>" +
                "   <div class='filtro'>" +
                "       <button class='btn_filters' id='openModalBtn'>PRECIO $</button>" + 
                "       <div id='myModal' class='modal'>" + 
                "           <div class='modal-content'>" +
                "               <span><h2 class='title_modalprice'>Seleccione un precio máximo.</h2></span>" +
                "               <span class='close'>&times;</span>" +
                "               <div class='slider-container'>" +
                "                   <div>" +
                "                       <input type='radio' name='priceType' value='venta' id='venta' checked>" +
                "                       <label for='venta'>Compra</label>" +
                "                   </div>" +
                "                   <input type='range' min='0' max='300000' value='300000' class='slider' id='priceSlider'>" +
                "                   <p>Seleccione el precio máximo: <b class='price_modal'>$<length id='priceValue'>0</length></b></p>" +
                "                   <div>" +
                "                       <input type='radio' name='priceType' value='alquiler' id='alquiler'>" +
                "                       <label for='alquiler'>Alquiler</label>" +
                "                   </div>" +
                "                   <input type='range' min='0' max='9000' value='9000' class='slider' id='priceSlider_2'>" +
                "                   <p>Seleccione el precio máximo: <b class='price_modal'>$<length id='priceAlquier'>0</length></b></p>"+
                "                   <input type='button' class='filter_button' id='filter_button_inside_modal_price' value='SEARCH'>" +
                "               </div>" +
                "           </div>" +
                "       </div>" +
                "   </div>" +
                "   <div class='filtro'>" +
                "       <button class='btn_filters' id='openModalBtn_2'>EXTRAS</button>" + 
                "       <div id='myModal_2' class='modal_2'>" + 
                "           <div class='modal-content_2'>" +
                "               <h2>Extras de vivienda:</h2>" +
                "               <span class='close_2'>&times;</span>" +
                "               <div>" +
                "                   <label class='label_2'><input type='checkbox' name='name_extra' value='ASCENSOR'> Ascensor</label>" +
                "                   <label class='label_2'><input type='checkbox' name='name_extra' value='JARDÍN'> Jardín</label>" +
                "                   <label class='label_2'><input type='checkbox' name='name_extra' value='CALEFACCIÓN'> Calefacción</label>" +
                "               </div>" +
                "               <div>" +
                "                   <label class='label_2'><input type='checkbox' name='name_extra' value='BALCÓN'> Balcón</label>" +
                "                   <label class='label_2'><input type='checkbox' name='name_extra' value='PISCINA'> Piscina</label>" +
                "                   <label class='label_2'><input type='checkbox' name='name_extra' value='GARAJE'> Garaje</label>" +
                "               </div>" +
                "               <input type='button' class='filter_button_extras' id='filter_button_inside_modal_extras' value='SEARCH'>" +
                "           </div>" +
                "       </div>" +
                "   </div>" +
                "   <input type='button' class='filter_button filter_button_outside_modal' id='filter_button_outside_modal' value='SEARCH'>" +
                "   &nbsp;" +
                "   <input type='button' class='remove_filters' id='buttons_filters' value='REMOVE'>" +
                "</div>"
            );

            // Asignar eventos a los botones y selectores
            assignEvents();
        })
        .catch(function() {
            console.error("Error al cargar los datos del select dinámico.");
        });

    // Función para asignar eventos a los botones y selectores
    function assignEvents() {
        $(document).on('click', '.remove_filters', function() {
            remove_filters();
        });

        $(document).on('click', '#filter_button_inside_modal_price', function() {
            filter_button_inside_modal_price();
        });

        // Otros eventos...
    }
}
*/


/*
function load_filter_shop() {
    $('<div></div>').attr({ 'id': 'filters_shop', class: 'filters_shop' }).appendTo('#filters_shop_mostrar')
    .html(
        "<div class='filtros'>" +
        "  <div class='filtro'>" +
        "    <select class='category_select' name='category_select'>" +
        "      <option value='' disabled selected hidden>Tipo de vivienda</option>" +
        "      <optgroup label='TIPO'>" +
        "        <option value='Nueva'>Nueva</option>" +
        "        <option value='Segunda mano'>Segunda mano</option>" +
        "        <option value='Primera linea'>Primera linea</option>" +
        "        <option value='Diseño'>Diseño</option>" +
        "      </optgroup>" +
        "    </select>" +
        "  </div>" +
        "  <div class='filtro'>" +
        "    <select class='operation_select' name='operation_select'>" +
        "      <option value='' disabled selected hidden>Tipo de operación</option>" +
        "      <optgroup label='OPERACIÓN'>" +
        "        <option value='Compra'>Compra</option>" +
        "        <option value='Alquiler'>Alquiler</option>" +
        "        <option value='Compartir'>Compartir</option>" +
        "        <option value='Alquilar una Habitación'>Alquilar una Habitación</option>" +
        "      </optgroup>" +
        "    </select>" +
        "  </div>" +
        "  <div class='filtro'>" +
        "    <select class='city_select' name='city_select'>" +
        "      <option value='' disabled selected hidden>Ciudad</option>" +
        "      <optgroup label='CIUDAD'>" +
        "        <option value='Valencia'>Valencia</option>" +
        "        <option value='Barcelona'>Barcelona</option>" +
        "        <option value='Sevilla'>Sevilla</option>" +
        "        <option value='Alicante'>Alicante</option>" +
        "        <option value='Teruel'>Teruel</option>" +
        "        <option value='Madrid'>Madrid</option>" +
        "      </optgroup>" +
        "    </select>" +
        "  </div>" +
        "  <div class='filtro'>" +
        "    <select class='type_select' name='type_select'>" +
        "      <option value='' disabled selected hidden>Tipos</option>" +
        "      <optgroup label='TIPOS'>" +
        "        <option value='Piso'>Piso</option>" +
        "        <option value='Casa'>Casa</option>" +
        "        <option value='Chalet'>Chalet</option>" +
        "        <option value='Apartamento'>Apartamento</option>" +
        "        <option value='Duplex'>Duplex</option>" +
        "        <option value='Local'>Local</option>" +
        "      </optgroup>" +
        "    </select>" +
        "  </div>" +
        "  <div class='filtro'>" +
        "    <button class='btn_filters' id='openModalBtn'>PRECIO $</button>" + // Botón para abrir el modal
        "    <div id='myModal' class='modal'>" + // Modal
        "      <div class='modal-content'>" +
        "        <span><h2 class='title_modalprice'>Seleccione un precio máximo.</h2></span>" +
        "        <span class='close'>&times;</span>" +
        "        <div class='slider-container'>" +
        "          <div>" +
        "            <input type='radio' name='priceType' value='venta' id='venta' checked>" +
        "            <label for='venta'>Compra</label>" +
        "          </div>" +
        "          <input type='range' min='0' max='300000' value='300000' class='slider' id='priceSlider'>" +
        "          <p>Seleccione el precio máximo: <b class='price_modal'>$<length id='priceValue'>0</length></b></p>" +
        "          <div>" +
        "            <input type='radio' name='priceType' value='alquiler' id='alquiler'>" +
        "            <label for='alquiler'>Alquiler</label>" +
        "          </div>" +
        "          <input type='range' min='0' max='9000' value='9000' class='slider' id='priceSlider_2'>" +
        "          <p>Seleccione el precio máximo: <b class='price_modal'>$<length id='priceAlquier'>0</length></b></p>"+
        "          <input type='button' class='filter_button' id='filter_button_inside_modal_price' value='SEARCH'>" +
        "        </div>" +
        "      </div>" +
        "    </div>" +
        "  </div>" +
        "  <div class='filtro'>" +
        "    <button class='btn_filters' id='openModalBtn_2'>EXTRAS</button>" + // Botón para abrir el modal de extras
        "    <div id='myModal_2' class='modal_2'>" + // Modal de extras
        "      <div class='modal-content_2'>" +
        "        <h2>Extras de vivienda:</h2>" +
        "        <span class='close_2'>&times;</span>" +
        "        <div>" +
        "          <label class='label_2'><input type='checkbox' name='name_extra' value='ASCENSOR'> Ascensor</label>" +
        "          <label class='label_2'><input type='checkbox' name='name_extra' value='JARDÍN'> Jardín</label>" +
        "          <label class='label_2'><input type='checkbox' name='name_extra' value='CALEFACCIÓN'> Calefacción</label>" +
        "        </div>" +
        "        <div>" +
        "          <label class='label_2'><input type='checkbox' name='name_extra' value='BALCÓN'> Balcón</label>" +
        "          <label class='label_2'><input type='checkbox' name='name_extra' value='PISCINA'> Piscina</label>" +
        "          <label class='label_2'><input type='checkbox' name='name_extra' value='GARAJE'> Garaje</label>" +
        "        </div>" +
        "       <input type='button' class='filter_button_extras' id='filter_button_inside_modal_extras' value='SEARCH'>" +
        "      </div>" +
        "    </div>" +
        "  </div>" +
        "  <input type='button' class='filter_button filter_button_outside_modal' id='filter_button_outside_modal' value='SEARCH'>" +
        "  &nbsp;" +
        "  <input type='button' class='remove_filters' id='buttons_filters' value='REMOVE'>" +
        "</div>" +
        "<script src='view/js/modal_price.js'></script>"+
        "<script src='view/js/modal_extras.js'></script>"
    );

    $(document).on('click', '.remove_filters', function() {
        remove_filters();
    });

    $(document).on('click', '#filter_button_inside_modal_price', function() {
        filter_button_inside_modal_price();
    });
}

*/