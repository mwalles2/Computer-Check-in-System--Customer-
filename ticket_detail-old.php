<?php
	require_once("../includes/class/HtmlTemplate.class");
	require_once("../includes/php/db.php");
	require_once("../includes/php/general.php");
	require_once("includes/php/auth.php");
	
	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$page = new HtmlTemplate("../admin/includes/inc/admin.inc");
	$page -> SetParameter ("TITLE","Ticket Detail");

	$ticket_detail = new HtmlTemplate("../admin/includes/inc/ticket_detail/ticket_detail.inc");
	//need to add a table that will have the current tabs in it

	$ticket_detail_tabs = new HtmlTemplate("includes/inc/ticket_detail/ticket_detail-tabs.inc");

	$ticket_detail -> SetParameter("TABS", $ticket_detail_tabs -> CreateHTML());

	$page -> SetParameter("SCRIPTSRC", "includes/js/ticket_detail/ticket_detail-ajax.js");
	$page -> SetParameter("SCRIPTSRC", "includes/js/ticket_detail/ticket_detail-tabs.js");
	$page -> SetParameter("SCRIPTSRC", "../includes/js/ajax-fade.js");
	//need to replace this with a loop that will get the tab ticket_details out of the data base.

	require_once("../admin/includes/php/ticket_detail/ticket_detail-general/ticket_detail-general-tab.php");
	require_once("../admin/includes/php/ticket_detail/ticket_detail-checklist/ticket_detail-checklist-tab.php");
	require_once("../admin/includes/php/ticket_detail/ticket_detail-charge/ticket_detail-charge-tab.php");
	require_once("../admin/includes/php/ticket_detail/ticket_detail-administration/ticket_detail-administration-tab.php");

	mysql_close($connect);
	$page -> SetParameter ("CONTENT", $ticket_detail -> CreateHTML());
	$page -> SetParameter("TID", $_GET['tid']);
	$page -> CreatePage();
?>