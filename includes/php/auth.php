<?php
	header("Cache-Control: no-cache");
	$base_path = $_SERVER['DOCUMENT_ROOT'];

	require_once($base_path."/includes/class/HtmlTemplate.class");
	require_once($base_path."/includes/php/db.php");
	require_once($base_path."/includes/php/ldap_info.php");
	require_once($base_path."/includes/php/auth_functions.php");
	//require_once($base_path."/includes/php/web_dev_template.php");
	require_once($base_path."/includes/php/web_dev_template_v3.php");
	require_once($base_path."/includes/php/checkin_functions.php");
	require_once($base_path."/includes/php/general.php");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	global $CONFIG;
	setConfig($connect);
	$page = WDN_create_page($connect);

	$no_auth = true;
	if($_GET['logout']=="true")
	{
		setcookie("USERID",		"",time()-15,"/");
		setcookie("USERHASH",	"",time()-15,"/");
		setcookie("USERNAME",	"",time()-15,"/");
		setcookie("UID",		"",time()-15,"/");
		setcookie("USERLOGIN",	"",time()-15,"/");
		$no_auth = false;
		header("Location: ".$CONFIG['site_protocol'].$CONFIG['user_site_address']);
		exit;
	}
	
	if($_COOKIE['USERID'] && $_COOKIE['USERHASH'] && $_COOKIE['USERLOGIN'] == "TRUE")
	{
		$cookie_results = mysql_query("select * from userlogin where userid = \"".$_COOKIE['UID']."\" && hash = \"".$_COOKIE['USERHASH']."\" && ip =\"".$_SERVER['REMOTE_ADDR']."\"");
		if(mysql_num_rows($cookie_results) > 0)
		{
			$cookie_row = mysql_fetch_array($cookie_results);
			if((strtotime($cookie_row[last])+(60*60)) > time())
			{
				set_auth($_COOKIE['USERID'],"u");
				$no_auth = false;
			}
		}
	}

	if($no_auth)
	{
		($_POST['uri'] != "")?$path=str_replace("*AMP*","&",$_POST['uri']):$path = $_SERVER["REQUEST_URI"];

		WDN_add_navigation($page);

		$content = new HtmlTemplate($base_path."/includes/inc/auth.inc");
		$content -> SetParameter("URI", $path);
		$content -> SetParameter("CURRENTNOTDONE", flowerDayNumber($connect));
		$content -> SetParameter("DONETHISWEEK", doneThisWeek($connect));

		$page -> SetParameter("CSSSRC",		"/includes/css/error.css");
		$page -> SetParameter("CSSSRC",		"/includes/css/main.css");
		$page -> SetParameter("CSSSRC",		"/includes/css/main-ajax.css");
		$page -> SetParameter("SCRIPTSRC",	"/includes/js/xmlrequest.js");
		$page -> SetParameter("SCRIPTSRC",	"/includes/js/auth_ajax.js");
		$page -> SetParameter("SCRIPTSRC",	"/includes/js/auth.js");
		$page -> SetParameter("SCRIPTSRC",	"/includes/js/general.js");
		$page -> SetParameter("CONTENT",	$content -> CreateHtml());
		$page -> SetParameter("TITLE", "Login");
		$page -> SetParameter("LOGOUTON", "display:none");
		$page -> CreatePage();

		exit;
	}
	else
	{
		$page -> SetParameter("LOGOUTON", "");
	}
?>