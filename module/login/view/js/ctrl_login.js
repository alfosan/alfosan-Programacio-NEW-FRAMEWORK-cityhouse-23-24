// ------------------- LOGIN ------------------------ //
console.log('ENTRAMOS EN EL VALIDATE LOGIN');

function login() {
    if (validate_login() != 0) {
        var data = $('#login__form').serialize();
        $.ajax({
            url: '/proyectos/FRAMEWORK_CITYHOUSE/module/login/ctrl/?module=login&op=login',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function(result) {
                if (result == "error_user") {
                    document.getElementById('error_username_log').innerHTML = "El usuario no existe, asegúrate de que lo has escrito correctamente";
                } else if (result == "error_passwd") {
                    document.getElementById('error_passwd_log').innerHTML = "La contraseña es incorrecta";
                } else {
                    // Dentro de la función 'success'
                    // localStorage.setItem("token", result.token);
                    localStorage.setItem("access_token", result.access_token);
                    localStorage.setItem("refresh_token", result.refresh_token);

                    toastr.success("Loged successfully");

                    if (localStorage.getItem('redirect_like')) {

                        setTimeout(function() {
                            window.location.href = "/proyectos/FRAMEWORK_CITYHOUSE/home";
                        }, 1000);
                    } else {
                        setTimeout(function() {
                            window.location.href = "/proyectos/FRAMEWORK_CITYHOUSE/home";
                        }, 1000);
                    }
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (console && console.log) {
                    console.log("La solicitud ha fallado: " + textStatus);
                }
            }
        });
    }
}

function key_login() {
    $("#login").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            login();
        }
    });
}

function button_login() {
    $('#login').on('click', function(e) {
        e.preventDefault();
        login();
    });
}

function validate_login() {
    var error = false;

    if (document.getElementById('username_log').value.length === 0) {
        document.getElementById('error_username_log').innerHTML = "Tienes que escribir el usuario";
        error = true;
    } else {
        if (document.getElementById('username_log').value.length < 5) {
            document.getElementById('error_username_log').innerHTML = "El usuario tiene que tener 5 caracteres como minimo";
            error = true;
        } else {
            document.getElementById('error_username_log').innerHTML = "";
        }
    }

    if (document.getElementById('passwd_log').value.length === 0) {
        document.getElementById('error_passwd_log').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {
        document.getElementById('error_passwd_log').innerHTML = "";
    }

    if (error == true) {
        return 0;
    }
}

// function social_login(param){
//     authService = firebase_config();
//     authService.signInWithPopup(provider_config(param))
//     .then(function(result) {
//         console.log('Hemos autenticado al usuario ', result.user);
//         email_name = result.user.email;
//         let username = email_name.split('@');
//         console.log(username[0]);

//         social_user = {id: result.user.uid, username: username[0], email: result.user.email, avatar: result.user.photoURL};
//         if (result) {
//             ajaxPromise(friendlyURL("?module=login&op=social_login"), 'POST', 'JSON', social_user)
//             .then(function(data) {
//                 localStorage.setItem("token", data);
//                 toastr.options.timeOut = 3000;
//                 toastr.success("Inicio de sesión realizado");
//                 if(localStorage.getItem('likes') == null) {
//                     setTimeout('window.location.href = friendlyURL("?module=home&op=view")', 1000);
//                 } else {
//                     setTimeout('window.location.href = friendlyURL("?module=shop&op=view")', 1000);
//                 }
//             })
//             .catch(function() {
//                 console.log('Error: Social login error');
//             });
//         }
//     })
//     .catch(function(error) {
//         var errorCode = error.code;
//         console.log(errorCode);
//         var errorMessage = error.message;
//         console.log(errorMessage);
//         var email = error.email;
//         console.log(email);
//         var credential = error.credential;
//         console.log(credential);
//     });
// }

// ------------------- REGISTER ------------------------ //
console.log('ENTRAMOS EN EL VALIDATE REGISTER');

function register() {
    console.log('aqui entro');

    if (validate_register() != 0) {
        var data = $('#register__form').serialize();
        $.ajax({
            url: '/proyectos/FRAMEWORK_CITYHOUSE/?module=login&op=register',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function(result) {
                console.log(data);
                if (result == "error_email") {
                    document.getElementById('error_email_reg').innerHTML = "El email ya esta en uso, asegurate de no tener ya una cuenta";
                } else if (result == "error_user") {
                    document.getElementById('error_username_reg').innerHTML = "El usuario ya esta en uso, intentalo con otro";
                } else {
                    toastr.success("Registery succesfully");
                    setTimeout(function() {
                        window.location.href = "/proyectos/FRAMEWORK_CITYHOUSE/home";
                    }, 1000);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("La solicitud ha fallado: " + textStatus);
            }
        });
    }
}


function key_register() {
    $("#register").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            register();
        }
    });
}

function button_register() {
    $('#register').on('click', function(e) {
        // console.log('aqui entro');

        e.preventDefault();
        register();
    });
}

function validate_register() {
    var username_exp = /^(?=.{5,}$)(?=.*[a-zA-Z0-9]).*$/;
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var pssswd_exp = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    var error = false;

    if (document.getElementById('username_reg').value.length === 0) {
        document.getElementById('error_username_reg').innerHTML = "Tienes que escribir el usuario";
        error = true;
    } else {
        if (document.getElementById('username_reg').value.length < 5) {
            document.getElementById('error_username_reg').innerHTML = "El username tiene que tener 5 caracteres como minimo";
            error = true;
        } else {
            if (!username_exp.test(document.getElementById('username_reg').value)) {
                document.getElementById('error_username_reg').innerHTML = "No se pueden poner caracteres especiales";
                error = true;
            } else {
                document.getElementById('error_username_reg').innerHTML = "";
            }
        }
    }

    if (document.getElementById('email_reg').value.length === 0) {
        document.getElementById('error_email_reg').innerHTML = "Tienes que escribir un correo";
        error = true;
    } else {
        if (!mail_exp.test(document.getElementById('email_reg').value)) {
            document.getElementById('error_email_reg').innerHTML = "El formato del mail es invalido";
            error = true;
        } else {
            document.getElementById('error_email_reg').innerHTML = "";
        }
    }

    if (document.getElementById('passwd1_reg').value.length === 0) {
        document.getElementById('error_passwd1_reg').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {
        if (document.getElementById('passwd1_reg').value.length < 8) {
            document.getElementById('error_passwd1_reg').innerHTML = "La password tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            if (!pssswd_exp.test(document.getElementById('passwd1_reg').value)) {
                document.getElementById('error_passwd1_reg').innerHTML = "Debe de contener minimo 8 caracteres, mayusculas, minusculas y simbolos especiales";
                error = true;
            } else {
                document.getElementById('error_passwd1_reg').innerHTML = "";
            }
        }
    }

    if (document.getElementById('passwd2_reg').value.length === 0) {
        document.getElementById('error_passwd2_reg').innerHTML = "Tienes que repetir la contraseña";
        error = true;
    } else {
        if (document.getElementById('passwd2_reg').value.length < 8) {
            document.getElementById('error_passwd2_reg').innerHTML = "La password tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            if (document.getElementById('passwd2_reg').value === document.getElementById('passwd1_reg').value) {
                document.getElementById('error_passwd2_reg').innerHTML = "";
            } else {
                document.getElementById('error_passwd2_reg').innerHTML = "La password's no coinciden";
                error = true;
            }
        }
    }

    if (error == true) {
        return 0;
    }
}


// ------------------- RECOVER PASSWORD ------------------------ //
// function load_form_recover_password(){
//     $(".login-wrap").hide();
//     $(".forget_html").show();
//     $('html, body').animate({scrollTop: $(".forget_html")});
//     click_recover_password();
// }

// function click_recover_password(){
//     $(".forget_html").keypress(function(e) {
//         var code = (e.keyCode ? e.keyCode : e.which);
//         if(code==13){
//         	e.preventDefault();
//             send_recover_password();
//         }
//     });

//     $('#button_recover').on('click', function(e) {
//         e.preventDefault();
//         send_recover_password();
//     }); 
// }

// function validate_recover_password(){
//     var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
//     var error = false;

//     if(document.getElementById('email_forg').value.length === 0){
// 		document.getElementById('error_email_forg').innerHTML = "Tienes que escribir un correo";
// 		error = true;
// 	}else{
//         if(!mail_exp.test(document.getElementById('email_forg').value)){
//             document.getElementById('error_email_forg').innerHTML = "El formato del mail es invalido"; 
//             error = true;
//         }else{
//             document.getElementById('error_email_forg').innerHTML = "";
//         }
//     }
	
//     if(error == true){
//         return 0;
//     }
// }

// function send_recover_password(){
//     if(validate_recover_password() != 0){
//         var data = $('#recover_email_form').serialize();
//         $.ajax({
//             url: friendlyURL('?module=login&op=send_recover_email'),
//             dataType: 'json',
//             type: "POST",
//             data: data,
//         }).done(function(data) {
//             if(data == "error"){		
//                 $("#error_email_forg").html("The email doesn't exist");
//             } else{
//                 toastr.options.timeOut = 3000;
//                 toastr.success("Email sended");
//                 setTimeout('window.location.href = friendlyURL("?module=login&op=view")', 1000);
//             }
//         }).fail(function( textStatus ) {
//             console.log('Error: Recover password error');
//         });    
//     }
// }

// function load_form_new_password(){
//     token_email = localStorage.getItem('token_email');
//     localStorage.removeItem('token_email');
//     $.ajax({
//         url: friendlyURL('?module=login&op=verify_token'),
//         dataType: 'json',
//         type: "POST",
//         data: {token_email: token_email},
//     }).done(function(data) {
//         if(data == "verify"){
//             click_new_password(token_email); 
//         }else {
//             console.log("error");
//         }
//     }).fail(function( textStatus ) {
//         console.log("Error: Verify token error");
//     });    
// }

// function click_new_password(token_email){
//     $(".recover_html").keypress(function(e) {
//         var code = (e.keyCode ? e.keyCode : e.which);
//         if(code==13){
//         	e.preventDefault();
//             send_new_password(token_email);
//         }
//     });

//     $('#button_set_pass').on('click', function(e) {
//         e.preventDefault();
//         send_new_password(token_email);
//     }); 
// }

// function validate_new_password(){
//     var error = false;

//     if(document.getElementById('pass_rec').value.length === 0){
// 		document.getElementById('error_password_rec').innerHTML = "You have to write a password";
// 		error = true;
// 	}else{
//         if(document.getElementById('pass_rec').value.length < 8){
//             document.getElementById('error_password_rec').innerHTML = "The password must be longer than 8 characters";
//             error = true;
//         }else{
//             document.getElementById('error_password_rec').innerHTML = "";
//         }
//     }

//     if(document.getElementById('pass_rec_2').value != document.getElementById('pass_rec').value){
// 		document.getElementById('error_password_rec_2').innerHTML = "Passwords don't match";
// 		error = true;
// 	}else{
//         document.getElementById('error_password_rec_2').innerHTML = "";
//     }

//     if(error == true){
//         return 0;
//     }
// }

// function send_new_password(token_email){
//     if(validate_new_password() != 0){
//         var data = {token_email: token_email, password : $('#pass_rec').val()};
//         $.ajax({
//             url: friendlyURL("?module=login&op=new_password"),
//             type: "POST",
//             dataType: "JSON",
//             data: data,
//         }).done(function(data) {
//             if(data == "done"){
//                 toastr.options.timeOut = 3000;
//                 toastr.success('New password changed');
//                 setTimeout('window.location.href = friendlyURL("?module=login&op=view")', 1000);
//             } else {
//                 toastr.options.timeOut = 3000;
//                 toastr.error('Error seting new password');
//             }
//         }).fail(function(textStatus) {
//             console.log("Error: New password error");
//         });    
//     }
// }

// ------------------- LOAD CONTENT ------------------------ //
function load_content() {
    let path = window.location.pathname.split('/');
    console.log("Path:", path);

    if (path[5] === 'recover') {
        console.log("Recover path detected");
        window.location.href = friendlyURL("?module=login&op=recover_view");
        localStorage.setItem("token_email", path[6]);
    } else if (path[5] === 'verify') {
        console.log("Verify path detected with token:", path[6]);
        ajaxPromise(friendlyURL("?module=login&op=verify_email"), 'POST', 'JSON', { token_email: path[6] })
        .then(function(data) {
            console.log("Response from verify_email:", data);
            if (data === 'verify') {
                toastr.options.timeOut = 3000;
                toastr.success('Email verified');
                setTimeout(function() {
                    window.location.href = friendlyURL("?module=home");
                }, 1000);
            } else {
                toastr.error('Email verification failed');
            }
        })
        .catch(function() {
            console.log('Error: verify email error');
            toastr.error('Error: verify email error');
        });
    } else if (path[4] === 'view') {
        $(".login-wrap").show();
        $(".forget_html").hide();
    } else if (path[4] === 'recover_view') {
        load_form_new_password();
    }
}

$(document).ready(function(){
    load_content();
    key_login();
    button_login();
    key_register();
    button_register();
});