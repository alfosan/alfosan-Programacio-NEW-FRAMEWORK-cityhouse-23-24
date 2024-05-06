function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    // console.log('ajaxPromise - URL:', sUrl);
    // console.log('ajaxPromise - Type:', sType);
    // console.log('ajaxPromise - DataType:', sTData);
    // console.log('ajaxPromise - Data:', sData);

    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        })
        .done((data) => {
            if (data === "No hay viviendas disponibles.") {
                window.location.href = 'view/inc/error404.php';
            } else {
                resolve(data);
            }
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.error('ajaxPromise - Error:', errorThrown);
            console.error('ajaxPromise - Response:', jqXHR.responseText); 
            reject(errorThrown);
        });
    });
}