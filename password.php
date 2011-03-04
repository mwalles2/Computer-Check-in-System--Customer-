<?php
	require_once("includes/php/auth.php");

	$nav_first_section = array (array("link" => "open.php","text" => "Open Tickets"),
								array("link" => "closed.php","text" => "Closed Tickets"));

	$nav_sections = array (array("sectionlink" => "personal.php","sectiontext" => "Personal Information","sublinks" => array(array("link" => "contact.php","text" => "Contact Information"),
																							 					   array("link" => "password.php","text" => "Change Password"))));
	WDN_add_navigation($page,$nav_first_section,$nav_sections);

	$page -> SetParameter("TITLE", "Password Reset");
	$page -> SetParameter("BODYOPTIONS", "");

	$page -> SetParameter("CSSSRC",		"includes/css/error.css");
	$page -> SetParameter("CSSSRC",		"includes/css/main.css");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/general.js");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/xmlrequest.js");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/password_reset.js");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/password_reset_ajax.js");

	$user_query = mysql_query("select * from user where uid = ".$_COOKIE['UID']);
	$user_array = mysql_fetch_array($user_query);

	if(strpos($user_array['nuid'],"X") !== false)
	{
		if($user_array['password'] != "")
		{
			$content = new HtmlTemplate("includes/inc/password.inc");
		}
		else
		{
			$content = new HtmlTemplate("includes/inc/password_notes.inc");
		}
	}
	else
	{
		$content = new HtmlTemplate("includes/inc/password_blackboard.inc");
	}

	mysql_close($connect);
	$page  -> SetParameter("CONTENT" , $content -> CreateHTML());
	$page -> CreatePage();
?>