	<div style="clear:both; text-align:center; padding:0 0 20px 0;">
		Welcome to the University of Nebraska&ndash;Lincoln Computer Help Center electronic check-in system.
	</div>
	<div id="error" class="errorBox"></div>
	<div id="userName" style="float:left; text-align:center; width:100%;">
		<form name="login" action="javascript:tryAuth()" method="post">
			Please enter your username and password below.
			<div>Username: <input name="username" type="text" /></div>
			<div>Password: <input name="password" type="password" /></div>
			<div><input name="submit" type="submit" value="Login" /></div>
			<input type="hidden" name="uri" value="{URI}" />
		</form>
	</div>
	<div style="text-align:center">
		There are currently <span style="color:#F00">{CURRENTNOTDONE}</span> computers in our work queue.
		<br />We finished <span style="color:#F00">{DONETHISWEEK}</span> computers in the last week.
	</div>
