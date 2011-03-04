	formLength="l";
	newForm=true;
	
	function formInit()
	{
		document.mainForm.probTextL.value=defaultProblemText;
		buildProbs("mainForm");
		buildProbs("check");
//		alert("https://chc-gateway.unl.edu/includes/php/form_xml.php?uid="+uid);
		loadXMLDoc("https://chc-gateway.unl.edu/includes/php/form_xml.php?uid="+uid);
	}

	function xmlInit()
	{
		log = document.getElementById("log");

		person=req.responseXML.getElementsByTagName("person");
		existComps=req.responseXML.getElementsByTagName("computer");
		existPhone=req.responseXML.getElementsByTagName("telephoneNumber");
		existMail=req.responseXML.getElementsByTagName("mail");

		compsOut="";
		if(existComps.length>0)
		{
			(existComps.length>1)?computers=existComps.length+" comptuers":computers="computer";
			compsOut+="We have the following "+computers+" on record for you.<br>Please select the computer you are droping off today or select new.";
			for(i=0;i<existComps.length;i++)
			{
				compsOut+="<br><input type='radio' name='existComp' value='"+getElementTextNS("", "compid",existComps[i],0)+"-"+getElementTextNS("", "brand",existComps[i],0)+"-"+getElementTextNS("", "type",existComps[i],0)+"'>"+getElementTextNS("", "brand",existComps[i],0)+" ";
				if(getElementTextNS("", "type",existComps[i],0)=="desk")
				{
					compsOut+="Desktop";
				}
				else if(getElementTextNS("", "type",existComps[i],0)=="laptop")
				{
					compsOut+="Laptop";
				}
				compsOut+=" - Serial Number: "+getElementTextNS("", "serialnum",existComps[i],0);
			}
			compsOut+="<br><input type='radio' name='existComp' value='other' checked>New Computer";
			document.getElementById("existingCompList").innerHTML=compsOut;
			existingComputerBool=true;
		}

		if(existPhone.length>1)
		{
			phoneOut="We have the following phone numbers on record for you.<br>Please select the phone number that you would like us to contact you at";
			for(i=0;i<existPhone.length;i++)
			{
				phoneOut+="<br><input type='radio' name='existPhone' value='"+getElementTextNS("", "telephoneNumber",person[0],i)+"'";
				if(i==0)
				{
					phoneOut+=" checked";
				}
				phoneOut+=">"+getElementTextNS("", "telephoneNumber",person[0],i);
			}
			phoneOut+="<br><input type='radio' name='existPhone' value='other'>Other<input type='text' name='existPhoneOther'><br><input type='radio' name='existPhone' value='none'>None";
			document.getElementById("existingPhoneList").innerHTML=phoneOut;
			existingPhoneBool=true;
		}
		else if(existPhone.length==1)
		{
			document.mainForm.phone.value=getElementTextNS("", "telephoneNumber",person[0],0);
log.innerHTML+="- existPhone.length==1<br>";
log.innerHTML+="-- existPhone[0] = "+getElementTextNS("", "telephoneNumber",person[0],0)+"<br>";
		}
		else
		{
			document.mainForm.phone.value="";
		}

		if(existMail.length>1)
		{
			mailOut="We have the following email address on record for you.<br>Please select the email address that you would like us to contact you at";
			for(i=0;i<existMail.length;i++)
			{
				mailOut+="<br><input type='radio' name='existMail' value='"+getElementTextNS("", "mail",person[0],i)+"'";
				if(i==0)
				{
					mailOut+=" checked";
				}
				mailOut+=">"+getElementTextNS("", "mail",person[0],i);
			}
			mailOut+="<br><input type='radio' name='existMail' value='other'>Other<input type='text' name='existMailOther'><br><input type='radio' name='existMail' value='none'>None";
			document.getElementById("existingMailList").innerHTML=mailOut;
			existingMailBool=true;
log.innerHTML+="- existMail.length>1<br>";
		}
		else if(existMail.length==1)
		{
			document.mainForm.email.value=getElementTextNS("", "mail",person[0],0);
log.innerHTML+="- existMail.length==1<br>";
log.innerHTML+="-- existMail[0] = "+getElementTextNS("","mail",person[0],0);
		}
		else
		{
			document.mainForm.email.value="";	//log.innerHTML+="- existMail.length<1<br>";
		}
		toggleExisting();
	}

	function toggleExistingComps(toggle)
	{
		document.check.action="javascript:updateComps()";
		existingComp=document.getElementById("existingComp");
		toggleShadow(toggle);
		(toggle=="on")?existingComp.style.display="inline":existingComp.style.display="none";
		if (toggle=="off")
		{
			existingComputerBool=false;
			toggleExisting()
		}
	}

	function toggleExistingPhone(toggle)
	{
		document.check.action="javascript:updatePhone()";
		existingPhone=document.getElementById("existingPhone");
		toggleShadow(toggle);
		(toggle=="on")?existingPhone.style.display="inline":existingPhone.style.display="none";
		if (toggle=="off")
		{
			existingPhoneBool=false;
			toggleExisting()
		}
	}

	function toggleExistingMail(toggle)
	{
		document.check.action="javascript:updateMail()";
		existingMail=document.getElementById("existingMail");
		toggleShadow(toggle);
		(toggle=="on")?existingMail.style.display="inline":existingMail.style.display="none";
	}

	function toggleExisting()
	{
		if(existingCheckOut)
		{
			toggleCheckOut("on");
			return;
		}
		if(existingComputerBool)
		{
			toggleExistingComps("on")
			return;
		}
		if(existingPhoneBool)
		{
			toggleExistingPhone("on")
			return;
		}
		if(existingMailBool)
		{
			toggleExistingMail("on")
			return;
		}
	}
