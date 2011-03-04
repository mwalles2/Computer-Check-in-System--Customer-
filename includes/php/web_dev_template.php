<?php
	$WDN_base_path = $_SERVER['DOCUMENT_ROOT'];

	function WDN_create_page()
	{
		global $WDN_base_path;
		global $CONFIG;
		$base_path = $_SERVER['DOCUMENT_ROOT'];

		$page = new HtmlTemplate(dirname(__FILE__)."/../inc/main/unl_s2.inc");
		$page -> SetParameter("WEBDEVHEADERS", implode('',file($WDN_base_path.'/ucomm/templatedependents/templatesharedcode/includes/browsersniffers/ie.html')));
		$page -> AppendParameter("WEBDEVHEADERS", implode('',file($WDN_base_path.'/ucomm/templatedependents/templatesharedcode/includes/comments/developersnote.html')));
		$page -> AppendParameter("WEBDEVHEADERS", implode('',file($WDN_base_path.'/ucomm/templatedependents/templatesharedcode/includes/metanfavico/metanfavico.html')));

		$page -> SetParameter("HEADER", implode('',file($WDN_base_path.'/ucomm/templatedependents/templatesharedcode/includes/siteheader/siteheader_secure.shtml')));
		$page -> SetParameter("BADGE", implode('',file($WDN_base_path.'/ucomm/templatedependents/templatesharedcode/includes/badges/secure.html')));
		$page -> SetParameter("FOOTER", implode('',file(dirname(__FILE__).'/../inc/main/footer.inc')));
		$page -> SetParameter("EXTRA", "");

		$page -> SetParameter("SCRIPTCODE",	"var protocol=\"".$CONFIG['site_protocol']."\";\r\t\tvar server=\"".$CONFIG['user_site_address']."\";");

		return $page;
	}

	function WDN_add_navigation($page,$first_group = "",$rest_navigation = "")
	{
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
