<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
<!--
    Membership and regular participation in the UNL Web Developer Network
    is required to use the UNL templates. Visit the WDN site at 
    http://wdn.unl.edu/. Click the WDN Registry link to log in and
    register your unl.edu site.
    All UNL template code is the property of the UNL Web Developer Network.
    The code seen in a source code view is not, and may not be used as, a 
    template. You may not use this code, a reverse-engineered version of 
    this code, or its associated visual presentation in whole or in part to
    create a derivative work.
    This message may not be removed from any pages based on the UNL site template.
    
    $Id: php.secure.dwt.php 566 2009-07-28 21:06:59Z bbieber2 $
-->
<link rel="stylesheet" type="text/css" media="screen" href="/wdn/templates_3.0/css/all.css" />
<link rel="stylesheet" type="text/css" media="print" href="/wdn/templates_3.0/css/print.css" />
<script type="text/javascript" src="/wdn/templates_3.0/scripts/all.js"></script>
{WEBDEVHEADERS}
<!-- TemplateBeginEditable name="doctitle" -->
<title>UNL | {DEPARTMENT} | {TITLE}</title>
<!-- TemplateEndEditable --><!-- TemplateBeginEditable name="head" -->
<!-- Place optional header elements here -->
<link rel="stylesheet" href="/includes/css/main-style.css" type="text/css" />
<link rel="stylesheet" href="includes/css/main-ajax.css" type="text/css" />
{CSS}<script src="includes/js/ajax-fade.js" type="text/javascript"></script>
{JAVASCRIPT}<!-- TemplateEndEditable -->
</head>
<body class="secure fixed"{BODYOPTIONS}>
<p class="skipnav"> <a class="skipnav" href="#maincontent">Skip Navigation</a> </p>
<div id="wdn_wrapper">
    <div id="header"> <a href="http://www.unl.edu/" title="UNL website"><img src="/wdn/templates_3.0/images/logo.png" alt="UNL graphic identifier" id="logo" /></a>
        <h1>University of Nebraska&ndash;Lincoln</h1>
        <div id="wdn_identity_management"> <!-- TemplateBeginEditable name="identitymanagement" --><a style="{LOGOUTON}" href="{PROTOCOL}{SERVER}/includes/php/auth.php?logout=true">Logout</a><!-- TemplateEndEditable --> </div>
    </div>
    <div id="wdn_navigation_bar">
        <div id="breadcrumbs">
            <!-- WDN: see glossary item 'breadcrumbs' -->
            <!-- TemplateBeginEditable name="breadcrumbs" -->
            <ul>
                <li><a href="http://www.unl.edu/" title="University of Nebraska&ndash;Lincoln">UNL</a></li>
                <li>{DEPARTMENT}</li>
            </ul>
            <!-- TemplateEndEditable --></div>
        <div id="wdn_navigation_wrapper">
            <div id="navigation"><!-- TemplateBeginEditable name="navlinks" -->
{NAVIGATION}
                <!-- TemplateEndEditable --></div>
        </div>
    </div>
    <div id="wdn_content_wrapper">
        <div id="titlegraphic"><!-- TemplateBeginEditable name="titlegraphic" -->
            <h1>{DEPARTMENT}</h1>
            <!-- TemplateEndEditable --></div>
        <div id="pagetitle"><!-- TemplateBeginEditable name="pagetitle" -->{PAGETITLE}<!-- TemplateEndEditable --></div>
        <div id="maincontent">
            <!--THIS IS THE MAIN CONTENT AREA; WDN: see glossary item 'main content area' -->
            <!-- TemplateBeginEditable name="maincontentarea" -->
	<div id="shadow" class="shadow">&nbsp;</div>
	<div id="updating">Updating . . .</div>
	<div id="saved">Update Saved . . .</div>
	<div id="failed">Update Failed . . .</div>
		<div class="four_col">
{CONTENT}	</div>
<div id="log" style="display:none;"></div>
            <!-- TemplateEndEditable -->
            <div class="clear"></div>
{NOSCRIPT}
            <!--THIS IS THE END OF THE MAIN CONTENT AREA.-->
        </div>
        <div id="footer">
            <div id="footer_floater"></div>
            <div id="wdn_copyright"><!-- TemplateBeginEditable name="footercontent" -->
{FOOTER}
                <!-- TemplateEndEditable -->
{WDNFOOTER}
                | <a href="http://validator.unl.edu/check/referer">W3C</a> | <a href="http://jigsaw.w3.org/css-validator/check/referer?profile=css3">CSS</a> <a href="http://www.unl.edu/" title="UNL Home" id="wdn_unl_wordmark"><img src="/wdn/templates_3.0/css/footer/images/wordmark.png" alt="UNL's wordmark" /></a> </div>
        </div>
    </div>
    <div id="wdn_wrapper_footer"> </div>
</div>
<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
try {
var pageTracker = _gat._getTracker("UA-12077585-1");
pageTracker._trackPageview();
} catch(err) {}</script>
</body>
</html>
