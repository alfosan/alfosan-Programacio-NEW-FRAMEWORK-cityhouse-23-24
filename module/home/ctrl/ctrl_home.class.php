<?php
	class ctrl_home {
		
		function view(){
			// echo 'hola view';
			common::load_view('top_page_home.html', VIEW_PATH_HOME . 'home.html');
		}

		// function carrusel() {
        //     echo json_encode(common::load_model('home_model', 'get_carrusel'));
        // }

        // function category() {
        //     //
        //     echo json_encode(common::load_model('home_model', 'get_category'));
        // }
        
        // function type() {
        //     // echo json_encode('Hola');
        //     echo json_encode(common::load_model('home_model', 'get_type'));
        // }

		// function send_contact_us(){
		// 	$message = ['type' => 'contact',
		// 				'inputName' => $_POST['name'], 
		// 				'fromEmail' => $_POST['email'], 
		// 				'inputMatter' => $_POST['matter'], 
		// 				'inputMessage' => $_POST['message']];
		// 	$email = json_decode(mail::send_email($message), true);
			
		// 	if (!empty($email)) {
		// 		echo json_encode('Done!');
		// 		return;  
		// 	} else {
		// 		echo json_encode('Error!');
		// 	}
		// }
	}
?>
