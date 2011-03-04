	selected=new Array();

	function xmlInit()
	{
		alert("test");
		//alert("xmlinit")
		log = document.getElementById("log");	//log.innerHTML+="xmlInit()<br>\n";

		person=req.responseXML.getElementsByTagName("person");

		if(getElementTextNS("","error",person[0],0)=="failed")
		{
			error("Login failed.  Username, password, or NUID incorrect.");
			//alert ("Failed Login");
		}
		else if (getElementTextNS("","error",person[0],0)=="ldap")
		{
			error("Please login using your LDAP (My.UNL) account information.");
			//alert ("LDAP ERROR");
		}
		else if (getElementTextNS("","uid",person[0],0)!="n/a")
		{
			//alert(getElementTextNS("","computerin",person[0],0));
			window.location="welcome.php";
		}
	}

	function error($msg)
	{
		//alert("error");
		errorDiv=document.getElementById("error");
		errorDiv.innerHTML=$msg;
		errorDiv.style.display="block";
		document.login.username.value="";
		document.login.password.value="";
		document.login.username.blur();
		document.login.password.blur();
	}

	function login()
	{
		//alert("includes/php/index_xml.php?username="+document.login.username.value+"&password="+document.login.password.value);
		loadXMLDoc("includes/php/index_xml.php?username="+document.login.username.value+"&password="+document.login.password.value);
	}