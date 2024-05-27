function protecturl() {
    var tokens = localStorage.getItem('user_tokens');
    var access_token = JSON.parse(tokens).access_token;
    // console.log(access_token);
	$.ajax({
		type : 'POST',
		url  : friendlyURL("?module=login&op=controluser"),
		data :  {access_token}
	})
	.done(function(data){
        // console.log(data);
		if (data == "match"){
			console.log(data);
		}else if (data == "not_match"){
			toastr.options.timeOut = 2000;
			toastr.error("Debes realizar login");
			setInterval(function(){logout()}, 2000);
		}
	})
	.fail( function(response){
		console.log(response)
	});
}

function protect_activity() {
	setInterval(function(){
		$.ajax({
			type : 'POST',
			url  : friendlyURL("?module=login&op=activity"),
			success :  function(response){
				if(response == "inactivo"){
					toastr.options.timeOut = 2000;
					toastr.error("Tiempo agotado, porfavor inicie sesión de nuevo");
					setInterval(function(){logout()}, 2000);
				}
			}
		});
	}, 600000);
}

function token_expires() {
    var tokens = localStorage.getItem('user_tokens');
    if (tokens) {
        var parsedTokens = JSON.parse(tokens);
        var access_token = parsedTokens.access_token;

        // console.log(access_token);
        if (access_token == null) {
            console.log('Not registered');
        } else {
            $.ajax({
                type: 'POST',
                url: friendlyURL("?module=login&op=token_expires"),
                data: { access_token: access_token },
                dataType: 'json'
            })
            .done(function(data) {
                // console.log(data);
                if (data === "activo") {
                    // console.log('HOlaaa expiresssss2222');
                    console.log(data);
                } else if (data === "inactivo") {
                    toastr.options.timeOut = 2000;
                    toastr.error("Tiempo agotado, por favor inicie sesión de nuevo");
                    setTimeout(function() { logout(); }, 2000);
                    // console.log('HOlaaa expiresssss2222');
                }
            })
            .fail(function(response) {
                console.log(response);
            });
        }
    } else {
        console.log('Tokens not found in localStorage');
    }
}


function refresh_session() {
	setInterval(function(){
		$.ajax({
			type : 'POST',
			url  : friendlyURL("?module=login&op=refresh_cookie")
		}).done(function(data){			
			console.log("$Session updated");
		})
		.fail( function(response){
			console.log(response);	
		});
	}, 600000);
}

function refresh_token() {
    var tokens = localStorage.getItem('user_tokens');

    if (tokens) {
        var parsedTokens = JSON.parse(tokens);
        var access_token = parsedTokens.access_token;
        console.log(access_token);

        if (access_token) {
            $.ajax({
                type: 'POST',
                url: friendlyURL("?module=login&op=refresh_token"),
                data: { access_token: access_token },
                dataType: 'json'
            }).done(function(data) {
                // console.log(data);
                if (data.access_token) {
                    parsedTokens.access_token = data.access_token;
                    localStorage.setItem('user_tokens', JSON.stringify(parsedTokens));
                } else {
                    console.log('Failed to refresh token:', data);
                }
            }).fail(function(response) {
                console.log('Request failed:', response);
            });
        } else {
            console.log('Access token is null');
        }
    } else {
        console.log('Tokens not found in localStorage');
    }
}

// Call the refresh_token function to ensure it executes
refresh_token();



$(document).ready(function(){
	protect_activity();
    // setInterval(function() { protect_activity() }, 600000);
	token_expires();
    setInterval(function() { refresh_token() }, 60000); // 10 min
	refresh_session();
    // setInterval(function() { refresh_session() }, 600000);
	protecturl();
});
