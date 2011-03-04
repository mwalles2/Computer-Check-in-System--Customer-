<?php
	require_once("includes/php/auth.php");
	require_once("includes/php/list_computer.php");

	$nav_first_section = array (array("link" => "open.php","text" => "Open Tickets"),
								array("link" => "closed.php","text" => "Closed Tickets"));

	$nav_sections = array (array("sectionlink" => "personal.php","sectiontext" => "Personal Information","sublinks" => array(array("link" => "contact.php","text" => "Contact Information"),
																							 					   array("link" => "password.php","text" => "Change Password"))));

	WDN_add_navigation($page,$nav_first_section,$nav_sections);

	$page -> SetParameter("TITLE", "Open Tickets");
	$page -> SetParameter("BODYOPTIONS", "");

	$page -> SetParameter("CSSSRC",		"includes/css/error.css");
	$page -> SetParameter("CSSSRC",		"includes/css/main.css");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/general.js");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$result=mysql_query("select ticket.tid, user.name, ticket.indate, computer.brand, computer.type, ticket.status, ticket.untildate, ticket.express, locations.name as location_name from ticket, user, ttc, computer, locations where ticket.tid=ttc.tid and ttc.compid=computer.compid and ticket.OutDate = '0000-00-00 00:00:00' and ticket.nuid=user.nuid and user.uid = ".$_COOKIE['UID']." and ticket.locid=locations.locid order by ticket.INDATE");

	$out_list = array();
	while($row=mysql_fetch_array($result,MYSQL_ASSOC))
	{
		//echo
		$out_list = create_rows($row, $out_list);
	}

	$page = output_rows($page, $out_list);
	$page -> CreatePage();
	mysql_close($connect);
?>
