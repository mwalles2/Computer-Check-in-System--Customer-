<?php
	$WDN_base_path = $_SERVER['DOCUMENT_ROOT'];

	function WDN_create_page($connect)
	{
		global $WDN_base_path;
		global $CONFIG;
		$base_path = $_SERVER['DOCUMENT_ROOT'];

		$page = new HtmlTemplate($base_path."/includes/inc/main/unl_wdn_v3_main_secure.inc");
		$page -> SetParameter("WEBDEVHEADERS", implode('',file($base_path.'/wdn/templates_3.0/includes/browserspecifics.html')));
		$page -> AppendParameter("WEBDEVHEADERS", implode('',file($base_path.'/wdn/templates_3.0/includes/metanfavico.html')));

		$page -> SetParameter("NOSCRIPT", implode('',file($base_path.'/wdn/templates_3.0/includes/noscript.html')));
		$page -> SetParameter("FOOTER", implode('',file($base_path.'/includes/html/wdn_v3/footer.html')));
		$page -> SetParameter("WDNFOOTER", implode('',file($base_path.'/wdn/templates_3.0/includes/wdn.html')));

		$page -> SetParameter("DEPARTMENT", "Computer Help Center");
		$page -> SetParameter("PAGETITLE", "Check-in System");

		$page -> SetParameter("SCRIPTCODE",	"var protocol=\"".$CONFIG['site_protocol']."\";\r\t\tvar server=\"".$CONFIG['user_site_address']."\";");

		return $page;
	}
	function WDN_add_navigation($page,$first_group = "",$rest_navigation = "")
	{
		global $CONFIG;
		global $WDN_base_path;
		$content = "";

		$navigation = new HtmlTemplate($WDN_base_path."/includes/inc/main/navigation.inc");
		
		if(is_array($first_group))
		{
			$group1 .= WDN_create_navigation_links($first_group);
		}
		else
		{
			$group1 .= $first_group;
		}

		if(is_array($rest_navigation))
		{
			$group2 = "";
			foreach($rest_navigation as $section)
			{
				$group2 .= "\t\t\t\t\t\t<li><a href=\"".$section["sectionlink"]."\">".$section["sectiontext"]."</a>";
				if(isset($section["sublinks"]))
				{
					$group2 .= WDN_create_navigation_links($section["sublinks"]);
				}
				$group2 .= "\t\t\t\t\t\t</li>\r";
			}
		}
		else
		{
			$content .= $rest_navigation;
		}

		$navigation -> SetParameter("NAVIGATION", $group1.$group2);

		$page -> SetParameter("NAVIGATION", $navigation -> CreateHTML());
		$page -> SetParameter("PROTOCOL", $CONFIG["site_protocol"]);
		$page -> SetParameter("SERVER", $CONFIG["user_site_address"]);
	}

	function WDN_create_navigation_links($items)
	{
		global $WDN_base_path;
		$out_links = "";
		foreach($items as $item)
		{
			$out_links .= "\t\t\t\t\t\t\t<li";
			if($out_links == "\t\t\t\t\t\t\t<li")
			{
				$out_links .= " class=\"first\"";
			}
			$out_links .= "><a href=\"".$item["link"]."\">".$item["text"]."</a></li>\r";
		}
		return "\r\t\t\t\t\t\t<ul>\r".$out_links."\t\t\t\t\t\t</ul>\r\t\t\t\t\t";
	}
?>
