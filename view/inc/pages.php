<?php
	$page = isset($_GET['page']) ? $_GET['page'] : "";
	switch ($page){
		case "homepage";
			include("module/home/view/home.html");
			break;
		/*case "controller_vivienda";
			include("module/vivienda/controller/".$_GET['page'].".php");
			break;*/
		case "agents";
			include("module/agents/".$_GET['page'].".php");
			break;
		case "contact";
			include("module/shop/ctrl/".$_GET['page'].".php");
			break;
		case "about";
			include("module/about/".$_GET['page'].".php");
			break;
		case "blog";
			include("module/blog/".$_GET['page'].".php");
			break;
		case "shop";
			include("module/shop/view/".$_GET['page'].".html");
			break;
		case "404";
			include("view/inc/error".$_GET['page'].".php");
			break;
		case "503";
			include("view/inc/error".$_GET['page'].".php");
			break;
		default;
			include("module/home/view/home.html");
			break;
	}
?>
