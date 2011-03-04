<?php
	require_once("includes/php/auth.php");

	$nav_first_section = array (array("link" => "open.php","text" => "Open Tickets"),
								array("link" => "closed.php","text" => "Closed Tickets"));

	$nav_sections = array (array("sectionlink" => "personal.php","sectiontext" => "Personal Information","sublinks" => array(array("link" => "contact.php","text" => "Contact Information"),
																							 					   array("link" => "password.php","text" => "Change Password"))));

	WDN_add_navigation($page,$nav_first_section,$nav_sections);

	$page -> SetParameter("TITLE", "Contact Information");
	$page -> SetParameter("BODYOPTIONS", "");

	$page -> SetParameter("CSSSRC",		"includes/css/error.css");
	$page -> SetParameter("CSSSRC",		"includes/css/main.css");
	$page -> SetParameter("CSSSRC",		"includes/css/contact.css");

	$page -> SetParameter("SCRIPTSRC",	"includes/js/general.js");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/xmlrequest.js");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/contact/contact.js");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/contact/contact-ajax.js");
	$page -> SetParameter("SCRIPTSRC",	"includes/js/validate.js");

	$container = new HtmlTemplate("includes/inc/contact/contact.inc");

	$content = "";
	//$content = new HtmlTemplate("includes/inc/contact.inc");
	$contact_types = array("Phone","EMail","Other");

	$location_array = array("---");
	$location_value_array = array("");

	$services_array = array();
	$services_value_array = array();

	$contact_verify_query = mysql_query("select contact.cid, contact_services.name from user, contact, contact_services_verify, contact_services where contact.active = 1 and user.uid = " . mysql_real_escape_string($_COOKIE["UID"]) . " and user.nuid=contact.nuid and contact.cid = contact_services_verify.cid and contact_services_verify.csid = contact_services.csid and contact_services_verify.verify=0 and contact_services.autocontact = 1");
	if(mysql_num_rows($contact_verify_query)>0)
	{
		$page -> SetParameter("SCRIPTCODE",	"var verifyContacts=new Array();");
		$i = 0;
		while($contact_verify_result = mysql_fetch_array($contact_verify_query))
		{
			$page -> SetParameter("SCRIPTCODE",	"verifyContacts[" . $i . "]=" . $contact_verify_result["cid"] . ";");
			$i++;
		}
		$page -> SetParameter("SCRIPTCODE", "if (\"onpagehide\" in window) {
			window.addEventListener(\"pageshow\", onLoadAutoCheckContacts, false);
		}
		else
		{
			window.addEventListener(\"load\", onLoadAutoCheckContacts, false);
		}");
	}

	$contact_location_results = mysql_query("select * from contact_locations where active = true order by display_order");
	while($contact_location_array = mysql_fetch_array($contact_location_results))
	{
		$location_array[] = $contact_location_array["name"];
		$location_value_array[] = $contact_location_array["clid"];
	}

	$contact_services_results = mysql_query("select * from contact_services where active = true order by display_order");
	while($contact_services_array = mysql_fetch_array($contact_services_results))
	{
		$services_array[] = $contact_services_array["name"];
		$services_value_array[] = $contact_services_array["csid"];
	}

	foreach($contact_types as $contact_type)
	{
		$shortname = strtolower($contact_type);
		($_GET["alt"] == "true")?$header_file="includes/inc/contact/contact-header-alt.inc":$header_file="includes/inc/contact/contact-header.inc";
		$content_section_header = new HtmlTemplate($header_file);
		$content_section_header -> SetParameter("NAME", $contact_type);
		$content_section_header -> SetParameter("SHORTNAME", $shortname);
		
		$where = "contact.type = '".$shortname."'";

		$contact_results = mysql_query("select contact.cid, contact.active, contact.data, contact.location, contact.service, contact.contactme from contact,user where user.uid= ".$_COOKIE['UID']." and user.nuid=contact.nuid and ".$where);
		$content_section_header -> SetParameter("CONTACTS", "");
		while($contact_array = mysql_fetch_array($contact_results))
		{
			($contact_array['data']=="")?$need_data_input = true:$need_data_input = false;
			($_GET["alt"] == "true")?$row_file="includes/inc/contact/contact-row-alt.inc":$row_file="includes/inc/contact/contact-row.inc";
			$contact_row = new HtmlTemplate($row_file);
			$contact_row -> SetParameter("CID", $contact_array['cid']);
			$contact_row -> SetParameter("ACTIVE", ($contact_array['active'])?" checked=\"checked\"":"");
			$contact_row -> SetParameter("DATA", $contact_array['data']);
			$contact_row -> SetParameter("TYPE", strtolower($contact_type));

			($contact_array['contactme'])?$checkbox_options = " checked=\"checked\"":$checkbox_options = "";
			($contact_array['active'])?$checkbox_options .= "":$checkbox_options .= " disabled=\"disabled\"";
			$contact_row -> SetParameter("CONTACTME", $checkbox_options);

			$selectedIndex = array_search($contact_array["location"],$location_value_array);
			if($selectedIndex === false)
			{
				$selectedIndex = 0;
			}
			$contact_row -> CreateSelect(array("varible" => "LOCATIONSELECT","items" => $location_array,"optionItems" => $location_value_array,"tabs" => 6,"selectedIndex" => $selectedIndex,"attributes" => array("name" =>"contactLocation".$contact_array["cid"],"onchange" => "locationUpdate(this,'".$contact_array["cid"]."')")));

			($need_data_input)?$contact_row -> SetParameter("DATAINPUT", ""):$contact_row -> SetParameter("DATAINPUT", "display:none;");
			if($need_data_input && $contact_type == "Other")
			{
				$contact_row -> SetParameter("DATAWIDTH","12");
				$selectedIndex = array_search($contact_array["service"],$services_value_array);
				if($selectedIndex === false)
				{
					$selectedIndex = 0;
				}
				$contact_row -> CreateSelect(array("varible" => "SERVICESELECT","items" => $services_array,"optionItems" => $services_value_array,"tabs" => 6,"selectedIndex" => $selectedIndex,"attributes" => array("name" =>"contactService".$contact_array["cid"])));
				$contact_row -> SetParameter("SERVICESELECTSHOW","");
				$contact_row -> SetParameter("SERVICENAME", "");
				$contact_row -> SetParameter("SERVICESHOW"," display:none;");
				$contact_row -> SetParameter("SERVICENAMESTYLE", "display:none;");
			}
			else
			{
				$service_name = $services_array[array_search($contact_array["service"],$services_value_array)];
				$contact_row -> SetParameter("DATAWIDTH","25");
				$contact_row -> SetParameter("SERVICESELECTSHOW", "");
				$contact_row -> SetParameter("SERVICESELECT", "");
				if($contact_type == "Other")
				{
					$contact_row -> SetParameter("SERVICENAMESTYLE", "");
					$contact_row -> SetParameter("SERVICENAME", "(" . $service_name . ")");
				}
				else
				{
					$contact_row -> SetParameter("SERVICENAMESTYLE", "display:none;");
					$contact_row -> SetParameter("SERVICENAME", "");
				}
				($contact_type == "EMail" || ($contact_type == "Other" && $service_name == "Twitter"))?$service_style = "":$service_style = " display:none;";
				($contact_array["active"])?$service_style .= "":$service_style .= " color:#AAA;";
				$contact_row -> SetParameter("SERVICESHOW", $service_style);
			}
			$content_section_header -> AppendParameter("CONTACTS", $contact_row -> CreateHTML());
		}
		$content .= $content_section_header -> CreateHTML();
	}

	$container -> CreateSelect(array("varible" => "SERVICESELECTERROR","items" => $services_array,"optionItems" => $services_value_array,"tabs" => 5,"attributes" => array("name" =>"serviceErrorSelect")));
	$container -> SetParameter("CONTENT" , $content);
	$page -> SetParameter("CONTENT", $container -> CreateHTML());
	$page -> CreatePage();
?>
