<?php

$dbServername = "localhost"; 
$dbUsername = "root";
$dbPassword = "";
$dbName = "joes_data";

$dbName = "dvcmpbmy_WPFT4";

if (!file_exists("_bIsLocal.txt")) {
	$dbServername = "localhost:3306";
	$dbUsername = "dvcmpbmy_WPFT4";
	$dbPassword = "o6iZfA5119x15i";
	$dbName = "dvcmpbmy_WPFT4";
}

$conn = mysqli_connect($dbServername, $dbUsername, 
	$dbPassword, $dbName);