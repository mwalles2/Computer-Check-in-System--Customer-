<?php
	$base_path = "/Library/WebServer/Gateway_Documents";
	require_once("includes/class/HtmlTemplate.class");
	require_once("includes/php/checkin_functions.php");
	require_once("includes/php/db.php");
	require_once("includes/php/web_dev_template.php");
	require_once("includes/php/login_functions.php");

	setcookie("uid",$userid,time()-15,"/");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$page = WDN_create_page();
	WDN_add_navigation($page);

	$content = create_login_form($page,"welcome.php",$connect);

	$page -> SetParameter("CONTENT" , $content -> CreateHTML());
	$page -> CreatePage();
	mysql_close($connect);
?>