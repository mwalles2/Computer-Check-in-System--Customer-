	function locationUpdate(item, cid)
	{
		xmlInit=doNothing;
		ajaxRequest=protocol+server+"/includes/php/contact-ajax.php?action=location&cid="+cid+"&locid="+item[item.selectedIndex].value;
		//alert(ajaxRequest);
		loadXMLDoc(ajaxRequest);
	}

	function serviceUpdate(serviceId, cid)
	{
		xmlInit=updateServiceUpdate;
		ajaxRequest=protocol+server+"/includes/php/contact-ajax.php?action=service&cid="+cid+"&csid="+serviceId;
		//alert(ajaxRequest);
		loadXMLDoc(ajaxRequest);
	}

	function activeUpdate(item, cid)
	{
		xmlInit=doNothing;
		ajaxRequest=protocol+server+"/includes/php/contact-ajax.php?action=active&cid="+cid+"&active="+item.checked;
		activeViewUpdate(cid, item.checked);
		//alert(ajaxRequest);
		loadXMLDoc(ajaxRequest);
	}

	function contactMeUpdate(item, cid)
	{
		xmlInit=contactMeCheck;
		ajaxRequest=protocol+server+"/includes/php/contact-ajax.php?action=contactme&cid="+cid+"&contactme="+item.checked;
		//alert(ajaxRequest);
		loadXMLDoc(ajaxRequest);
	}

	function insertContactRow(type)
	{
		xmlInit=addContactRow;
		ajaxRequest=protocol+server+"/includes/php/contact-ajax.php?action=new&type="+type;
		//alert(ajaxRequest);
		loadXMLDoc(ajaxRequest);
	}
	
	function saveData(cid,data,type)
	{
		xmlInit=updateSaveData;
		ajaxRequest=protocol+server+"/includes/php/contact-ajax.php?action=add&cid="+cid+"&data="+data;
		if(type=="other")
		{
			ajaxRequest+="&service=true&csid="+document.errorForm.serviceErrorSelect[document.errorForm.serviceErrorSelect.selectedIndex].value;
		}
		else
		{
			ajaxRequest+="&service=false";
		}
		//alert(ajaxRequest);
		loadXMLDoc(ajaxRequest);
		clearError();
	}

	function cancelRow(cid)
	{
		xmlInit=updateCancelRow;
		ajaxRequest=protocol+server+"/includes/php/contact-ajax.php?action=cancel&cid="+cid;
		//alert(ajaxRequest);
		loadXMLDoc(ajaxRequest);
	}

	function addContactRow()
	{
		data=req.responseXML.getElementsByTagName("data");
		cid=getElementTextNS("", "cid",data[0],0);
		type=getElementTextNS("", "type",data[0],0);

		typeDiv=document.getElementById(type);

		mainRow=document.createElement("div");
		mainRow.className="row_wide";

		mainDiv=document.createElement("div");
		mainDiv.id="main"+cid;
		mainDiv.className="cell";
		mainDiv.style.width="100%";

		activeCheckboxDiv=document.createElement("div");
		activeCheckboxDiv.className="cell";
		activeCheckboxDiv.style.width="5%";

		activeCheckbox=document.createElement("input");
		activeCheckbox.type="checkbox";
		activeCheckbox.name="locationActive"+cid;
		activeCheckbox.checked=true;
		eval("activeCheckbox.onclick=function(){activeUpdate(this,'"+cid+"')}");

		activeCheckboxDiv.appendChild(activeCheckbox);
		mainDiv.appendChild(activeCheckboxDiv);
		
		(type=="other")?dataDivWidth="12%":dataDivWidth="25%";

		dataDiv=document.createElement("div");
		dataDiv.className="cell";
		dataDiv.id="dataDiv"+cid;
		dataDiv.style.width=dataDivWidth;

		dataContainerDiv=document.createElement("div");
		dataContainerDiv.id="dataContainer"+cid;
		dataContainerDiv.className="data "+type+" input";

		dataTextBox=document.createElement("input");
		dataTextBox.type="textbox";
		dataTextBox.id="dataTextBox"+cid;
		dataTextBox.name="dataTextBox"+cid;
		dataTextBox.style.width="100%";

		dataContainerSpan=document.createElement("span");
		dataContainerSpan.id="dataSpan"+cid;

		serviceNameSpan=document.createElement("span");
		serviceNameSpan.id="serviceNameSpan"+cid;
		serviceNameSpan.style.display="none";

		dataContainerDiv.appendChild(dataTextBox);
		dataContainerDiv.appendChild(dataContainerSpan);
		dataContainerDiv.appendChild(serviceNameSpan);
		dataDiv.appendChild(dataContainerDiv);
		mainDiv.appendChild(dataDiv);

		if(type=="other")
		{
			serviceDiv=document.createElement("div");
			serviceDiv.id="contactServiceCell"+cid;
			serviceDiv.className="cell"
			serviceDiv.style.width="13%";
			serviceDiv.style.zIndex="9";

			serviceSelect=document.createElement("select");
			serviceSelect.name="contactService"+cid;

			servicesSet=req.responseXML.getElementsByTagName("services");
			services=req.responseXML.getElementsByTagName("service");
			for(var i=0; i<services.length;i++)
			{
				serviceSelectOption=document.createElement("option");
				serviceSelectOption.value=services[i].getAttribute("csid");
				serviceSelectOption.text=getElementTextNS("", "service",servicesSet[0],i);
				serviceSelect.appendChild(serviceSelectOption);
			}
			serviceDiv.appendChild(serviceSelect);
			mainDiv.appendChild(serviceDiv);
		}
		locationDiv=document.createElement("div");
		locationDiv.className="cell";
		locationDiv.style.width="15%";
		locationDiv.style.zIndex="9";

		locationSelect=document.createElement("select");
		locationSelect.name="contactLocation"+cid;
		eval("locationSelect.onchange=function(){locationUpdate(this,'"+cid+"')}");

		locationsSet=req.responseXML.getElementsByTagName("locations");
		locations=req.responseXML.getElementsByTagName("location");

		locationSelectOption=document.createElement("option");
		locationSelectOption.value="";
		locationSelectOption.text="---";
		locationSelect.appendChild(locationSelectOption);
		for(var i=0; i<locations.length;i++)
		{
			locationSelectOption=document.createElement("option");
			locationSelectOption.value=locations[i].getAttribute("clid");
			locationSelectOption.text=getElementTextNS("", "location",locationsSet[0],i);
			locationSelect.appendChild(locationSelectOption);
		}
		locationDiv.appendChild(locationSelect);
		mainDiv.appendChild(locationDiv);
		mainRow.appendChild(mainDiv);

		buttonDiv=document.createElement("div");
		buttonDiv.className="cell";
		buttonDiv.id="buttonDiv"+cid;

		saveButton=document.createElement("input");
		saveButton.type="button";
		saveButton.name="saveButton"+cid;
		saveButton.value="Save";
		eval("saveButton.onclick=function(){checkData('"+cid+"','"+type+"')}");
		
		cancelButton=document.createElement("input");
		cancelButton.type="button";
		cancelButton.name="cancelButton"+cid;
		cancelButton.value="Cancel";
		eval("cancelButton.onclick=function(){cancelRow('"+cid+"')}")

		buttonDiv.appendChild(saveButton);
		buttonDiv.appendChild(cancelButton);

		mainDiv.appendChild(buttonDiv);

		typeDiv.appendChild(mainRow);

		if(type=="other" || type=="email")
		{
			optionRow=document.createElement("div");
			optionRow.className="row_wide";
			optionRow.id="serviceContactRow"+cid;
			if(type=="other")
			{
				optionRow.style.display="none";
			}

			optionDiv=document.createElement("div");
			optionDiv.id="options";
			optionDiv.className="cell"
			optionDiv.style.width="100%";

			optionSpacer=document.createElement("div");
			optionSpacer.className="cell";
			optionSpacer.style.width="5%";
			optionSpacer.innerHTML="&nbsp;";

			optionContent=document.createElement("div");
			optionContent.className="cell";

			optionContentCheckbox=document.createElement("input");
			optionContentCheckbox.type="checkbox";
			optionContentCheckbox.name="serviceContact"+cid;
			eval("optionContentCheckbox.onclick=contactMeUpdate(this,'"+cid+"')");

			optionText=document.createElement("span");
			optionText.innerHTML="Automatically contact me on this account with status updates";
			optionContent.appendChild(optionContentCheckbox);
			optionContent.appendChild(optionText);

			optionDiv.appendChild(optionSpacer);
			optionDiv.appendChild(optionContent);

			optionRow.appendChild(optionDiv);
			typeDiv.appendChild(optionRow);
		}
		dataTextBox.focus();
	}

	function updateSaveData()
	{
		//req.responseXML.getElementsByTagName("true");
		data=req.responseXML.getElementsByTagName("data");
		cid=getElementTextNS("", "cid",data[0],0);
		eval("data=document.mainForm.dataTextBox"+cid+".value");
		dataTextBox=document.getElementById("dataTextBox"+cid);
		dataSpan=document.getElementById("dataSpan"+cid);
		buttonDiv=document.getElementById("buttonDiv"+cid);
		dataTextBox.style.display="none";
		buttonDiv.style.display="none";
		dataSpan.innerHTML=data;
	}

	function updateCancelRow()
	{
		data=req.responseXML.getElementsByTagName("data");
		cid=getElementTextNS("", "cid",data[0],0);
		document.getElementById("main"+cid).style.display="none";
		document.getElementById("serviceContactRow"+cid).style.display="none";
	}

	function updateServiceUpdate()
	{
		data=req.responseXML.getElementsByTagName("data");
		cid=getElementTextNS("", "cid",data[0],0);
		autoContact=getElementTextNS("", "autoContact",data[0],0);
		showHideServiceContact(autoContact, cid);
	}

	function validateTwitterIdAjax(data)
	{
		xmlInit=updateValidateTwitterIdAjax;
		ajaxRequest=protocol+server+"/includes/php/twitter-ajax.php?action=twitterValidate&twitterId="+data;
		//alert(ajaxRequest);
		loadXMLDoc(ajaxRequest);
	}

	function updateValidateTwitterIdAjax()
	{
		data=req.responseXML.getElementsByTagName("data");
		cid=document.errorForm.cid.value;
		error=getElementTextNS("", "error",data[0],0);
		twitterId=getElementTextNS("", "twitterId",data[0],0);
		switch(error)
		{
			case "n/a":
				updateOtherInterface(document.errorForm.serviceErrorSelect[document.errorForm.serviceErrorSelect.selectedIndex].text,cid);
				serviceUpdate(document.errorForm.serviceErrorSelect[document.errorForm.serviceErrorSelect.selectedIndex].value,cid);
				finishValidate(twitterId);
				break;
			case "notvalid":
				//showMessage("That is not a valid Twitter account",true,"contactError"+document.errorForm.cid.value);
				document.getElementById("shadow").style.display="inline";
				document.getElementById("twitterError").style.display="inline";
				break;
			case "ratelimit":
				showMessage("Your account could not be validated at this time.  Please try back later.",true,"contactError"+cid);
				break;
		}
	}

	function contactMeCheck()
	{
		data=req.responseXML.getElementsByTagName("data");
		cid=getElementTextNS("", "cid",data[0],0);
		if(document.getElementById("dataContainer"+cid).className.split(" ")[1]=="other")
		{
			autoCheckContactsAjax(cid);
		}
	}

	function updateContactMeCheck()
	{
		data=req.responseXML.getElementsByTagName("data");
		cid=getElementTextNS("", "cid",data[0],0);
		error=getElementTextNS("", "error",data[0],0);
		following=getElementTextNS("", "following",data[0],0);
		twitterId=getElementTextNS("", "twitterId",data[0],0);
		if(error=="ratelimit")
		{
			showMessage("Your account could not be validated at this time.  Please try back later.",true,"contactError"+cid);
		}
		else if(following=="false")
		{
			showMessage("You need to follow the Computer Help Center on Twitter in order to recive updates.  Please do so <a href=\"http://twitter.com/unlchc\">here.</a>",true,"contactError"+cid);
		}
	}

	function autoCheckContactsAjax(cid)
	{
		xmlInit=updateContactMeCheck;
		ajaxRequest=protocol+server+"/includes/php/twitter-ajax.php?action=follow&cid="+cid;
		//alert(ajaxRequest);
		loadXMLDoc(ajaxRequest);
	}