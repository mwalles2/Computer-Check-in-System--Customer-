		existingComputerBool=false;
		existingPhoneBool=false;
		existingMailBool=false;
		existingCheckOut=false;

		userpass=new Array();
		userpass[0]=new Array("","");

		probs = new Array()
		probs[0]=new Array("Adware/Spyware",true);
		probs[1]=new Array("Slowness",true);
		probs[2]=new Array("Virus",true);
		probs[3]=new Array("Other",true);

		comps=new Array();
		comps[0]=new Array("---","");
		comps[1]=new Array("Apple","Apple");
		comps[2]=new Array("Compaq","Compaq");
		comps[3]=new Array("Dell","Dell");
		comps[4]=new Array("eMachine","eMachine");
		comps[5]=new Array("Gateway","Gateway");
		comps[6]=new Array("HP","HP");
		comps[7]=new Array("Macintosh","Macintosh");
		comps[8]=new Array("Sony","Sony");
		comps[9]=new Array("Toshiba","Toshiba");
		comps[10]=new Array("Other","Other");

		function addProb(form)
		{
			dForm=eval("document."+form);
			index=dForm.probs.selectedIndex;
			value=probs[dForm.probs.options[index].value][0];
			probs[dForm.probs.options[index].value][1]=false;
			buildProbs(form);
			buildOut(form);
		}

		function subProb(item,form)
		{
			dForm=eval("document."+form);
			probs[item][1]=true;
			buildProbs(form);
			buildOut(form);
			if(probs[item][0]=="Other")
			{
				probSD=document.getElementById("probS-"+form);
				probSD.style.display="hidden";
				dForm.probTextS.value="";
			}
		}

		function buildProbs(form)
		{
			dForm=eval("document."+form);
			list=document.getElementById("probs-"+form);
			for(i=list.length-1;i>0;i--)
			{
				list.remove(i);
			}
			dForm.probs.selectedIndex=0;
			for (i=0;i<probs.length;i++)
			{
				(probs[i][0]=="Other"&&formLength=="l"&&form=="mainForm")?oth=false:oth=true;
				if(probs[i][1] && oth)
				{
					newOpt=document.createElement("option");
					newOpt.text=probs[i][0];
					newOpt.value=i;
					try 
					{
						list.add(newOpt, null); // standards compliant; doesn't work in IE
					}
					catch(ex)
					{
						list.add(newOpt); // IE only
					}
				}
			}
			if(list.length==1)
			{
				list.disabled=true;
			}
			else
			{
				list.disabled=false;
			}
		}

		function buildOut(form)
		{
			value="";
			for(i=0;i<probs.length;i++)
			{
				if(!probs[i][1])
				{
					value+=probs[i][0]+"<input type='button' value='-' onClick=\"subProb("+i+",'"+form+"')\"><br>";
					if(probs[i][0]=="Other")
					{
						probSD=document.getElementById("probS-"+form);
						probSD.style.display="inline";
						//probSD.style.display="table-row";
					}
				}
			}
			out=document.getElementById("out-"+form);
			out.innerHTML=value;
		}

		function buildUserPass(item,form)
		{
			form1=eval("document."+form);
			//alert(item);
			if (item=="none")
			{
				form1.none.disabled=true;
				out="You have selected that you do not have any password for this computer.  If you do have a password you wish left with the computer please press the \"+\" button.<input type=\"button\" value=\"+\" onClick=\"buildUserPass('','"+form+"')\">";
				userpass=new Array();
			}
			else
			{
				x=userpass.length;
				//alert("userpass.length="+userpass.length)
				//alert("x="+x);
				out="";
				if((item!="asIs"&&item!='')||item===0)
				{
					//alert("if "+item);
					userpass.splice(item,1);
					x--;
				}
				else if(item!="asIs")
				{
					x++;
					userpass[userpass.length]=new Array("","");
				}
				//alert("x="+x);
				for (i=0;i<x;i++)
				{
					out+="Username: <input type=\"text\" name=\"user"+i+"\" value=\""+userpass[i][0]+"\" onBlur=\"addUserPass(this)\">";
					(form=="check")?out+="<br>":out+="";
					out+="Password: <input type=\"text\" name=\"pass"+i+"\" value=\""+userpass[i][1]+"\" onBlur=\"addUserPass(this)\">";
					if(form=="mainForm")
					{
						out+="<input type=\"button\" value=\"-\" name=\"sub"+i+"\" onClick=\"buildUserPass("+i+",'"+form+"')\"";
						(userpass.length==1)?out+=" disabled":out+="";
						out+=">";
						if(i==x-1)
						{
							out+="<input type=\"button\" name=\"add\" value=\"+\" onClick=\"buildUserPass('','"+form+"')\">";
						}
						out+="<br>";
					}
				}
				form1.none.disabled=false;
			}
			userPass=document.getElementById(form+"-userpass");
			userPass.innerHTML=out;
		}

		function addUserPass(item)
		{
			//alert (item.name);
			name=item.name;
			value=item.value;
			id=name.substr(0,4);
			num=name.charAt(4);
			(id=="user")?i=0:i=1;
			userpass[num][i]=value;
			//alert(userpass);
		}

		function laptopSH(sh)
		{
			document.outForm.compid.value="NONE";
			laptopRows=document.getElementById("laptopRows");
			if (sh=="s")
			{
				laptopRows.style.display="inline";
			}
			else
			{
				laptopRows.style.display="none";
			}
		}

		function cdSH(sh)
		{
			(formLength=="l")?cdD=document.getElementById("cdL"):cdD=document.getElementById("cdS");
			if (sh=="s")
			{
				cdD.className="row";
			}
			else
			{
				cdD.className="row hidden";
			}
		}

		function caseSH(sh,form)
		{
			caseD=document.getElementById("case-"+form);
			if (sh=="s")
			{
				caseD.style.display="inline";
			}
			else
			{
				caseD.style.display="none";
			}
		}

		function initDropDown (items,menu)
		{
			menu.options.length=0;
			for (i=0;i<items.length;i++)
			{
				menu.options[i]=new Option(items[i][0],items[i][1]);
			}
		}

		function xmlInit()
		{
			log = document.getElementById("log");	//log.innerHTML+="xmlInit()<br>\n";

			person=req.responseXML.getElementsByTagName("person");
			existComps=req.responseXML.getElementsByTagName("computer");
			existPhone=req.responseXML.getElementsByTagName("telephoneNumber");
			existMail=req.responseXML.getElementsByTagName("mail");
			existCheckOut=req.responseXML.getElementsByTagName("checkout");

			initDropDown(comps,document.mainForm.computer);
			initDropDown(comps,document.check.computer);

			userName=document.getElementById("name");
			date=document.getElementById("date");
			nuid=document.getElementById("nuid");
			(getElementTextNS("", "formLength",person[0],0)=="s")?formLength="s":formLength="l";	//log.innerHTML+="-init done<br>\n";
			if (formLength=="l")
			{
				//out.innerHTML+="if<br>";
				probL=document.getElementById("probL");
				probL.className="row";
			}
			buildProbs("mainForm");
			buildProbs("check");

			document.outForm.date.value=date.innerHTML=buildDate();
//alert(getElementTextNS("", "unlUNCWID", person[0], 0));
			if(getElementTextNS("", "unlUNCWID", person[0], 0)=="n/a")
			{
				error("nuid");
				return false;
			}
			else if (getElementTextNS("", "unlUNCWID", person[0], 0)=="unknown")
			{
//alert ("unknown user");
				if(existCheckOut.length>0)
				{
					window.location="http://ishd-gateway.unl.edu/checkout.php?nuid=unknown";
				}
				document.outForm.nuid.value=nuid.innerHTML="N/A";
				document.getElementById("nameAuto").style.display="none";
				document.getElementById("nameMan").style.display="inline";

				document.getElementById("otherDiv").style.display="inline";
				document.getElementById("studentRadio").style.display="none";
				document.getElementById("facultyRadio").style.display="none";
				document.getElementById("staffRadio").style.display="none";

				document.outForm.facstaffstu.value="other";
			}
			else
			{
				(getElementTextNS("", "ldapAvailable",person[0],0)=="true")?ldapAvailable=true:ldapAvailable=false;

				document.outForm.name.value=userName.innerHTML=getElementTextNS("", "displayName",person[0],0);	//log.innerHTML+="--displayName set<br>\n"; //log.innerHTML+="---"+document.outForm.name.value+"<br>\n";
				document.outForm.nuid.value=nuid.innerHTML=getElementTextNS("", "unlUNCWID",person[0],0);
				document.outForm.iso.value=getElementTextNS("", "unlidcardiso",person[0],0);	//log.innerHTML+="--unlUNCWID set<br>\n";	//log.innerHTML+="---"+document.outForm.nuid.value+"<br>\n";
				document.outForm.given.value=getElementTextNS("", "givenName",person[0],0);
				document.outForm.sur.value=getElementTextNS("", "sn",person[0],0);	//log.innerHTML+="--buildDate set<br>\n";	//log.innerHTML+="---"+document.outForm.date.value+"<br>\n";	//log.innerHTML+="--telephoneNumber set<br>\n";		//log.innerHTML+="---"+document.mainForm.phone.value+"<br>\n";	//log.innerHTML+="--eduPersonAffiliation set<br>\n"; //log.innerHTML+="---"+getElementTextNS("", "eduPersonAffiliation",person[0],0)+"<br>\n";	//			document.mainForm.email.value=(getElementTextNS("", "eduPersonAffiliation",person[0],0)=="student")?getElementTextNS("", "mail",person[0],0):getElementTextNS("", "eduPersonPrincipalName",person[0],0);	//log.innerHTML+="-set basic<br>\n";

				if(ldapAvailable)
				{
					if (getElementTextNS("", "eduPersonAffiliation",person[0],0)=="staff")
					{
						text=document.getElementById("staffText");
					}
					else if (getElementTextNS("", "eduPersonAffiliation",person[0],0)=="student")
					{
						text=document.getElementById("studentText");
					}
					else if (getElementTextNS("", "eduPersonAffiliation",person[0],0)=="faculty")
					{
						text=document.getElementById("facultyText");
					}
					text.innerHTML="X";
					student=document.getElementById("studentRadio");
					faculty=document.getElementById("facultyRadio");
					staff=document.getElementById("staffRadio");
					document.outForm.facstaffstu.value=getElementTextNS("", "eduPersonAffiliation",person[0],0);
				}
				else
				{
					student=document.getElementById("studentText");
					faculty=document.getElementById("facultyText");
					staff=document.getElementById("staffText");
				}

//log.innerHTML+="-set student/fac/staff<br>\n";

				student.style.display="none";
				faculty.style.display="none";
				staff.style.display="none";

				//out.innerHTML+="out";

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

				if(existCheckOut.length>0)
				{
//alert(existCheckOut.length);
					existingCheckOut=true;
				}

				toggleExisting();
			}
			cardSwipe=document.getElementById("cardSwipe");
			formTable=document.getElementById("formTable");
			cardSwipe.style.display="none";
			formTable.style.display="inline";
		}

		function toggleShadow(toggle)
		{
			shadow=document.getElementById("shadow");
			(toggle=="on")?shadow.style.display="inline":shadow.style.display="none";
		}

		function checkContact(when)
		{
			document.check.action="javascript:checkContact(2)";
			contacterror=document.getElementById("contacterror");
			if (when==1)
			{
				if(document.mainForm.phone.value=="NONE"&&document.mainForm.email.value=="NONE")
				{
					if((document.check.phoneNone.checked&&document.check.emailNone.checked)||(!document.check.phoneNone.checked&&!document.check.emailNone.checked))
					{
						document.check.phoneNone.checked=false;
						document.check.phoneNone.disabled=false;
						document.check.phone.disabled=false;
						document.check.emailNone.checked=false;
						document.check.emailNone.disabled=false;
						document.check.email.disabled=false;
						document.mainForm.phone.value="";
						document.mainForm.email.value="";
					}
					else if(document.check.phoneNone.checked)
					{
						document.check.phoneNone.checked=true;
						document.check.emailNone.disabled=true;
						document.check.phone.disabled=true;
						document.mainForm.email.value="";
					}
					else if(document.check.emailNone.checked)
					{
						document.check.emailNone.checked=true;
						document.check.phoneNone.disabled=true;
						document.check.email.disabled=true;
						document.mainForm.phone.value="";
					}
				}
				if(document.mainForm.phone.value=="NONE")
				{
					document.check.phoneNone.checked=true;
					document.check.phone.disabled=true;
					document.check.emailNone.disabled=true;
				}
				else if(document.mainForm.email.value=="NONE")
				{
					document.check.emailNone.checked=true;
					document.check.email.disabled=true;
					document.check.phoneNone.disabled=true;
				}
				//alert ("checkPhone: if 1");
				//if (document.mainForm.phone.value=="" || document.mainForm.email.value=="")
				if (!validatePhoneAndEmail(document.mainForm.phone,"errorNVPhone",document.mainForm.email,"errorNVEmail"))
				{
					document.check.phone.value=document.mainForm.phone.value;
					document.check.email.value=document.mainForm.email.value;
					//alert ("checkPhone: if 1: if 1");
					//alert("checkPhone: if");
					toggleShadow("on");
					contacterror.style.display="inline";
					return false;
				}
				else
				{
					document.outForm.phone.value=document.mainForm.phone.value;
					document.outForm.email.value=document.mainForm.email.value;
					return true;
				}
			}
			else
			{
				//alert("checkPhone: else");
				(document.check.phoneNone.checked)?document.mainForm.phone.value="NONE":document.mainForm.phone.value=document.check.phone.value;
				(document.check.emailNone.checked)?document.mainForm.email.value="NONE":document.mainForm.email.value=document.check.email.value;
				toggleShadow("off");
				contacterror.style.display="none";
				setTimeout("formCheck()",70);
			}
		}

		function checkFacStaffStu(when)
		{
			document.check.action="javascript:checkFacStaffStu(2)";
			facstaffstuerror=document.getElementById("facstaffstuerror");
			if(when==1)
			{
				if(document.outForm.facstaffstu.value=="")
				{
					toggleShadow("on");
					facstaffstuerror.style.display="inline";
					return false;
				}
				else
				{
					return true;
				}
			}
			else
			{
				toggleShadow("off");
				(document.check.facstaffstu[0].checked)?document.mainForm.facstaffstu[0].checked=true:document.mainForm.facstaffstu[0].checked=false;
				(document.check.facstaffstu[1].checked)?document.mainForm.facstaffstu[1].checked=true:document.mainForm.facstaffstu[1].checked=false;
				(document.check.facstaffstu[2].checked)?document.mainForm.facstaffstu[2].checked=true:document.mainForm.facstaffstu[2].checked=false;
				facstaffstuerror.style.display="none";
				setTimeout("formCheck()",70);
			}
		}

		function checkCards()
		{
			if(document.mainForm.ethernet[0].checked)
			{
				document.outForm.ethernet.value="yes";
			}
			else
			{
				document.outForm.ethernet.value="no";
			}
			if(document.mainForm.wireless[0].checked)
			{
				document.outForm.wireless.value="yes";
			}
			else
			{
				document.outForm.wireless.value="no";
			}
			return true;
		}

		function checkComp(when)
		{
			document.check.action="javascript:checkComp(2)";
			computerError=document.getElementById ("computererror");
			if(when==1)
			{
				if(document.mainForm.computer.selectedIndex!=0&&(document.mainForm.compType[0].checked||document.mainForm.compType[1].checked))
				{
					document.outForm.computer.value=document.mainForm.computer[document.mainForm.computer.selectedIndex].value;
					if(document.mainForm.compType[0].checked)
					{
						document.outForm.compType.value=document.mainForm.compType[0].value;
					}
					else if(document.mainForm.compType[1].checked)
					{
						document.outForm.compType.value=document.mainForm.compType[1].value;
					}
					return true;
				}
				else
				{
					document.check.computer.selectedIndex=document.mainForm.computer.selectedIndex;
					document.check.compType[0].checked=document.mainForm.compType[0].checked;
					document.check.compType[1].checked=document.mainForm.compType[1].checked;
					if(document.check.compType[1].checked)
					{	
						laptopSH("s");
					}
					toggleShadow("on");
					computerError.style.display="inline";
					return false;
				}
			}
			else
			{
				document.mainForm.computer.selectedIndex=document.check.computer.selectedIndex;
				document.mainForm.compType[0].checked=document.check.compType[0].checked;
				document.mainForm.compType[1].checked=document.check.compType[1].checked;
				toggleShadow("off");
				computerError.style.display="none";
				setTimeout("formCheck()",70);
			}
		}

		function checkLaptop(when)
		{
			document.check.action="javascript:checkLaptop(2)";
			laptopError=document.getElementById("laptoperror");
			if(when==1)
			{
				//alert(document.outForm.compType.value);
				if(document.outForm.compType.value=="desk")
				{
					document.outForm.powersupply.value="NONE";
					document.outForm.caseText.value="NONE";
					return true;
				}
				if(((document.mainForm.caseRadio[0].checked&&document.mainForm.caseText.value!="")||document.mainForm.caseRadio[1].checked)&&(document.mainForm.powersupply[0].checked||document.mainForm.powersupply[1].checked))
				{
					if(document.mainForm.caseRadio[0].checked)
					{
						document.outForm.caseText.value=document.mainForm.caseText.value;
					}
					else
					{
						document.outForm.caseText.value="NONE";
					}
					if(document.mainForm.powersupply[0].checked)
					{
						document.outForm.powersupply.value=document.mainForm.powersupply[0].value;
					}
					else
					{
						document.outForm.powersupply.value=document.mainForm.powersupply[1].value;
					}
					return true;
				}
				else
				{
					document.check.caseRadio[0].checked=document.mainForm.caseRadio[0].checked;
					document.check.caseRadio[1].checked=document.mainForm.caseRadio[1].checked;
					(document.check.caseRadio[0].checked)?document.getElementById("case-check").style.display="inline":document.getElementById("case-check").style.display="none";
					document.check.caseText=document.mainForm.caseText
					document.check.powersupply[0].checked=document.mainForm.powersupply[0].checked
					document.check.powersupply[1].checked=document.mainForm.powersupply[1].checked
					toggleShadow("on");
					laptopError.style.display="inline";
					return false;
				}
			}
			else
			{
				if(document.check.powersupply[0].checked)
				{
					document.mainForm.powersupply[0].checked=true;
					document.mainForm.powersupply[1].checked=false;
				}
				else if (document.check.powersupply[1].checked)
				{
					document.mainForm.powersupply[0].checked=false;
					document.mainForm.powersupply[1].checked=true;
				}
				if(document.check.caseRadio[0].checked)
				{					
					document.mainForm.caseRadio[0].checked=true;
					document.mainForm.caseRadio[1].checked=false;
					document.mainForm.caseText.value=document.check.caseText.value;
				}
				else if(document.check.caseRadio[1].checked)
				{
					document.mainForm.caseRadio[0].checked=false;
					document.mainForm.caseRadio[1].checked=true;
					document.mainForm.caseText.value="";
				}
				toggleShadow("off");
				laptopError.style.display="none";
				setTimeout("formCheck()",70);
			}
		}

		function checkCDs(when)
		{
			document.check.action="javascript:checkCDs(2)";
			cdError=document.getElementById("cderror");
			//log=document.getElementById("log");
			//log.innerHTML+="*checkCDs<br>";
			if (when==1)
			{
				//log.innerHTML+="--if 1<br>";
				if(document.mainForm.cds[0].checked && formLength=="l")
				{
					//log.innerHTML+="---if 2<br>";
					if(document.mainForm.cdText.value=="")
					{
						//log.innerHTML+="----if 3<br>";
						toggleShadow("on");
						cdError.style.display="inline";
						return false;
					}
					else
					{
						document.outForm.cds.value=document.mainForm.cdText.value;
						return true;
					}
				}
				else if(document.mainForm.cds[0].checked && formLength=="s")
				{
					document.outForm.cds.value="yes"
					return true;
				}
				else
				{
					document.outForm.cds.value="NONE"
					return true;
				}
			}
			else
			{
				document.mainForm.cdText.value=document.check.cdText.value;
				toggleShadow("off");
				cdError.style.display="none";
				setTimeout("formCheck()",70);
			}
		}

		function checkAccounts(when)
		{
			document.check.action="javascript:checkAccounts(2)";
			//log=document.getElementById("log");
			//log.innerHTML+="*in<br>";
			accountError=document.getElementById("accounterror");
			if (when==1)
			{
				//log.innerHTML+="*-if 1<br>";
				//log.innerHTML+="*-"+userpass.length+"<br>";
				userpassbool=true;
				for(n=0; n<userpass.length;n++)
				{
					if(userpass[n][0]!=""&&userpass[n][1]!="")
					{
						userpassbool=false;
						break;
					}
				}
				if (userpassbool&&!document.mainForm.none.disabled)
				{
					//log.innerHTML+="*--if 2<br>";
					toggleShadow("on");
					accountError.style.display="inline";
					return false;
				}
				else
				{
					//log.innerHTML+="*--else 2<br>";
					out="";
					if(document.mainForm.none.disabled)
					{
					out="NONE";
					}
					else
					{
						for(i=0;i<userpass.length;i++)
						{
							out+=userpass[i][0]+","+userpass[i][1];
							if(i<(userpass.length-1))
							{
								out+=";";
							}
						}
					}
					document.outForm.accounts.value=out;
					return true;
				}
			}
			else
			{
				//log.innerHTML+="*-else <br>1";
				more=false;
				if(document.check.none.disabled)
				{
					buildUserPass("none","mainForm");
				}
				else if(checkAccounts.arguments[1]=="more")
				{
					buildUserPass("","mainForm");
					more=true;
				}
				else
				{
					addUserPass(document.check.user0);
					addUserPass(document.check.pass0);
					buildUserPass("asIs","mainForm");
				}

				toggleShadow("off");
				accountError.style.display="none";
				(!more)?setTimeout("formCheck()",70):more=false;
			}
		}

		function checkProbs(when)
		{
			document.check.action="javascript:checkProbs(2)";
			problemError=document.getElementById("problemerror");
			log=document.getElementById("log");
			if(when==1)
			{
				noProbs=true;
				noShortText=false;
				noLongText=true;
				for(i=0;i<probs.length;i++)
				{
					log.innerHTML+="prob["+i+"][1]="+probs[i][1]+"<br>noProbs="+noProbs+"<br>";
					if(!probs[i][1])
					{
						noProbs=false;
						if(probs[i][0]=="Other"&&document.mainForm.probTextS.value=="")
						{
							noShortText=true;
						}
					}
				}
				if(formLength=="l"&&document.mainForm.probTextL.value!="")
				{
					noLongText=false;
				}
				if((noProbs&&noLongText)||noShortText)
				{
					buildProbs("check");
					buildOut("check");
					toggleShadow("on");
					problemError.style.display="inline";
					return false;
				}
				else
				{
					out="";
					j=0;
					for(i=0;i<probs.length;i++)
					{
						if(!probs[i][1]&&probs[i][0]!="Other")
						{
							if(j>0)
							{
								out+=";;";
							}
							j++;
							out+=probs[i][0];
						}
					}
					if(j>0&&(document.mainForm.probTextS.value!=""||document.mainForm.probTextL.value!=""))
					{
						out+=";;";
					}
					if(document.mainForm.probTextS.value!="")
					{
						out+=document.mainForm.probTextS.value;
					}
					else if(document.mainForm.probTextL.value!="")
					{
						out+=document.mainForm.probTextL.value;
					}
					document.outForm.prob.value=out;
					return true;
				}
			}
			else
			{
				if(document.check.probTextS.value!="")
				{
					if(formLength=="l")
					{
						document.mainForm.probTextL.value=document.check.probTextS.value;
						document.check.probTextS.value="";
						for(i=0;i<probs.length;i++)
						{
							log.innerHTML+="*-probs["+i+"][0]="+probs[i][0]+"<br>";
							if(probs[i][0]=="Other")
							{
								log.innerHTML+="*--if<br>";
								probs[i][1]=true;
							}
						}
					}
					else
					{
						document.mainForm.probTextS.value=document.check.probTextS.value;
					}
				}
				toggleShadow("off");
				problemError.style.display="none";
				buildProbs("mainForm");
				buildOut("mainForm");
				setTimeout("formCheck()",70);
			}
		}

		function checkUserName(when)
		{
			document.check.action="javascript:checkUserName(2)";
			nameError=document.getElementById("nameError");

			log=document.getElementById("log");
			if(when==1)
			{
				if(document.mainForm.given.value=="" || document.mainForm.sur.value=="")
				{
					document.check.given.value=document.mainForm.given.value;
					document.check.sur.value=document.mainForm.sur.value;
					toggleShadow("on");
					nameError.style.display="inline";
					return false;
				}
				else
				{
					document.outForm.given.value=document.mainForm.given.value;
					document.outForm.sur.value=document.mainForm.sur.value;
					document.outForm.name.value=document.mainForm.given.value+" "+document.mainForm.sur.value;
					return true;
				}
			}
			else
			{
				document.mainForm.given.value=document.check.given.value;
				document.mainForm.sur.value=document.check.sur.value;
				toggleShadow("off");
				nameError.style.display="none";
				setTimeout("formCheck()",70);
			}
		}

		function updateComps()
		{
			for(i=0;i<document.check.existComp.length;i++)
			{
				if (document.check.existComp[i].checked)
				{
					checked=document.check.existComp[i].value;
				}
			}
			if(checked!="other")
			{
				items=checked.split("-");
//				alert(items[1]);
				for(i=0;i<document.mainForm.computer.length;i++)
				{
//					alert(document.mainForm.computer[i].value)
					if(document.mainForm.computer[i].value==items[1])
					{
//						alert("test");
						document.mainForm.computer.selectedIndex=i;
					}
				}

				if(items[2]=="desk")
				{
					document.mainForm.compType[0].checked=true;
				}
				else if(items[2]=="laptop")
				{
					document.mainForm.compType[1].checked=true;
					laptopSH('s');
				}
				document.outForm.compid.value=items[0];
			}
			else
			{
				document.outForm.compid.value="NONE";
			}
			toggleExistingComps("off");
		}

		function updatePhone()
		{
			for(i=0;i<document.check.existPhone.length;i++)
			{
				if (document.check.existPhone[i].checked)
				{
					checked=document.check.existPhone[i].value;
				}
			}
			if(checked!="other" && checked!="none")
			{
				document.mainForm.phone.value=checked;
			}
			else if(checked=="other")
			{
				document.mainForm.phone.value=document.check.existPhoneOther.value;
			}
			else
			{
				document.outForm.phone.value="NONE";
			}
			toggleExistingPhone("off");
		}

		function updateMail()
		{
			for(i=0;i<document.check.existMail.length;i++)
			{
				if (document.check.existMail[i].checked)
				{
					checked=document.check.existMail[i].value;
				}
			}
			if(checked!="other" && checked!="none")
			{
				document.mainForm.email.value=checked;
			}
			else if(checked=="other")
			{
				document.mainForm.email.value=document.check.existMailOther.value;
			}
			else
			{
				document.outForm.email.value="NONE";
			}
			toggleExistingMail("off");
		}

		function formCheck()
		{
			log=document.getElementById("log");
			if(document.outForm.nuid.value=="N/A")
			{
				if(checkUserName(1))
				{
					log.innerHTML+="passed checkUserName<br>";
				}
				else
				{
					log.innerHTML+="failed checkUserName<br>";
					return false;
				}
			}
			if (checkContact(1))
			{
				log.innerHTML+="passed checkContact<br>";
				if(checkFacStaffStu(1))
				{
					log.innerHTML+="passed checkFacStaffStu<br>";
					if(checkComp(1))
					{
						log.innerHTML+="passed checkComp<br>";
						if(checkLaptop(1))
						{
							log.innerHTML+="passed checkLaptop<br>";
							if (checkCards())
							{
								log.innerHTML+="passed checkCards<br>";
								if(checkCDs(1))
								{
									log.innerHTML+="passed checkCDs<br>";
									if(checkAccounts(1))
									{
										log.innerHTML+="passed checkAccounts<br>";
										if(checkProbs(1))
										{
											log.innerHTML+="passed checkProbs<br>";
											toggleCheck("on");
										}
										else
										{
											log.innerHTML+="failed checkProbs<br>";
										}
									}
									else
									{
										log.innerHTML+="failed checkAccounts<br>";
									}
								}
								else
								{
									log.innerHTML+="failed checkCDs<br>";
								}
							}
							else
							{
								log.innerHTML+="failed checkCards<br>";
							}
						}
						else
						{
							log.innerHTML+="failed checkLaptop<br>";
						}
					}
					else
					{
						log.innerHTML+="failed checkComp<br>";
					}
				}
				else
				{
					log.innerHTML+="failed checkFacStaffStu<br>";
				}
			}
			else
			{
				log.innerHTML+="failed checkContact<br>";
			}
		}

		function toggleCheck(toggle)
		{
			log=document.getElementById("log");
			log.innerHTML+=document.getElementById("outFormSubmit").onclick+"<br>";
			confirm=document.getElementById("confirm");
			toggleShadow(toggle);
			(toggle=="on")?confirm.style.display="inline":confirm.style.display="none";
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

		function toggleCheckOut(toggle)
		{
			document.check.action="javascript:checkOut('no')";
			checkOutDiv=document.getElementById("checkOut");
			toggleShadow(toggle);
			(toggle=="on")?checkOutDiv.style.display="inline":checkOutDiv.style.display="none";
		}

		function checkOut(which)
		{
			if(which=="yes")
			{
				document.outForm.checkout.value="yes";
				existingCheckOut=false;
				toggleCheckOut("off")
			}
			else
			{
				window.location="http://ishd-gateway.unl.edu/checkout.php?nuid="+nuid.innerHTML;
			}
			toggleExisting();
		}

		function invalidCard()
		{
			log = document.getElementById("log");
			
			isov=document.check.cardErrorNuid.value;
			runCard()
			toggleError("off");
		}