function buttonManager(actionObject, dataObject)
{
	switch(actionObject['action'])
	{
		case 'init':
			for(currentTab in dataObject)
			{
				accordionTab = '<h3>'+dataObject[currentTab]+'</h3>';
				accordionTab += '<div id='+currentTab+'></div>';
				$('#leftColumn').append(accordionTab);
			}
			//set the accordian containers
			$('.accordion').accordion({'heightStyle': 'content', 'collapsible': true, active: false});
			break;
		case 'setHoverListener':
			//set hover listener for element in dataObject
			$('#'+dataObject['id']).on('mouseenter', function()
			{
				$('#'+dataObject['id']).addClass('hover');
			});
			$('#'+dataObject['id']).on('mouseleave', function()
			{
				$('#'+dataObject['id']).removeClass('hover');
			});
			break;
		case 'setClickListener':
			//clear all current click listeners
			$('#'+dataObject['id']).off('click');
			//set up click listener with function passed in dataObject
			$('#'+dataObject['id']).on('click', 
				function()
				{
					//passed checkLogin to dataObject
					window[dataObject['function']]();
				});
			break;
		case 'addClickListener':
			$('#'+dataObject['id']).on('click', function()
			{
				if(typeof dataObject['game'] !== 'undefined')
				{
					window[dataObject['function']](dataObject['game']['titleId'], dataObject['xuid']);
				}
				else if(typeof dataObject['recentActivity'] !== 'undefined')
				{
					window[dataObject['function']](dataObject['recentActivity']['titleId'], dataObject['xuid']);
				}
				else
				{
					window[dataObject['function']](dataObject['xuid']);
					//checkLogin();
				}
			});
			break;
		case 'replaceButton':
			//replace the object id first
			$('#'+dataObject['idToRemove']).attr('id', dataObject['idToAdd']);
			//replace the value
			$('#'+dataObject['idToAdd']).val(dataObject['newValue']);
			break;
	}
}