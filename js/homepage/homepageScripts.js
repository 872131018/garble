function uploadImage()
{
	$.post('/garble/php/homepage/homepageDriver.php', 
		{
			'action': 'uploadImage',
	  		'image': $('#leftColumn img').first().get(0).src
		}, 
		function(response)
		{
			response = response.split(',');
			var responseMessage = response[0];
			var fileName = response[1];
			switch(responseMessage)
			{
				case 'uploadSuccess':
					//assign the image the filename so it can be recalled later
					$('#leftColumn img').last().attr('id', fileName);
					//add upload button once you have an img
					$('#rightColumn').append('<input type="button" id="downloadButton" value="Click to Show Image!" class="btn" data-association="'+fileName+'">');
					//set the hover events for button
		       		buttonManager({'action': 'setHoverListener'}, {'id': 'downloadButton'});
		        	//set up click listener
		        	buttonManager({'action': 'setClickListener'}, {'id': 'downloadButton', 'function': 'downloadImage'});
					break;
				default:
					window.location = '/garble/html/login.html';
					break;
			}
		});
}

function downloadImage()
{
	//need to retrieve image from server once its loaded
	$.post('/garble/php/homepage/homepageDriver.php', 
		{
			//@TODO associate download with filename and button
			action: 'downloadImage',
			fileName: $('#downloadButton').data('association')
		},
		function(response)
		{
			//generate a new image tag from canvas
			var image = new Image();
			image.src = response;
			//put the image in the left column
			$('#rightColumn').append(image);
		});
}

function takePicture()
{
	//write video steam to canvas then convert canvas content to <img>
	canvasContext.drawImage(video, 0, 0, 320, 240);
	//generate a new image tag from canvas
	var image = new Image();
	image.src = $('#canvas').get(0).toDataURL("image/png");
	//put the image in the left column
	$('#leftColumn').append(image);
	//add upload button once you have an img
	$('#leftColumn').append('<input type="button" id="uploadButton" value="Click to Save Image!" class="btn">');
	//set the hover events for button
    buttonManager({'action': 'setHoverListener'}, {'id': 'uploadButton'});
    //set up click listener
    buttonManager({'action': 'setClickListener'}, {'id': 'uploadButton', 'function': 'uploadImage'});
}