	function advShowHide (parent, child, button)
	{
		log = document.getElementById("log");
		//log.innerHTML+="advShowHide()<br>";
		//log.innerHTML+="-- parent = "+parent+"<br>";
		//log.innerHTML+="-- child = "+child+"<br>";
		//log.innerHTML+="-- button.onclick = "+button.onclick+"<br>";
		parentObj = document.getElementById(parent);
		childObj = document.getElementById(child);
		if (childObj.style.display=="none")
		{
			parentObj.className = "cell bottom_border";
			childObj.style.display="inline";
			button.value="hide";
		}
		else
		{
			parentObj.className = "cell";
			childObj.style.display="none";
			button.value="show";
		}
	}

	function doNothing()
	{
		return true;
	}

	/* Made by Mathias Bynens <http://mathiasbynens.be/> */
	/* retrived form http://krijnhoetmer.nl/stuff/javascript/number-format/script.js */
	function number_format(a, b, c, d)
	{
		a = Math.round(a * Math.pow(10, b)) / Math.pow(10, b);
		e = a + '';
		f = e.split('.');
		if (!f[0])
		{
			f[0] = '0';
		}
		if (!f[1])
		{
			f[1] = '';
		}
		if (f[1].length < b)
		{
			g = f[1];
			for (i=f[1].length + 1; i <= b; i++)
			{
				g += '0';
			}
			f[1] = g;
		}
		if(d != '' && f[0].length > 3)
		{
			h = f[0];
			f[0] = '';
			for(j = 3; j < h.length; j+=3)
			{
				i = h.slice(h.length - j, h.length - j + 3);
				f[0] = d + i +  f[0] + '';
			}
			j = h.substr(0, (h.length % 3 == 0) ? 3 : (h.length % 3));
			f[0] = j + f[0];
		}
		c = (b <= 0) ? '' : c;
		return f[0] + c + f[1];
	}

	Array.prototype.inArray = function (value)
	{
		var i;
		for (i=0; i < this.length; i++)
		{
			if (this[i] === value)
			{
				return true;
			}
		}
		return false;
	};

	function showMessage(message, error, id)
	{
		errorBox=document.getElementById(id);
		errorBox.innerHTML=message;
		if(error)
		{
			errorBox.style.backgroundColor="#FDD";
		}
		else
		{
			errorBox.style.backgroundColor="#DFD";
		}
		errorBox.style.display="block";
	}

	function hideMessage(id)
	{
		errorBox=document.getElementById(id);
		errorBox.innerHTML="";
		errorBox.style.display="none";
	}
	
	function findPos(obj)
	{
		var curleft = curtop = 0;
		if (obj.offsetParent)
		{
			do
			{
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		}
		return [curleft,curtop];
	}

	function getWindowSize()
	{
		var myWidth=0;
		var myHeight=0;
		if(typeof(window.innerWidth)=='number')
		{
			//Non-IE
			myWidth=window.innerWidth;
			myHeight=window.innerHeight;
		}
		else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight))
		{
			//IE 6+ in 'standards compliant mode'
			myWidth=document.documentElement.clientWidth;
			myHeight=document.documentElement.clientHeight;
		}
		else if(document.body && (document.body.clientWidth || document.body.clientHeight))
		{
			//IE 4 compatible
			myWidth=document.body.clientWidth;
			myHeight=document.body.clientHeight;
		}
		return [myWidth,myHeight];
	}