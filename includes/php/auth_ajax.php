<?php
	header("Cache-Control: no-cache");

	require_once("../class/HtmlTemplate.class");
	require_once("db.php");
	require_once("ldap_info.php");
	require_once("auth_functions.php");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$password = urldecode($_GET['password']);

	$page = new HtmlTemplate("../inc/xml.inc");
	$page -> SetParameter("BASE", "data");

	$error = false;

	if($_GET['username'] && $password)
	{
		$user_query = mysql_query("select * from user where username = \"".$_GET['username']."\"");
		if(mysql_num_rows($user_query) > 0)
		{
			$user_row = mysql_fetch_array($user_query);
			if(strpos($user_row['nuid'],"X") === false)
			{
				error_reporting(0);
				$LDAP_link = ldap_connect($LDAP_server);
				if(ldap_bind($LDAP_link,"uid=".$_GET['username'].",".$LDAP_ou.",".$LDAP_base_dn,$password))
				{
					set_auth($user_row['username'],"n");
				}
				else
				{
					$error = true;
					$message = "LDAP";
				}
			}
			else
			{
				if($user_row["password"] == null)
				{
					list($username,$domain) = split ("@",$_GET['username']);
					error_reporting(0);
					$LDAP_link = ldap_connect("notes.unl.edu");
					if(ldap_bind($LDAP_link,$username,$password))
					{
						set_auth($user_row['username'],"n");
					}
					else
					{
						$error = true;
						$message = "NOTES";
					}
				}
				else
				{
					if($user_row["username"] == $_GET["username"] && $user_row["password"] == md5($_GET["password"]))
					{
						set_auth($_GET['username'],"n");
					}
					else
					{
						$error = true;
						$message = "LOCAL";
					}
				}
			}
		}
		else
		{
			$error = true;
			$message = "NONESYSTEM";
		}
	}
	else
	{
		$error = true;
		$message = "NOAUTH";
	}

	if(!$error)
	{
		$page -> SetParameter("CONTENT", "<auth>true</auth>");
	}
	else
	{
		$page -> SetParameter("CONTENT", "<auth>false</auth>\r");
		$page -> AppendParameter("CONTENT", "\t<message>".$message."</message>");
	}

	mysql_close($connect);

	header('Content-Type: text/xml');
	$page -> CreatePage();
?>