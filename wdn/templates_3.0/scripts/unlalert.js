/* Constructor */
var unlAlerts = new function() {};

WDN.unlalert = function() {
	return {
		
		//data_url : 'http://alert1.unl.edu/json/unlcap.js',
		data_url : 'http://ucommbieber.unl.edu/ucomm/templatedependents/templatesharedcode/scripts/alert.master.server.js',
		
		current_id : false,
		
		initialize : function()
		{
			WDN.log('Initializing the UNL Alert Plugin');
			WDN.unlalert.checkIfCallNeeded();
		},
		
		checkIfCallNeeded: function() {
			if (WDN.unlalert._dataHasExpired()) {
				WDN.unlalert._callServer();
			}
		},
		
		dataReceived: function() {
			WDN.log('UNL Alert data received');
		    /* Set cookie to indicate time the data was aquired */
	    	WDN.setCookie('unlAlertsData','y', 15);
	    	setTimeout(WDN.unlalert.checkIfCallNeeded, 30000);
		},
		
		/*------ Check if the data has expired ------*/
		_dataHasExpired: function() {
			var c = WDN.getCookie('unlAlertsData');
			if (c) {
				return false;
			} else {
				return true;
			}
		},
	
		_callServer: function() {
			WDN.log('Checking the alert server for data');
			var head = document.getElementsByTagName('head').item(0);
			var old  = document.getElementById('lastLoadedCmds');
			if (old) head.removeChild(old);
			var currdate = new Date();
			script = document.createElement('script');
			script.src = WDN.unlalert.data_url+'?'+currdate.getTime();
			script.type = 'text/javascript';
			script.defer = true;
			script.id = 'lastLoadedCmds';
			void(head.appendChild(script));
			
			/* check if alert1 server is up*/
			var time = setTimeout(function(){
				if (WDN.unlalert._dataHasExpired()) {
					// Data still has not loaded successfully, change to alert 2 server and try again.
					WDN.unlalert.data_url = 'http://alert2.unl.edu/json/unlcap.js';
					WDN.unlalert._callServer();
					clearTimeout(time);
				} else {
					//only need to run this once, if alert 2 is also down, we're screwed
					clearTimeout(time);
				}
			}, 10000);
	
		},
		
		/*------ check if alert was acknowledged ------*/
		alertWasAcknowledged: function(id) {
			return false;
			var c = WDN.getCookie('unlAlertIdClosed_'+id);
			if (c) {
				return true;
			} else {
				return false;
			}
		},
		
		/*------ acknowledge alert, and don't show again ------*/
		_acknowledgeAlert: function(id) {
			WDN.setCookie('unlAlertIdClosed_'+id,id,3600);
		},
		
		/*------ building alert message ------*/
		alertUser: function(root, uniqueID) {
			WDN.log('Alerting the user');
			if (WDN.unlalert.alertWasAcknowledged(uniqueID)) {
				WDN.log('Alert was previously acknowledged');
				// Ignore this alert... the user has already acknowledged it.
			} else {
				var LatestAlert = root;
				var alertTitle = LatestAlert.headline;
				var alertDescription = LatestAlert.description;
				var alertID = uniqueID;
				if (WDN.jQuery("#alertbox").length == 0) {
					WDN.jQuery('#maincontent').append('<div id="alertbox"></div>');
					WDN.jQuery('#wdn_tool_links').prepend('<li><a id="unlalerttool" class="alert tooltip" title="Emergency Alert: An alert has been issued!" href="#alertbox">UNL Alert</a></li>');
				}
				WDN.unlalert.current_id = uniqueID;
				WDN.jQuery('#alertbox').html('<a href="#" id="closeAlert" onclick="WDN.unlalert.closeAlert(); return false;">(close)</a><div id="alertboxContent"><h1>' + alertTitle + '</h1><p>'+ alertDescription +'<!-- Number '+uniqueID+' --></p></div>');
				WDN.jQuery().bind('cbox_close', WDN.unlalert.closeAlert);
				WDN.jQuery('#unlalerttool').colorbox({inline:true,width:"640px",href:"#alertbox",open:true});
			}
		},
		
		/*------ close alert box ------*/
	 	closeAlert: function() {
	 		//create alert box
			WDN.jQuery('#alertbox').hide();
			WDN.unlalert._acknowledgeAlert(WDN.unlalert.current_id);
		}
	};
}();

/* server side scripts for UNL Alert System */
unlAlerts.server = {

    /*------ initiate alert message if message is critical ------*/
    init: function() {
    	/* We have received the data */
		WDN.unlalert.dataReceived();
		
		/* get the root of the alert data tree*/
		var alertInfo = unlAlerts.data.alert.info;

		/* get unique ID */
		var alertUniqueID = alertInfo.parameter.value;
		
		// If alert file has a info element with severity == extreme
		if (alertInfo.severity == 'Extreme') {
			WDN.log("Found an alert, calling alertUser()");
			return WDN.unlalert.alertUser(alertInfo, alertUniqueID);
		} else {
			return false;
		}
	}
};