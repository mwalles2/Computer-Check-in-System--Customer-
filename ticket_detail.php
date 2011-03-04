<?php
	require_once("includes/class/HtmlTemplate.class");
	require_once("includes/php/auth.php");
	
	$nav_first_section = array (array("link" => "open.php","text" => "Open Tickets"),
								array("link" => "closed.php","text" => "Closed Tickets"));

	$nav_sections = array (array("sectionlink" => "personal.php","sectiontext" => "Personal Information","sublinks" => array(array("link" => "contact.php","text" => "Contact Information"),
																							 					   array("link" => "password.php","text" => "Change Password"))));

	WDN_add_navigation($page,$nav_first_section,$nav_sections);

	$general_tab = new HtmlTemplate("includes/inc/ticket_detail/ticket_detail-general-tab.inc");
	$general_result = mysql_query("select ticket.tid, user.uid, user.name, user.nuid, ticket.indate, computer.brand, computer.serialnum, computer.type, status.status_text, ticket.cds, ticket.accounts, ticket.laptopcase, ticket.laptoppower, ticket.ethernet, ticket.problems, ticket.wireless, ticket.workingtech, ticket.backup, ticket.OutDate, ticket.untilDate, ticket.checkouttech from ticket, user, ttc, computer, status where ticket.tid='".$_GET["tid"]."' and ticket.tid=ttc.tid and ttc.compid=computer.compid and ticket.nuid=user.nuid and status.short_text = ticket.status",$connect);
//	echo "select ticket.tid, user.name, user.nuid, ticket.indate, computer.brand, computer.serialnum, computer.type, ticket.status, ticket.cds, ticket.accounts, ticket.laptopcase, ticket.laptoppower, ticket.ethernet, ticket.problems, ticket.wireless, ticket.workingtech, ticket.backup, ticket.OutDate, ticket.untilDate, ticket.checkouttech from ticket, user, ttc, computer where ticket.tid='".$_GET["tid"]."' and ticket.tid=ttc.tid and ttc.compid=computer.compid and ticket.nuid=user.nuid";

	$general_row=mysql_fetch_array($general_result);

	$general_tab -> SetParameter("NUID", $general_row['nuid']);
	$general_tab -> SetParameter("USERNOTES","");
	$general_tab -> SetParameter("FROMUSERNOTES","");
	$general_tab -> SetParameter("USERNOTEHEADERCLASS","cell bottom_border");
	$general_tab -> SetParameter("FROMUSERNOTEHEADERCLASS","cell bottom_border");

	$general_notes = mysql_query("select notes.nid, notes.cDate, notes.note, notes.nType from notes, ntt where ntt.tid='".$_GET["tid"]."' and ntt.nid=notes.nid order by notes.cDate",$connect);
	while($general_notes_row = mysql_fetch_array($general_notes))
	{
		$general_tab_note = new HtmlTemplate("includes/inc/ticket_detail/ticket_detail-general-tab-note.inc");
		$general_tab_note -> SetParameter("COUNTER",$general_notes_row['nid']);
		$general_tab_note -> SetParameter("TECH",$general_notes_row['name']);
		$general_tab_note -> SetParameter("NOTE",str_replace(array ("\n","\r"),"<br>",str_replace(array("\r\n","\n\r"),"\n",stripslashes($general_notes_row['note']))));
		$general_tab_note -> SetParameter("DATE",$general_notes_row['cDate']);
		
		if($general_notes_row["nType"]=="User")
		{
			$general_tab_note -> SetParameter("TYPE","user");
			$general_tab -> SetParameter("USERNOTEHEADERCLASS","cell");
			$general_tab -> AppendParameter("USERNOTES",$general_tab_note -> CreateHTML());
		}
		else if($general_notes_row["nType"]=="fromUser")
		{
			$general_tab_note -> SetParameter("TYPE","fromUser");
			$general_tab -> SetParameter("FROMUSERNOTEHEADERCLASS","cell");
			$general_tab -> AppendParameter("FROMUSERNOTES",$general_tab_note -> CreateHTML());
		}
		unset($general_tab_note);
	}

	if($general_row['type']=="laptop")
	{
		$general_tab_laptop = new HtmlTemplate("includes/inc/ticket_detail/ticket_detail-general-tab-laptop.inc");
		$general_tab_laptop -> SetParameter("POWERSUPPLY", ($general_row['laptoppower'])?"yes":"no");
		$general_tab_laptop -> SetParameter("CASE", ($general_row['laptopcase']!="NONE")?$general_row['laptopcase']:"no");
		$general_laptop = $general_tab_laptop -> CreateHTML();
	}
	else
	{
		$general_laptop="";
	}

	$general_accounts_i = 0;
	$accounts_javascript = "\t\taccount_ids=new Array(";
	$general_tab -> SetParameter("ACCOUNTS","");
	$general_accounts = mysql_query("select * from accounts where tid=".$general_row['tid'],$connect);
	while($general_accounts_row = mysql_fetch_array($general_accounts))
	{
		if($general_accounts_i > 0)
		{
			$accounts_javascript .= ",";
		}
		$accounts_javascript .= "'".$general_accounts_row['aid']."'";
		$general_accounts_i++;
		$general_tab_accounts = new HtmlTemplate("includes/inc/ticket_detail/ticket_detail-general-tab-accounts.inc");
		$general_tab_accounts -> SetParameter("COUNTER",$general_accounts_row['aid']);
		$general_tab_accounts -> SetParameter("USERNAME",$general_accounts_row['username']);
		$general_tab_accounts -> SetParameter("PASSWORD",$general_accounts_row['password']);

		$page -> AppendParameter("EXTRA", "\t\t\t\t\t<span id=\"accountPasswordCover".$general_accounts_row['aid']."\" class=\"password\"></span>\r");
		if($general_accounts_i == mysql_num_rows($general_accounts))
		{
			$general_tab_accounts -> SetParameter("ACCOUNT_IFBOTTOM","bottom_");
		}
		else
		{
			$general_tab_accounts -> SetParameter("ACCOUNT_IFBOTTOM","");
		}
		$general_tab -> AppendParameter("ACCOUNTS",$general_tab_accounts -> CreateHTML());
		unset($general_tab_accounts);
	}
	$accounts_javascript .= ");\n";

	$general_tab -> SetParameter("MACADDRESSES","");
	$general_macs = mysql_query("select eid,internal,wireless,mac from ethernet where tid=".$_GET['tid'],$connect);
	$general_macs_i = 0;
	while($general_macs_row = mysql_fetch_array($general_macs))
	{
		$general_macs_i++;
		$general_tab_mac = new HtmlTemplate("includes/inc/ticket_detail/ticket_detail-general-tab-mac.inc");
		$general_tab_mac -> SetParameter("COUNTER",$general_macs_row['eid']);
		$general_tab_mac -> SetParameter("ADDRESS",$general_macs_row['mac']);
		$general_tab_mac -> SetParameter("FORM",($general_macs_row['internal'])?"Internal":"External");
		$general_tab_mac -> SetParameter("TYPE",($general_macs_row['wireless'])?"Wireless":"Wired");
		if($general_macs_i == mysql_num_rows($general_macs))
		{
			$general_tab_mac -> SetParameter("MAC_IFBOTTOM","bottom_");
		}
		else
		{
			$general_tab_mac -> SetParameter("MAC_IFBOTTOM","");
		}
		$general_tab -> AppendParameter("MACADDRESSES",$general_tab_mac -> CreateHTML());
		unset($general_tab_mac);
	}

	$general_tab -> SetParameter("WORKSELECT","");
	$general_tab -> SetParameter("USERSELECT","");
	$general_tab -> SetParameter("TECHSELECT","");
	$general_tab -> SetParameter("PARTSELECT","");
	$general_tab -> SetParameter("PRICESELECT","");
	$general_tab -> SetParameter("REPAIRSELECT","");
	$general_tab -> SetParameter("DONESELECT","");
	$general_tab -> SetParameter("PICKEDUP","");
	$general_tab -> SetParameter("PICKEDUPSELECT","");
	$general_tab -> SetParameter("WORKINGTECH","");

	if($general_row['OutDate'] == "0000-00-00 00:00:00")
	{
		$status_text=$general_row['status_text'];
	}
	else
	{
		$status_text="Picked Up";
	}


//	$general_email_result = mysql_query("select contact.* from contact,contacttoticket where contacttoticket.tid = '".$general_row['tid']."' and contact.cid = contacttoticket.cid and contact.type = 'phone'");
	$general_phone_result = mysql_query("select contact.cid,contact.data from contacttoticket, contact where contacttoticket.tid = '".$general_row['tid']."' and contacttoticket.cid = contact.cid and contact.type = 'phone'");
	$general_phone = "";
	$general_javascript = "//From ticket_detail-general-tab.php\n\n";
	$general_javascript .= "\t\ttid=".$_GET['tid'].";\n\n";
	$general_javascript .= "\t\tgeneralTabPhoneId=new Array();\n";
	$general_javascript .= $accounts_javascript;
	while($general_phone_row = mysql_fetch_array($general_phone_result))
	{
		$general_javascript .= "\t\tgeneralTabPhoneId[".$general_phone_row["cid"]."]='".$general_phone_row["data"]."';\n";
		$general_phone .= $general_phone_row["data"]."<br>";
	}
	if($general_phone == "")
	{
		$general_phone = "&nbsp;";
	}

//	$general_email_result = mysql_query("select contact.* from contact,contacttoticket where contacttoticket.tid = '".$general_row['tid']."' and contact.cid = contacttoticket.cid and contact.type = 'email'");
	$general_email_result = mysql_query("select contact.cid,contact.data from contacttoticket, contact where contacttoticket.tid = '".$general_row['tid']."' and contacttoticket.cid = contact.cid and contact.type = 'email'");
	$general_email = "";
	$general_javascript .= "\t\tgeneralTabEmailId=new Array();\n";
	while($general_email_row = mysql_fetch_array($general_email_result))
	{
		$general_javascript .= "\t\tgeneralTabEmailId[".$general_email_row["cid"]."]='".$general_email_row["data"]."';\n";
		$general_email .= $general_email_row["data"]."<br>";
	}
	if($general_email == "")
	{
		$general_email = "&nbsp;";
	}

	$general_tab	-> SetParameter		("STATUS",			$status_text);
	$general_tab	-> SetParameter		("USERNAME",		$general_row['name']);
	$general_tab	-> SetParameter		("DATE",			$general_row['indate']);
	$general_tab	-> SetParameter		("PHONENUMBER",		$general_phone);
	$general_tab	-> SetParameter		("EMAILADDRESS",	$general_email);
	$general_tab	-> SetParameter		("BRAND",			$general_row['brand']);
	$general_tab	-> SetParameter		("TYPE",			typeOut($general_row['type']));
	$general_tab	-> SetParameter		("SERIALNUM",		($general_row['serialnum'] != "")?$general_row['serialnum']:"&nbsp;");
	$general_tab	-> SetParameter		("CARDETH",			($general_row['ethernet'])?"yes":"no");
	$general_tab	-> SetParameter		("CARDWIRELESS",	($general_row['wireless'])?"yes":"no");
	$general_tab	-> SetParameter		("LAPTOP",			$general_laptop);
	$general_tab	-> SetParameter		("PROBLEMS",		str_replace(array (";;","\n","\r"),"<br>",str_replace(array("\r\n","\n\r"),"\n",$general_row['problems'])));
	$general_tab	-> SetParameter		("CDS",				str_replace(array (";;","\n","\r"),"<br>",str_replace(array("\r\n","\n\r"),"\n",$general_row['cds'])));
	$general_tab	-> SetParameter		("BACKUP",			($general_row['backup'])?"yes":"no");
	$general_tab	-> SetParameter		("UNTILDATE",		date("n/j/Y",strtotime("+1 month")));
	$general_tab	-> SetParameter		("CURRENTSTAT",		($general_row['untilDate']=="0000-00-00")?$general_row['status']:"until");

//	$ticket_detail	-> AppendParameter	("CONTENT",			$general_tab -> CreateHTML());

	$page -> SetParameter("CSSSRC",		"includes/css/error.css");
	$page -> SetParameter("CSSSRC",		"includes/css/main.css");
	$page -> SetParameter("CSSSRC",		"includes/css/ticket_detail.css");
	$page -> SetParameter("SCRIPTSRC", "includes/js/general.js");
	$page -> SetParameter("SCRIPTSRC", "includes/js/xmlrequest.js");
	$page -> SetParameter("SCRIPTSRC", "includes/js/ticket_detail/ticket_detail-general.js");
	$page -> SetParameter("SCRIPTSRC", "includes/js/ticket_detail/ticket_detail-general-ajax.js");
	$page -> SetParameter("SCRIPTCODE", $general_javascript);

	mysql_close($connect);
	if($_COOKIE['UID'] == $general_row['uid'])
	{
		$page -> SetParameter ("CONTENT", $general_tab -> CreateHTML());
	}
	else
	{
		$page -> SetParameter ("CONTENT", "That ticket is not associated with your account.");
	}
	$page -> SetParameter("TID", $_GET['tid']);
	$page -> SetParameter("TITLE", "Ticket Details");
	$page -> CreatePage();
?>