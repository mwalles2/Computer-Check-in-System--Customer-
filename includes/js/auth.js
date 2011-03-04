	function xmlInitAuth()
	{
		//alert ("test");
		var log=document.getElementById("log");
		data=req.responseXML.getElementsByTagName("data");
		auth=getElementTextNS("", "auth", data[0], 0);
		if(auth=="true")
		{
			window.location=window.location;
		}
		else
		{
			message=getElementTextNS("", "message", data[0], 0);
			document.login.password.value="";
			document.login.password.focus();
			message=getElementTextNS("", "message", data[0], 0);
			baseError = "There was an error with your login:<br />Your username or password was incorrect."
			switch(message)
			{
				case "LOCAL":
					outText=baseError+"<br />If you need to reset your password please <a href='javascript:resetPassword()'>click here</a>";
					break;
				case "LDAP":
				case "NOTES":
				case "NONESYSTEM":
					outText=baseError;
					break;
				case "NOAUTH":
					outText=baseError+"no username or password";
					break;
				default:
					outText=baseError+"Error";
			}
			showMessage(outText, error, "error");
		}
	}

	function xmlInitPassword()
	{
		var log=document.getElementById("log");
		data=req.responseXML.getElementsByTagName("data");
		reset=getElementTextNS("", "reset", data[0], 0);
		if(reset=="true")
		{
			error=false;
			message="Your password has been sent to your email address";
		}
		else
		{
			error=true;
			message="There was an issue with changing your password.<br />Please contact the Computer Help Center at 402-472-3970 or <a href='mailto:ischc@unl.edu'>ischc@unl.edu</a>";
		}
		showMessage(message, error, "error");
	}