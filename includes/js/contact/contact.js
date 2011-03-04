	var twitterResponse=false;
	var twitterResponseAvailable=false;
	var twitterResponseTimeout;

	function showHideServiceContact(show, item)
	{
		(show==1)?hideShow="block":hideShow="none";
		serviceContactRow=document.getElementById("serviceContactRow"+item);
		serviceContactRow.style.display=hideShow;
		eval("document.mainForm.serviceContact"+item+".checked=false");
	}

	function checkData(cid, type)
	{
		eval("data=document.mainForm.dataTextBox"+cid);
		needsValidate=true;
		switch(type)
		{
			case "phone":
				validateType=validatePhone;
				errorDiv="phoneError";
				document.errorForm.errorPhone.value=data.value;
				break;
			case "email":
				validateType=validateEmail;
				errorDiv="emailError";
				document.errorForm.errorEmail.value=data.value;
				break;
			case "other":
				eval("service=document.mainForm.contactService"+cid+"[document.mainForm.contactService"+cid+".selectedIndex].text");
				eval("serviceId=document.mainForm.contactService"+cid+"[document.mainForm.contactService"+cid+".selectedIndex].value");
//alert(service);
				if(service=="Twitter")
				{
					validateType=validateTwitter;
					errorDiv="twitterError";
					document.errorForm.errorTwitter.value=data.value;
					eval("document.errorForm.serviceErrorSelect.selectedIndex=document.mainForm.contactService"+cid+".selectedIndex")
				}
				else
				{
//alert ("else");
					needsValidate=false;
				}
				break;
		}

		document.errorForm.cid.value=cid;

		if(!needsValidate)
		{
//alert("not Validate");
			updateOtherInterface(service,cid);
			serviceUpdate(serviceId,cid);
			saveData(cid,data.value);
		}
		else
		{
//alert("Validate");
			validateType(data,errorDiv);
		}
	}

	function endError(type)
	{
		document.getElementById(type+"Error").style.display="none";
		document.getElementById("shadow").style.display="none";
		setTimeout("errorCheckData('"+type+"')",10)
	}

	function errorCheckData(type)
	{
		switch(type)
		{
			case "phone":
				validateType=validatePhone;
				errorDiv="phoneError";
				data=document.errorForm.errorPhone;
				break;
			case "email":
				validateType=validateEmail;
				errorDiv="emailError";
				data=document.errorForm.errorEmail;
				break;
			case "other":
				validateType=validateTwitter;
				errorDiv="twitterError";
				data=document.errorForm.errorTwitter;
				break;
		}

		validateType(data,errorDiv);
	}

	function cancelError(type)
	{
		cancelRow(document.errorForm.cid.value);
		clearError();
		document.getElementById(type+"Error").style.display="none";
		document.getElementById("shadow").style.display="none";
	}

	function clearError()
	{
		document.errorForm.errorPhone.value="";
		document.errorForm.errorEmail.value="";
		document.errorForm.errorTwitter.value="";
		document.errorForm.serviceErrorSelect.selectedIndex=0;
		document.errorForm.cid.value="";
	}

	function validateTwitter(data, errorDiv)
	{
		if(document.errorForm.serviceErrorSelect[document.errorForm.serviceErrorSelect.selectedIndex].text!="Twitter")
		{
			document.getElementById("serviceNameSpan"+document.errorForm.cid.value).innerHTML="("+document.errorForm.serviceErrorSelect[document.errorForm.serviceErrorSelect.selectedIndex].text+")";
			serviceNameSpan.style.disply="inline";
			finishValidate(document.errorForm.errorTwitter.value);
			return true;
		}
		else
		{
			validateTwitterIdAjax(document.errorForm.errorTwitter.value);
		}
	}

	function updateOtherInterface(service,cid)
	{
		serviceNameSpan=document.getElementById("serviceNameSpan"+cid);
		serviceNameSpan.innerHTML="("+service+")";
		serviceNameSpan.style.display="inline";
		document.getElementById("contactServiceCell"+cid).style.display="none";
		document.getElementById("dataDiv"+cid).style.width="25%";
		//document.getElementById("dataContainer"+cid).
		if(service=="Twitter")
		{
			document.getElementById("serviceContactRow"+cid).style.display="block";
		}
	}

	function finishValidate(data)
	{
		cid=document.errorForm.cid.value;
		eval("document.mainForm.dataTextBox"+cid+".value='"+data+"'");
		saveData(cid,data);
	}

	function onLoadAutoCheckContacts()
	{
		autoCheckContacts(verifyContacts, 0);
	}
	
	function autoCheckContacts(contacts, index)
	{
		autoCheckContactsAjax(contacts[index]);
		index++;
		if(index<contacts.length)
		{
			setInterval("autoCheckContacts("+contacts+","+index+")",50);
		}
	}

	function activeViewUpdate(cid, active)
	{
		type=document.getElementById("dataContainer"+cid).className.split(" ")[1];
		if(type=="other" || type=="email")
		{
			eval("serviceCheckbox=document.mainForm.serviceContact"+cid);
			if(active)
			{
				serviceCheckbox.disabled=false;
				document.getElementById("serviceContactRow"+cid).style.color="#000";
			}
			else
			{
				serviceCheckbox.disabled=true;
				document.getElementById("serviceContactRow"+cid).style.color="#AAA";
			}
		}
	}