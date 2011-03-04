// What should be tracked in Google Analytics
// 
// 1. File downloads: .pdf, .doc., etc... put in the /downloads directory DONE
// 2. Social media share uses: track the clicks. Use event tracking DONE
// 3. External links: track links to outside the domain? put in /external directory DONE
// 4. Video usage tracking by default. Should be incorporated with the skin/video JS file
// 5. Navigation preferences. Which view is being used? Use event tracking DONE
// 6. Usage of the wdn_tools. Use event tracking DONE
// 7. Tab content. Use event tracking? Set up a way for departments to take advantage of this tracking?
// 
// _trackEvent(category, action, optional_label, optional_value)
// _trackPageview('/downloads/'+href);
//
// Department variable 'pageTracker' is available to use in this file.

WDN.analytics = function() {  
	
	return {
		thisURL : String(window.location),
		initialize : function() {
			try {
		    	wdnTracker = _gat._getTracker("UA-3203435-1"); 
		        wdnTracker._setDomainName(".unl.edu");
		        wdnTracker._setAllowLinker(true);
		        wdnTracker._setAllowHash(false);
		        wdnTracker._trackPageview();
		    } catch(err) {}
		    
		    WDN.log("WDN site analytics loaded for "+ WDN.analytics.thisURL);
		        filetypes = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3|m4v)$/i; //these are the file extensions to track for downloaded content
		        WDN.jQuery('#navigation a[href], #maincontent a[href]').each(function(){  
					var gahref = WDN.jQuery(this).attr('href');
					if ((gahref.match(/^https?\:/i)) && (!gahref.match(document.domain))){  //deal with the outbound links
						//WDN.jQuery(this).addClass('external'); //Implications for doing this?
						WDN.jQuery(this).click(function() {
							wdnTracker._trackEvent('Outgoing Link', gahref, WDN.analytics.thisURL);
						});  
					}  
					else if (gahref.match(/^mailto\:/i)){  //deal with mailto: links
						WDN.jQuery(this).click(function() {  
							var mailLink = gahref.replace(/^mailto\:/i, '');  
							wdnTracker._trackEvent('Email', mailLink, WDN.analytics.thisURL);
						});  
					}  
					else if (gahref.match(filetypes)){  //deal with file downloads
						WDN.jQuery(this).click(function() { 
							var extension = (/[.]/.exec(gahref)) ? /[^.]+$/.exec(gahref) : undefined;
							wdnTracker._trackEvent('File Download', gahref, WDN.analytics.thisURL); 
							wdnTracker._trackPageview('downloads/'+gahref);
						});  
					}  
				}); 
				WDN.jQuery('ul.socialmedia a').click(function(){ 
					var socialMedia = WDN.jQuery(this).attr('id');
					var success = wdnTracker._trackEvent('Page Sharing', socialMedia, WDN.analytics.thisURL); 
					WDN.log("social share success? "+success);
				});
				WDN.jQuery('#wdn_tool_links a').click(function(){ 
					var wdnToolLinks = WDN.jQuery(this).attr('id');
					wdnTracker._trackEvent('WDN Tool Links', wdnToolLinks, WDN.analytics.thisURL); 
				});
		},
		trackNavigationPreferredState : function(preferredState) {
			try {
				var success = wdnTracker._trackEvent('Navigation Preference', preferredState, WDN.analytics.thisURL);
			} catch(e){};
		}
	};
}();
