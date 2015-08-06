<?php

	//MySQL Variables

	$url = parse_url(getenv("CLEARDB_DATABASE_URL"));

	$servername = $url["host"];
	$username = $url["user"];
	$password = $url["pass"];
	$db_name = substr($url["path"], 1);

	// Create connection
	$conn = new mysqli($servername, $username, $password);

	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	//Creates database
	
	$db = "CREATE DATABASE IF NOT EXISTS " . $db_name;

	//checks if database creation was successful

	if ($conn->query($db) !== TRUE){
		die("Failure to create database " . $db);
	}

	//Selects the database (Used if the database was already created)

	mysqli_select_db($conn, $db_name);

	$codes = "CREATE TABLE IF NOT EXISTS Ideas (

		id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		description VARCHAR(5000) NOT NULL
	)";

	if ($conn->query($codes) !== TRUE) {
	    die ("Error creating table: " . $conn->error . "<br>
	    	Please contact the administrator at josef@josefwaller.com");
	}
		
	$desc = $_POST["desc"];

	$sql = "INSERT INTO Ideas (description)
	VALUES ('" . $desc . "')";


	if ($conn->query($sql) === TRUE) {
	    $code = $conn->insert_id;
	} else {
	    die("Error: " . $conn->error);
	}


	header("Location: index.php");


?>