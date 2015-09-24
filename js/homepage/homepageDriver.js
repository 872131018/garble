$(document).ready(
	function()
	{
		// Grab elements, create settings, etc.
		canvasContext = $('#canvas').get(0).getContext("2d");
		video = $('#video').get(0);
		errBack = 
			function(error) 
			{
				console.log("Video capture error: ", error.code); 
			};
		// Put video listeners into place
		if(navigator.getUserMedia) 
		{ 
			// Standard
			navigator.getUserMedia({ "video": true }, 
				function(stream)
				{
					video.src = stream;
					video.play();
				}, 
				errBack);
		} 
		else if(navigator.webkitGetUserMedia)
		{ 
			// WebKit-prefixed
			navigator.webkitGetUserMedia({ "video": true }, 
				function(stream)
				{
					video.src = window.URL.createObjectURL(stream);
					video.play();
				}, 
				errBack);
		}
		else if(navigator.mozGetUserMedia) 
		{ 
			// Firefox-prefixed
			navigator.mozGetUserMedia({ "video": true }, 
				function(stream){
					video.src = window.URL.createObjectURL(stream);
					video.play();
				}, 
				errBack);
		}
		//set up the navigation menu

		buttonManager({'action': 'setClickListener'}, {'id': 'snap', 'function': 'takePicture'});
	}
);