	<form name="mainForm" action="javascript:null()">
{CONTENT}
	</form>
	<form name="errorForm" action="javascript:null()">
		<div class="error" id="phoneError">
			<div class="errorhead">&nbsp;</div>
			<div class="errorbody">
				Please enter a valid Phone number:
				<br><input type="text" name="errorPhone" value="" />
				<br><input type="button" value="Submit" onclick="endError('phone')"> <input type="button" value="Cancel" onclick="cancelError('phone')">
			</div>
			<div class="errorfoot">&nbsp;</div>
		</div>
		<div class="error" id="emailError">
			<div class="errorhead">&nbsp;</div>
			<div class="errorbody">
				Please enter a valid EMail address:
				<br><input type="text" name="errorEmail" value="" />
				<br><input type="button" value="Submit" onclick="endError('email')"> <input type="button" value="Cancel" onclick="cancelError('email')">
			</div>
			<div class="errorfoot">&nbsp;</div>
		</div>
		<div class="error" id="twitterError">
			<div class="errorhead">&nbsp;</div>
			<div class="errorbody">
				Please enter a valid Twitter account or select a different service:
				<br><input type="text" name="errorTwitter" value="" />
{SERVICESELECTERROR}				<br><input type="button" value="Submit" onclick="endError('twitter')"> <input type="button" value="Cancel" onclick="cancelError('twitter')">
			</div>
			<div class="errorfoot">&nbsp;</div>
		</div>
		<input type="hidden" name="cid" value="" />
	</form>
