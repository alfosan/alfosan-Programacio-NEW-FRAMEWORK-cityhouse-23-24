
        console.log('ENTRAMOS EN EL PROFILE CORRECTAMENTE.');
        function loadFactura() {
            $('.footer').hide();
            var username = localStorage.getItem('username');
            console.log(username);
            $.ajax({
                url: friendlyURL('?module=profile&op=load_factura'),
                type: 'POST',
                dataType: 'json',
                data: { username: username },
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

        // (document).on('click', '.download_pdf img', function(e) {
        //     e.preventDefault();
        //     let id_factura = $(this).closest('.invoice').find('.header_prof h1').text().split('#')[1].trim(); // Obtén el id de factura del encabezado correspondiente
        
        //     // Realiza una llamada AJAX para generar el PDF
        //     $.ajax({
        //         url: friendlyURL('?module=profile&op=generate_pdf_factura'),
        //         type: 'POST',
        //         dataType: 'json',
        //         data: { 
        //             id_factura: id_factura 
        //         },
        //         success: function(response) {
        //             if (response.status === 'success') {
        //                 // Redirige al usuario para que descargue el PDF generado
        //                 window.location.href = response.url;
        //             } else {
        //                 console.error('Error al generar el PDF');
        //             }
        //         },
        //         error: function(xhr, status, error) {
        //             console.error(xhr.responseText);
        //             console.error('Error en la solicitud AJAX');
        //         }
        //     });
        // });
        
        

        $(document).ready(function() {
            loadFactura();
        });