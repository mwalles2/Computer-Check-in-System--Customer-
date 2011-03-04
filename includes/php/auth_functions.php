<?php
	function set_auth($userid,$action)
	{
		$user_query = mysql_query("select * from user where username = \"".$userid."\"");

		$user_row = mysql_fetch_array($user_query);

		$cookie_hash = md5($user_row['username'].$_SERVER['REMOTE_ADDR'].time().rand());

		setcookie("USERID",$userid,time()+60*60,"/");
		setcookie("USERNAME",$user_row['Name'],time()+60*60,"/");
		setcookie("USERHASH",$cookie_hash,time()+60*60,"/");
		setcookie("UID",$user_row['UID'],time()+60*60,"/");
		setcookie("USERLOGIN","TRUE",0,"/");

		if($action=="u")
		{
			$cookie_results_2 = mysql_query("update userlogin set last = \"".date("Y-m-d H:i:s")."\", hash=\"".$cookie_hash."\" where USERid = \"".$user_row['UID']."\" && ip = \"".$_SERVER['REMOTE_ADDR']."\" && hash = \"".$_COOKIE['USERHASH']."\"");
		}
		else if($action=="n")
		{
			$cookie_results_2 = mysql_query("insert into userlogin (ip,userid,hash,last) values(\"".$_SERVER['REMOTE_ADDR']."\",\"".$user_row['UID']."\",\"".$cookie_hash."\",\"".date("Y-m-d H:i:s")."\")");
		}
	}
?>