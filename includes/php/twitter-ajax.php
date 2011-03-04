<?php
	require_once("class.twitter.php");
	require_once("db.php");
	require_once("../class/HtmlTemplate.class");

	$twitter = new Twitter("unlchc","weneed10","xml");
	$rate_limit = $twitter -> ratelimit();

	$page = new HtmlTemplate("../inc/xml.inc");
	$page -> SetParameter("BASE", "data");

	switch($_GET["action"])
	{
		case "twitterValidate":
			if($rate_limit->{'remaining-hits'} > 0)
			{
				$validate_results = $twitter -> showUser(false, false, false, $_GET["twitterId"]);
				if(!$validate_results)
				{
					$content = "<error>notvalid</error>\n";
				}
				else
				{
					$content = "<true />\n";
				}
			}
			else
			{
				$content = "<error>ratelimit</error>\n";
			}
			$content .= "\t<twitterId>" . $_GET["twitterId"] . "</twitterId>";
			break;
		case "checkfollow":
			
			break;
		case "follow":
			$cid = mysql_real_escape_string($_GET["cid"]);
			$connect = mysql_connect($DB_server,$DB_user,$DB_password);
			mysql_select_db($DB_database, $connect);

			$twitterId_query = mysql_query("select * from contact where cid = " . $cid);
			$twiterId_result = mysql_fetch_array($twitterId_query);
			$twitterId = $twiterId_result["data"];

			$follow = $twitter -> isFriend($twitterId);
			$content = "<following>" . $follow->target->following . "</following>\n";

			$twiter_service_query = mysql_query("select * from contact_services_verify where cid = " . $cid);

			$active = $follow->target->following;
			if(mysql_num_rows($twiter_service_query) == 0)
			{
				mysql_query("insert contact_services_verify (csid,cid,verify) values (" . $twiterId_result["service"] . ", " . $cid . ", " . $active . ")");
			}
			else
			{
				mysql_query("update contact_services_verify set verify=" . $active . " where cid=" . $cid);
			}

			if($follow->target->followed_by == "false")
			{
				$twitter -> followUser($_GET["twitterId"], true);
			}

			$content .= "\t<cid>" . $cid . "</cid>";

			mysql_close($connect);
			break;
	}

	$page -> AppendParameter("CONTENT",$content);

	header('Content-Type: text/xml');
	$page -> CreatePage();
?>