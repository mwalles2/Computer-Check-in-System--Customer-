WDN.feedback = function() {
	
	return {
        initialize : function() {
			//WDN.log("initialize feedback");
			WDN.loadJS('wdn/templates_3.0/scripts/plugins/rating/jquery.rating.js', WDN.feedback.ratingSetup);
			WDN.feedback.commentSetup();
		},
		ratingSetup : function() {
			WDN.log("setting up rating");
			//jQuery('#wdn_feedback').rating().animate({opacity: 'show'}, 2000);
			try {
				WDN.jQuery('#wdn_feedback').rating();
			} catch (e) {}
		},
		commentSetup : function() {
			WDN.jQuery('#wdn_feedback_comments textarea').keyup(
				function(event) {
					if (this.value.length > 0) {
						// Add the submit button
						WDN.jQuery('#wdn_feedback_comments input').css({display:'block'});
					}
				}
			);
			WDN.jQuery('#wdn_feedback_comments').submit(
				function(event) {
					var comments = WDN.jQuery('#wdn_feedback_comments textarea').val();
					WDN.post('http://www1.unl.edu/comments/', {comment:comments});
					WDN.jQuery('#wdn_feedback_comments').replaceWith('<h4>Thanks!</h4>');
					event.stopPropagation();
					return false;
				}
			);
		}
	};
}();