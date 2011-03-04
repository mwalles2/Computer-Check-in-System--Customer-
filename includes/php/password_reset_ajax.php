<?php
	require_once("../class/HtmlTemplate.class");
	require_once("db.php");
	require_once("password_reset_functions.php");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);

	$page = new HtmlTemplate("../inc/xml.inc");
	$page -> SetParameter("BASE", "data");

	$error = false;


	switch($_GET['action'])
	{
		case "change":
			$user_query = mysql_query("select * from user where uid = ".$_COOKIE['UID']);
			$user_results = mysql_fetch_array($user_query);
			if($user_results['password'] == md5($_GET['current_password']) && $_GET['password'] == $_GET['verify'])
			{
				$uid = $_COOKIE['UID'];
				$new_password = urldecode($_GET['password']);
			}
			else
			{
				$error = true;
				//echo "password error 1";
			}
			break;
		case "reset":
			$user_query = mysql_query("select * from user where username = '".$_GET['username']."'");
			$user_results = mysql_fetch_array($user_query);
			if(mysql_num_rows($user_query) && $user_results['password']!="NULL")
			{
				$uid = $user_results['UID'];
				$new_password = random_password();
			}
			else
			{
				$error=true;
			}
			break;
		default:
			$error = true;
			//echo "password error 2";
	}

	if(!$error)
	{
		$password_update_query = mysql_query("update user set password = '".md5($new_password)."' where uid = '".$uid."'");
		if(mysql_errno() > 0 || mysql_affected_rows() == 0)
		{
			$error = true;
			//echo "mysql error";
		}
	}

	if(!$error)
	{
		$headers = "From: UNL Computer Help Center <ischc@unl.edu>";
		if($_GET['action'] == "reset")
		{
			$message = "This message has been sent to you because someone has requested that your password be reset on https://mychc.unl.edu/.\r\r";
			$message .= "The password has been reset to: ".$new_password."\r\r";
			$message .= "If you have any questions of concernes please contact the Computer Help Center at 402-472-3970 or ischc@unl.edu";
		}
		else
		{
			$message = "This message has being sent to you becasue password has been successfully changed on https://mychc.unl.edu.\r\r";
			$message .= "If you have any questions of concernes please contact the Computer Help Center at 402-472-3970 or ischc@unl.edu";
		}
		mail($user_results['username'],"Password Reset",$message, $headers);
		$reset_value = "true";
	}
	else
	{
		$reset_value = "false";
	}

	mysql_close($connect);
	$page -> SetParameter("CONTENT", "<reset>".$reset_value."</reset>");

	header('Content-Type: text/xml');
	$page -> CreatePage();
?>