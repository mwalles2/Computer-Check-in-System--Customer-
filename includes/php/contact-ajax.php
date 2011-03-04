<?php
	header("Cache-Control: no-cache");

	require_once("../class/HtmlTemplate.class");
	require_once("db.php");
	require_once("ldap_info.php");

	$connect = mysql_connect($DB_server,$DB_user,$DB_password);
	mysql_select_db($DB_database, $connect);
	switch($_GET["action"])
	{
		case "location":
			$query = "update contact set location = ".mysql_real_escape_string($_GET["locid"])." where cid = ".mysql_real_escape_string($_GET["cid"]);
			break;
		case "service":
			$query = "update contact set service = ".mysql_real_escape_string($_GET["csid"]).",contactme=0 where cid = ".mysql_real_escape_string($_GET["cid"]);
			break;
		case "active":
			$query = "update contact set active = ".mysql_real_escape_string($_GET["active"])." where cid = ".mysql_real_escape_string($_GET["cid"]);
			break;
		case "contactme":
			$query = "update contact set contactme = ".mysql_real_escape_string($_GET["contactme"])." where cid = ".mysql_real_escape_string($_GET["cid"]);
			break;
		case "cancel":
			$query = "update contact set nuid = '' where cid = ".mysql_real_escape_string($_GET["cid"]);
			break;
		case "add":
			$query = "update contact set data = '".mysql_real_escape_string($_GET["data"])."'";
			if($_GET["service"] == "true")
			{
				$query .= ", service = ".mysql_real_escape_string($_GET["csid"]);
			}
			$query .= " where cid = ".mysql_real_escape_string($_GET["cid"]);
			break;
		case "new":
			$query = "insert into contact (type, nuid, service) select '".mysql_real_escape_string($_GET['type'])."', user.nuid,contact_services.name from user,contact_services where user.uid='".mysql_real_escape_string($_COOKIE['UID'])."' and contact_services.display_order=1";
			break;
	}
	$results = mysql_query($query);
	$error = mysql_errno();
	$error_text = "error ".$error.": ".mysql_error();

	$main_mysql_xml = "\t<mysql>\r\t\t<query>".$query."</query>\r\t\t<error>".$error_text."</error>\r\t</mysql>";

	$page = new HtmlTemplate("../inc/xml.inc");
	$page -> SetParameter("BASE", "data");

	($error)?$page -> SetParameter("CONTENT","<false />\r"):$page -> SetParameter("CONTENT","<true />\r");
	if($_GET["action"] == "new")
	{
		$page -> AppendParameter("CONTENT","\t<cid>".mysql_insert_id()."</cid>\r");
		$page -> AppendParameter("CONTENT","\t<type>".$_GET['type']."</type>\r");
		$service_xml = "";
		if($_GET['type'] == "other")
		{
			$service_query="select csid, name  from contact_services where active=1 order by display_order";
			$service_results=mysql_query($service_query);
			$service_error_text = "error ".mysql_errno().": ".mysql_error();
			$service_mysql_xml = "\r\t<mysql>\r\t\t<query>".$service_query."</query>\r\t\t<error>".$service_error_text."</error>\r\t</mysql>";
			$page -> AppendParameter("CONTENT","\t<services>\r");
			while($service = mysql_fetch_array($service_results))
			{
				$page -> AppendParameter("CONTENT","\t\t<service csid=\"".$service["csid"]."\">".$service["name"]."</service>\r");
			}
			$page -> AppendParameter("CONTENT","\t</services>\r");
		}
		$location_query="select clid, name  from contact_locations where active=1 order by display_order";
		$location_results=mysql_query($location_query);
		$location_error_text = "error ".mysql_errno().": ".mysql_error();
		$location_mysql_xml = "\r\t<mysql>\r\t\t<query>".$location_query."</query>\r\t\t<error>".$location_error_text."</error>\r\t</mysql>";
		$page -> AppendParameter("CONTENT","\t<locations>\r");
		while($location = mysql_fetch_array($location_results))
		{
			$page -> AppendParameter("CONTENT","\t\t<location clid=\"".$location["clid"]."\">".$location["name"]."</location>\r");
		}
		$page -> AppendParameter("CONTENT","\t</locations>\r");
	}
	else
	{
		$page -> AppendParameter("CONTENT","\t<cid>".$_GET["cid"]."</cid>\r");
	}

	if($_GET["action"]=="service")
	{
		$serviceQuery = mysql_query("select contact_services.autocontact from contact_services,contact where contact.cid = ".$_GET["cid"]." and contact.service = contact_services.csid");
		$serviceResults = mysql_fetch_array($serviceQuery);
		$page -> AppendParameter("CONTENT","\t<autoContact>".$serviceResults["autocontact"]."</autoContact>\r");
	}

	$page -> AppendParameter("CONTENT",$main_mysql_xml.$service_mysql_xml.$location_mysql_xml);

	mysql_close($connect);

	header('Content-Type: text/xml');
	$page -> CreatePage();
?>