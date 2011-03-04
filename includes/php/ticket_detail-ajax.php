<?php
	require_once("db.php");
	require_once("admin-general-ajax.php");
	//require_once("../../auth.php");
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);
	$xml ="<data>\r";
	$debug = false;
	$mysql_error_bool=false;
	$mysql_out = "<mysql>\r";

	$type="fromUser";
	$xml .= create_note($type,urldecode($_GET['note']),$_COOKIE['UID'],$_GET['id'],$connect);
	$xml .="</data>";

	header('Content-Type: text/xml');
	echo $xml;
	mysql_close($connect);
?>