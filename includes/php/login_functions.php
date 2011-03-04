<?php
	function create_login_form($page,$uri,$connect)
	{
		$page -> SetParameter("TITLE", "Computer Help Center - Check-in");
		$page -> SetParameter("BODYOPTIONS", "");

		$page -> SetParameter("CSSSRC",		"includes/css/error.css");
		$page -> SetParameter("CSSSRC",		"includes/css/main.css");
		$page -> SetParameter("SCRIPTSRC",	"includes/js/xmlrequest.js");
		$page -> SetParameter("SCRIPTSRC",	"includes/js/index.js");
		$page -> SetParameter("SCRIPTSRC",	"includes/js/general.js");

		$content = new HtmlTemplate("includes/inc/index.inc");
		$content -> SetParameter("CURRENTNOTDONE", flowerDayNumber($connect));
		$content -> SetParameter("DONETHISWEEK", doneThisWeek($connect));
		$content -> SetParameter("URI", $uri);
		return $content;
	}
?>