	function submitReset()
	{		
		//alert(protocol+server+"/includes/php/password_reset_ajax.php?action=change&current_password="+encodeURIComponent(document.mainForm.current_password.value)+"&password="+encodeURIComponent(document.mainForm.password.value)+"&verify="+encodeURIComponent(document.mainForm.verify.value));
		loadXMLDoc(protocol+server+"/includes/php/password_reset_ajax.php?action=change&current_password="+encodeURIComponent(document.mainForm.current_password.value)+"&password="+encodeURIComponent(document.mainForm.password.value)+"&verify="+encodeURIComponent(document.mainForm.verify.value));
	}