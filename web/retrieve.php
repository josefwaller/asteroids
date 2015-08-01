<?php

	//MySQL Variablesa

	$servername = "localhost";
	$username = "root";
	$password = "soccer";
	$db_name = "eve_codes";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $db_name);

	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	$code = $_POST["code"];

	$sql = "SELECT id, asteroids, evolver, starting_coords FROM Codes";

	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
	        
	    	if ($row["id"] === $code){

	    		echo '
	    		{
	    			"asteroids" : ' . $row["asteroids"] . ',
	    			"evolver" : ' . $row["evolver"] . ',
	    			"starting_coords" : ' . $row["starting_coords"] . '
	    		}';
	    		$conn->close();
	    		die();

	    	}

	    }

	    echo ("No Results");

	} /*else {
	    echo "0 results";
	}*/
	$conn->close();

?>