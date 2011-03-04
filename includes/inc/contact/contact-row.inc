			<div class="row_wide">
				<div id="main{CID}" class="cell" style="width:100%;">
					<div class="cell" style="width:5%">
						<input type="checkbox" name="locationActive{CID}" onclick="activeUpdate(this,'{CID}')"{ACTIVE}>
					</div>
					<div class="cell" id="dataDiv{CID}" style="width:{DATAWIDTH}%;">
						<div id="dataContainer{CID}" class="data {TYPE}">
							<input type="text" id="dataTextBox{CID}" name="dataTextBox{CID}" style="width:98%;{DATAINPUT}" />
							<span id="dataSpan{CID}">{DATA}</span>
							<span id="serviceNameSpan{CID}" style="{SERVICENAMESTYLE}">{SERVICENAME}</span>
						</div>
					</div>
					<div class="cell" id="contactServiceCell{CID}" style="width:13%; z-index:9;{SERVICESELECTSHOW}">
{SERVICESELECT}					</div>
					<div class="cell" style="width:15%; z-index:9;">
{LOCATIONSELECT}					</div>
					<div class="cell" id="buttonDiv{CID}" style="{DATAINPUT}">
						<input type="button" name="saveButton{CID}" value="Save" onclick="checkData('{CID}','{TYPE}')" />
						<input type="button" name="cancelButton{CID}" value="Cancel" onclick="cancelRow('{CID}')" />
					</div>
				</div>
			</div>
			<div class="row_wide" id="serviceContactRow{CID}" style="{SERVICESHOW}">
				<div id="options" class="cell" style="width:100%;">
					<div class="cell" style="width:5%">&nbsp;</div>
					<div class="cell">
						<input type="checkbox" name="serviceContact{CID}" onclick="contactMeUpdate(this,'{CID}')"{CONTACTME}> Automatically contact me on this account with status updates
					</div>
				</div>
			</div>
			<div class="errorBox" id="contactError{CID}"></div>
