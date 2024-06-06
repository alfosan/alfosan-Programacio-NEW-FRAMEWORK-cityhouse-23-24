
        console.log('ENTRAMOS EN EL PROFILE CORRECTAMENTE.');

        function loadFactura() {
            var username = localStorage.getItem('username');
            console.log(username);
            $.ajax({
                url: friendlyURL('?module=profile&op=load_factura'),
                type: 'POST',
                dataType: 'json',
                data: { username: username },
                success: function(response) {
                    console.log(response); // Verifica el formato de los datos devueltos
                    if (response.length > 0) {
                        response.forEach(factura => {
                        let totalPrice = 0;
                        let tableHTML = '';
        
                        response.forEach(item => {
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
        
                        document.querySelector('.header_prof h1').innerText = `Factura #${response[0].id_factura}`;
                        document.querySelector('.header_prof p').innerText = `Num Factura #${response[0].id_factura}`;
                        document.querySelector('.details .left p:nth-child(1)').innerText = `Cliente: ${response[0].username}`;
                        document.querySelector('.details .left p:nth-child(2)').innerText = `Fecha: ${new Date().toLocaleDateString()}`;
                        document.querySelector('.details .right p:nth-child(1)').innerText = `Precio Total: € ${formatPriceWithDots(totalPrice)}`;
                        document.querySelector('.details .right p:nth-child(2)').innerText = `Estado: Comprado`;
        
                        document.querySelector('tbody').innerHTML = tableHTML;
        
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
        

        $(document).ready(function() {
            loadFactura();
        });