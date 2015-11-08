<?php
	require '../common/connector.php';
	//create a connection to the server
	//$connector = new connector('127.0.0.1', 'root', '', 'Xbox');
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
	//use for command line
	//$_POST['action'] = 'login';
	//$_POST['username'] = 'john';
	//$_POST['password'] = 'john';

	switch($_POST['action'])
	{
		//check what function to do
		case 'login':
			//determine if the user is registered
			$queryString = 'SELECT username, password ';
			$queryString .= 'FROM registeredUsers WHERE username=';
			$queryString .= '"'.$_POST['username'].'"';
			$result = $connector -> doQuery($queryString);
			if($result->num_rows > 0)
			{
				//case sensitive
				$result = $result->fetch_assoc();
				if($result['username'] == $_POST['username'] && $result['password'] == $_POST['password']) 
				{
					//set the username as a session variable for later use 
					session_start();
					$_SESSION['username'] = $_POST['username'];

					$result = 'loginSuccess';
					echo $result;
				} 
				else 
				{
					$result = 'loginFailure';
					echo $result;
				}
			}
			else
			{
				//user not in database must register them
				echo 'noResults';
			}
			break;

		case 'addUser':
			$queryString = 'INSERT INTO registeredUsers (username, password) ';
			$queryString .= 'VALUES ('.'"'.$_POST['username'].'"'.', '.'"'.$_POST['password'].'"'.')';
			$result = $connector -> doQuery($queryString);
			if($result != 'true')
			{
				echo 'false';
			}
			else
			{
				echo 'true';
			}
			break;
		/*
		case 'loadHomepage':
			echo file_get_contents('../html/homepage.html');
			break;
		*/
	}
	$connector -> closeConnection();
?>