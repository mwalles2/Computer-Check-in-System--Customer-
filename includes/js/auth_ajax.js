	function tryAuth()
	{
		xmlInit=xmlInitAuth;
		//alert(protocol+server+"/includes/php/auth_ajax.php?action=change&username="+document.login.username.value+"&password="+encodeURIComponent(document.login.password.value));
		loadXMLDoc(protocol+server+"/includes/php/auth_ajax.php?action=change&username="+document.login.username.value+"&password="+encodeURIComponent(document.login.password.value));
	}
	
	function resetPassword()
	{
		xmlInit=xmlInitPassword;
		if(document.login.username.value!="")
		{
			//alert(protocol+server+"/includes/php/password_reset_ajax.php?action=reset&username="+document.login.username.value);
			loadXMLDoc(protocol+server+"/includes/php/password_reset_ajax.php?action=reset&username="+document.login.username.value);
		}
		else
		{
			showMessage("Please make sure that your username is entered below.", true, "error");
			document.login.username.focus();
		}
	}