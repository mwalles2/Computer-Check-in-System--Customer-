var isIE = false;
var req;

// global request and XML document objects

// retrieve XML document (reusable generic function);
// parameter is URL string (relative or complete) to
// an .xml file whose Content-Type is a valid XML
// type, such as text/xml; XML source must be from
// same domain as HTML file
function loadXMLDoc(url)
{
	// branch for native XMLHttpRequest object
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = processReqChange;
		req.open("GET", url, true);
		req.send(null);
	// branch for IE/Windows ActiveX version
	}
	else if (window.ActiveXObject)
	{
		isIE = true;
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange = processReqChange;
			req.open("GET", url, true);
			req.send();
		}
	}
}

function processReqChange()
{
	// only if req shows "loaded"
	if (req.readyState == 4)
	{
		// only if "OK"
		if (req.status == 200)
		{
			fade("saved");
			xmlInit();
		}
		else
		{
			fade("failed");
		}
   }
}

function getElementTextNS(prefix, local, parentElem, index)
{
    var result = "";
    if (prefix && isIE)
    {
        // IE/Windows way of handling namespaces
        result = parentElem.getElementsByTagName(prefix + ":" + local)[index];
    }
    else
    {
        // the namespace versions of this method 
        // (getElementsByTagNameNS()) operate
        // differently in Safari and Mozilla, but both
        // return value with just local name, provided 
        // there aren't conflicts with non-namespace element
        // names
        result = parentElem.getElementsByTagName(local)[index];
    }
    if (result)
    {
        // get text, accounting for possible
        // whitespace (carriage return) text nodes 
        if (result.childNodes.length > 1)
        {
            return result.childNodes[1].nodeValue;
        }
        else if (result.childNodes.length == 1)
        {
            return result.firstChild.nodeValue;    		
        }
    	else
	    {
    	    return "n/a";
	    }
    }
    else
    {
        return "n/a";
    }
}
