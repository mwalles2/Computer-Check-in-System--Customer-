<?php
	require_once("includes/php/auth.php");

	$nav_first_section = array (array("link" => "open.php","text" => "Open Tickets"),
								array("link" => "closed.php","text" => "Closed Tickets"));

	$nav_sections = array (array("sectionlink" => "personal.php","sectiontext" => "Personal Information","sublinks" => array(array("link" => "contact.php","text" => "Contact Information"),
																							 					   array("link" => "password.php","text" => "Change Password"))));

	WDN_add_navigation($page,$nav_first_section,$nav_sections);

	$page -> SetParameter("TITLE", "Welcome");
	$page -> SetParameter("BODYOPTIONS", "");

	$page -> SetParameter("CSSSRC",		"includes/css/error.css");
	$page -> SetParameter("CSSSRC",		"includes/css/main.css");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/general.js");

	$content = new HtmlTemplate("includes/inc/welcome.inc");

	$page  -> SetParameter("CONTENT" , $content -> CreateHTML());
	$page -> CreatePage();
?>