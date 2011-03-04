	function xmlInit()
	{
		var log=document.getElementById("log");
		data=req.responseXML.getElementsByTagName("data");
		reset=getElementTextNS("", "reset", data[0], 0);

		document.mainForm.current_password.focus();
		document.mainForm.current_password.value = "";
		document.mainForm.password.value = "";
		document.mainForm.verify.value = "";

		if(reset=="true")
		{
			var message="Your password has been reset";
			var error=false;
		}
		else
		{
			var message="There was an error resetting your password.  Please try again.  If you continue to have this issues please contact the UNL Computer Help Center.";
			var error=true;
		}
		showMessage(message, error, "message")
	}

	function passwordReset()
	{
		hideMessage("message");
		if(document.mainForm.password.value == document.mainForm.verify.value && document.mainForm.current_password.value != "" && document.mainForm.password.value != "")
		{
			submitReset();
		}
		else
		{
			if(document.mainForm.current_password.value == "")
			{
				var outText="Curret password was left blank";
			}
			else if(document.mainForm.password.value == "" && document.mainForm.password.value == document.mainForm.verify.value)
			{
				var outText="Curret password was left blank";
			}
			else
			{
				var outText="New password and verify do not match";
			}
			showMessage(outText, true, "message");
		}
	}