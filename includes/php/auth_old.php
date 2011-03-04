<?php
	global $TECH_STATUS;

	header("Cache-Control: no-cache");
	require_once(dirname(__FILE__)."/../includes/class/HtmlTemplate.class");
	require_once(dirname(__FILE__)."/includes/php/db.php");
	require_once(dirname(__FILE__)."/ldap_info.php");

	if($_SERVER['https'] == 1)
	{
		$protocol = "https://";
	}
	else
	{
		$protocol = "http://";
	}

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	function set_auth($userid,$action)
	{
		$tech_query = mysql_query("select * from tech where USERid = \"".$userid."\"");
		$tech_row = mysql_fetch_array($tech_query);

		global $TECH_STATUS;
		$TECH_STATUS = explode (":",$tech_row['status']);

		$cookie_hash = md5($tech_row['username'].$_SERVER['REMOTE_ADDR'].time().rand());

		setcookie("USERID",$userid,time()+60*60,"/admin/");
		setcookie("USERNAME",$tech_row['name'],time()+60*60,"/admin/");
		setcookie("USERHASH",$cookie_hash,time()+60*60,"/admin/");
		if($action=="u")
		{
			$cookie_results_2 = mysql_query("update login set last = \"".date("Y-m-d H:i:s")."\", hash=\"".$cookie_hash."\" where USERid = \"".$tech_row["USERid"]."\" && ip = \"".$_SERVER['REMOTE_ADDR']."\" && hash = \"".$_COOKIE['USERHASH']."\"");
		}
		else if($action=="n")
		{
			$cookie_results_2 = mysql_query("insert into userlogin (ip,userid,hash,last) values(\"".$_SERVER['REMOTE_ADDR']."\",\"".$tech_row["USERid"]."\",\"".$cookie_hash."\",\"".date("Y-m-d H:i:s")."\")");
		}
	}

	$no_auth = true;
	if($_COOKIE['USERID'] && $_COOKIE['USERHASH'])
	{
		$cookie_results = mysql_query("select * from login where USERid = \"".$_COOKIE['USERID']."\" && hash = \"".$_COOKIE['USERHASH']."\" && ip =\"".$_SERVER['REMOTE_ADDR']."\"");
		if(mysql_num_rows($cookie_results) > 0)
		{
			$cookie_row = mysql_fetch_array($cookie_results);
			if((strtotime($cookie_row[last])+(60*60)) > time())
			{
				set_auth($_COOKIE['USERID'],"u");
				$no_auth =false;
			}
		}
	}
	if($_POST['username'] && $_POST['password'])
	{
		$tech_query = mysql_query("select * from tech where username = \"".$_POST['username']."\" and status != \"none\"");
		if(mysql_num_rows($tech_query) > 0)
		{
			$tech_row = mysql_fetch_array($tech_query);
			$LDAP_link = ldap_connect($LDAP_server);
			if(ldap_bind($LDAP_link,"uid=".$_POST['username'].",".$LDAP_ou.",".$LDAP_base_dn,$_POST['password']))
			{
				set_auth($tech_row['USERid'],"n");
				if(strpos($_POST['uri'],"includes") === false)
				{
					header("Location: ".$protocol.$_SERVER['HTTP_HOST'].str_replace("*AMP*","&",$_POST['uri']));
					$no_auth =false;
					exit;
				}
				else
				{
					header('Content-Type: text/xml');
					$no_auth =false;
					$out = new HtmlTemplate(dirname(__FILE__)."/../inc/login_xml.inc");
					$out -> SetParameter("CURRENT",1);
					$out -> SetParameter("URI", "http://".$_SERVER['HTTP_HOST'].str_replace("*AMP*","&",$_POST['uri']));
					$out -> CreatePage();
				}
			}
		}
	}
	mysql_close($connect);

	if($no_auth)
	{
		($_POST['uri'] != "")?$path=str_replace("*AMP*","&",$_POST['uri']):$path = $_SERVER["REQUEST_URI"];
		if(strpos($path,"includes") === false)
		{
			require_once(dirname(__FILE__)."/../includes/php/checkin_functions.php");
			require_once(dirname(__FILE__)."/../includes/php/db.php");
			require_once(dirname(__FILE__)."/../includes/php/login_functions.php");

			$page = WDN_create_page();
			WDN_add_navigation($page);

			$out = new HtmlTemplate(dirname(__FILE__)."/../inc/login_main.inc");
		}
		else
		{
			header('Content-Type: text/xml');
			$out = new HtmlTemplate(dirname(__FILE__)."/../inc/login_xml.inc");
			$out -> SetParameter("CURRENT","0");
			$out -> SetParameter("URI", $path);
			$out -> CreatePage();
		}
		exit;
	}
?>
