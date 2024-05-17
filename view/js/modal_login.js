console.log('anbrimos el modalNAIJSdiaishdh91273918728');
function openModal() {
            $('#miModal').modal('show');
            $('#miModal .modal-body').html(`
                <div class="login-wrap">
                    <div class="login-html">
                        <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Sign In</label>
                        <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Sign Up</label>
                        <div class="login-form">
                            <form id="login__form" method="POST">
                                <div class="sign-in-htm">
                                    <div class="group">
                                        <label for="username_log" class="label">Username</label>
                                        <input id="username_log" type="text" class="input" name="username_log" autocomplete="username">
                                        <span id="error_username_log" class="error"></span>
                                    </div>
                                    <div class="group">
                                        <label for="passwd_log" class="label">Password</label>
                                        <input id="passwd_log" type="password" class="input" name="passwd_log" autocomplete="current-password">
                                        <span id="error_passwd_log" class="error"></span>
                                    </div>
                                    <div class="group">
                                        <input type="submit" id="login" class="button" value="Sign In">
                                    </div>
                                    <div class="hr"></div>
                                    <div class="foot-lnk">
                                        <label for="tab-2">You don't have an account? </label>
                                        <a href="http://localhost/proyectos/8_MVC_CRUD/index.php?page=homepage" class="button">Back</a>
                                    </div>
                                </div>
                            </form>
                            <form id="register__form" method="post">
                                <div class="sign-up-htm">
                                    <div class="group">
                                        <label for="username_reg" class="label">Username</label>
                                        <input id="username_reg" type="text" class="input" name="username_reg" autocomplete="new-username">
                                        <span id="error_username_reg" class="error"></span>
                                    </div>
                                    <div class="group">
                                        <label for="passwd1_reg" class="label">Password</label>
                                        <input id="passwd1_reg" type="password" class="input" name="passwd1_reg" autocomplete="new-password">
                                        <span id="error_passwd1_reg" class="error"></span>
                                    </div>
                                    <div class="group">
                                        <label for="passwd2_reg" class="label">Repeat Password</label>
                                        <input id="passwd2_reg" type="password" class="input" name="passwd2_reg" autocomplete="new-password">
                                        <span id="error_passwd2_reg" class="error"></span>
                                    </div>
                                    <div class="group">
                                        <label for="email_reg" class="label">Email Address</label>
                                        <input id="email_reg" type="email" class="input" name="email_reg">
                                        <span id="error_email_reg" class="error"></span>
                                    </div>
                                    <div class="group">
                                        <input type="submit" id="register" class="button" value="Sign Up">
                                    </div>
                                    <div class="hr"></div>
                                    <div class="foot-lnk">
                                        <label for="tab-1">Already Member?</label>
                                        <a href="http://localhost/proyectos/8_MVC_CRUD/index.php?page=homepage" class="button">Back</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `);
        }
