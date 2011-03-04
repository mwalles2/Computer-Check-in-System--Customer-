	<form name="mainForm">
	<div id="tabGeneral">
		<div class="row">
			<div class="cell bottom_border" style="width:100%;">
				<div class="cell" style="width:50%;">
					{DATE}
				</div>
				<div class="cell" style="width:50%; text-align: right;">
					{STATUS}
					<input name="currentStatus" type="hidden" value="{CURRENTSTAT}">
				</div>
			</div>
		</div>
		<div class="row">
			<div class="cell top_space" style="width:100%;">
				<div class="cell header" style="width:25%">
					Name
				</div>
				<div class="cell" style="width:25%">
					{USERNAME}
				</div>
				<div class="cell header" style="width:25%">
					NUID
				</div>
				<div id="nuid" class="cell" style="width:25%">
					{NUID}
				</div>
			</div>
		</div>
		<div class="row">
			<div class="cell header" style="width:25%">
				Phone
			</div>
			<div  id="phone" class="cell" style="width:24%" ondbclick="edit('phone',this)">
				<div class="cell">
					{PHONENUMBER}
				</div>
			</div>
			<div class="cell" style="width:1%">&nbsp;</div>
			<div  class="cell header" style="width:25%">
				E-Mail
			</div>
			<div class="cell" style="width:25%">
				<div class="cell" id="email">
					{EMAILADDRESS}
				</div>
			</div>
		</div>
		<div class="row">
			<div class="cell header" style="width:25%">
				Brand
			</div>
			<div class="cell" style="width:25%">
				{BRAND}
			</div>
			<div  class="cell header" style="width:25%">
				Type
			</div>
			<div class="cell" style="width:25%">
				{TYPE}
			</div>
		</div>
		<div class="row top_space">
			<div class="cell header" style="width:25%">
				Serial Number
			</div>
			<div class="cell" style="width:24%">
				<div class="cell" id="serialnum">
					{SERIALNUM}
				</div>
			</div>
			<div class="cell" style="width:1%">&nbsp;</div>
			<div class="cell header" style="width:25%">
				Backup
			</div>
			<div class="cell">
				{BACKUP}
			</div>
		</div>
		<div class="row top_space">
			<div class="cell bottom_border" style="width:100%">
				<div class="cell header" style="width:25%">
					Network Cards
				</div>
				<div class="cell" style="width:25%">Address</div>
				<div class="cell" style="width:25%">Type</div>
				<div class="cell" style="width:20%">Form Factor</div>
			</div>
		</div>
		<div id="macs">
{MACADDRESSES}		</div>
		<div class="row bottom_space">&nbsp;</div>
		<div class="row">
			<div class="cell header" style="width:33%">External Cards</div>
			<div class="cell" style="width:33%">
				<div class="cell">
					Ethernet:
				</div>
				<div id="cardEth" class="cell" style="padding:0 0 0 5px;">{CARDETH}</div>
			</div>
			<div class="cell" style="width:1%">
				&nbsp;
			</div>
			<div class="cell" style="width:33%">
				<div class="cell">
					Wireless:
				</div>
				<div id="cardWireless" class="cell" style="padding:0 0 0 5px;">{CARDWIRELESS}</div>
			</div>
		</div>
{LAPTOP}		<div class="row top_space">
			<div class="cell bottom_border" style="width:100%">
				<div class="cell header" style="width:33%">
					Accounts
				</div>
				<div class="cell" style="width:33%">Username</div>
				<div class="cell" style="width:29%">Password</div>
			</div>
		</div>
		<div id="accounts">
{ACCOUNTS}		</div>
		<div class="row bottom_space">&nbsp;</div>
		<div id="problemsHeader" class="row">
			<div class="cell header bottom_border" style="width:100%">
				Problems
			</div>
		</div>
		<div id="problemsData" class="row">
			<div class="cell greyBg bottom_side_borders">
{PROBLEMS}
			</div>
		</div>
		<div class="row bottom_space">&nbsp;</div>
		<div id="cdsHeader" class="row">
			<div class="cell header bottom_border" style="width:100%">
				CDs
			</div>
		</div>
		<div id="cdsData" class="row">
			<div class="cell greyBg bottom_side_borders">
{CDS}
			</div>
		</div>
		<div class="row bottom_space">&nbsp;</div>
		<div id="addNote">
			<div id="addNoteHeader" class="row">
				<div class="cell header bottom_border" style="width:100%">
					Add Notes
				</div>
			</div>
		</div>
		<div id="addNoteText" class="row">
			<div class="cell" style="width:100%; text-align: center;">
				<textarea rows="10" cols="80" name="comment"></textarea>
			</div>
		</div>
		<div id="addNoteButtons" class="row">
			<div class="cell" style="width:50%; float:right; text-align: right;">
				<input type="button" value="Save" onclick="saveNote()">
			</div>
		</div>
		<div class="row top_space">
			<div id="userNotesHeader" class="{USERNOTEHEADERCLASS}" style="width:100%">
				<div class="cell header" style="width:50%">
					Notes For User
				</div>
			</div>
		</div>
		<div id="userNotes">
{USERNOTES}		</div>
		<div class="row" style="display:none;">
			<input type="button" value="Saved" onclick="fade2('saved')">
			<input type="button" value="Failed" onclick="fade2('failed')">
		</div>
		<div class="row top_space">
			<div id="fromUserNotesHeader" class="{FROMUSERNOTEHEADERCLASS}" style="width:100%">
				<div class="cell header" style="width:50%">
					Notes From User
				</div>
			</div>
		</div>
		<div id="fromUserNotes">
{FROMUSERNOTES}		</div>
		<div class="row" style="display:none;">
			<input type="button" value="Saved" onclick="fade2('saved')">
			<input type="button" value="Failed" onclick="fade2('failed')">
		</div>
	</div>
	</form>