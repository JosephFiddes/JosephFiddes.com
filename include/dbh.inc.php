<?php

include_once "include/helper.php";

$dbServername = getenv("DB_HOST");
$dbUsername = getenv("DB_USERNAME");
$dbPassword = getenv("DB_PASSWORD");
$dbName = getenv("DB_DATABASE");

console_log(substr($dbPassword, 0, 10));

$conn = mysqli_connect($dbServername, $dbUsername, 
	$dbPassword, $dbName);