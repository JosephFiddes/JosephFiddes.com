<?php

$dbServername = "localhost"; 
$dbUsername = "root";
$dbPassword = "";
$dbName = "joes_data";

if (!file_exists("zzzDO_NOT_UPLOAD.txt")) {
	$dbServername = "localhost:3306";
	$dbUsername = "dvcmpbmy_WPFT4";
	$dbPassword = "o6iZfA5119x15i";
	$dbName = "dvcmpbmy_WPFT4";
}

$conn = mysqli_connect($dbServername, $dbUsername, 
	$dbPassword, $dbName);