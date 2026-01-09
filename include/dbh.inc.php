<?php

include_once "include/helper.php";
include_once "include/loadenv.php";

$dbServername = getenv("DB_HOST");
$dbUsername = getenv("DB_USERNAME");
$dbPassword = getenv("DB_PASSWORD");
$dbName = getenv("DB_DATABASE");

$conn = mysqli_connect($dbServername, $dbUsername, 
	$dbPassword, $dbName);