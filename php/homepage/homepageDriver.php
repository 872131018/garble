<?php
	require '../common/connector.php';
	//use this for mac 
	$connector = new connector('127.0.0.1', 'root', 'root', 'Garble');
	if(isset($connector))
	{
		$connector -> createConnection();
	}
	else
	{
		die('Error creating connector!'."\n");
	}
	//ensure login is still valid
	session_start();
	if(!isset($_SESSION['username']))
	{
		$_POST['action'] = 'sessionEnded';
	}
	//use for command line
	//$_POST['action'] = 'uploadImage';
	//$_POST['username'] = 'john';
	//$_POST['image'] = '123';
	switch($_POST['action'])
	{
		//check what function to do
		case 'uploadImage':
			//TODO: create a directory structure to seperate the images into user folders
			//idk if I really need to strip the tags off the data
			//$data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $_POST['image']));
			$fileName = uniqid($_SESSION['username']).'.png';
			if(file_put_contents('/Applications/MAMP/htdocs/garble/images/'.$fileName, $_POST['image']) != FALSE)
			{
				$queryString = 'INSERT INTO imageDirectory (username, imageAt) ';
				$queryString .= 'VALUES ('.'"'.$_SESSION['username'].'"'.', '.'"'.$fileName.'"'.')';
				$result = $connector -> doQuery($queryString);
				if($result != 'true')
				{
					echo 'uploadFailure';
				}
				else
				{
					echo 'uploadSuccess'.','.$fileName;
				}
			}
			break;
		case 'downloadImage':
			//@TODO: reconsider the directory structure for saving the images
			$queryString = 'SELECT imageAt FROM imageDirectory WHERE imageAt="';
			$queryString .= $_POST['fileName'].'"';
			$result = $connector -> doQuery($queryString);
			if($result->num_rows > 0)
			{
				//case sensitive
				$result = $result -> fetch_assoc();
				echo file_get_contents('../../images/'.$result['imageAt']);
			}
			else
			{
				echo 'imageNotFound';
			}
			break;
		default:
			echo 'sessionEnded';
			break;
	}
	$connector -> closeConnection();
?>