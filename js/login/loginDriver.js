$(document).ready()
{
	//setup the fade in background
	//jqueryUIWrapper({'action': 'fadeToGreen'}, {'element': '.container'});

	//add login button once scripts have loaded
	$('#inputDiv').children().first().append('<input type="button" id="loginButton" value="Username Goes Here!" class="btn">');
	$('#loginButton').removeClass('disabled');
	
	setTimeout(function()
	{
		//set the hover events for button
		//@TODO set the styling for the hover class
		buttonManager({'action': 'setHoverListener'}, {'id': 'loginButton'});
		//set up click listener
		buttonManager({'action': 'setClickListener'}, {'id': 'loginButton', 'function': 'checkLogin'});
	}, 300);
}