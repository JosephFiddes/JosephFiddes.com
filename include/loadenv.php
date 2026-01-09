<?php

/** Get environment variables from .env, 
 * and put them on the environment variables list.
 * Credit: Kareem
 * https://stackoverflow.com/a/77305725
*/
$env = file_get_contents(dirname(__DIR__, 1) . "/.env");
$lines = explode("\n",$env);

foreach($lines as $line){
	$line = trim($line);
	preg_match("/([^#]+)\=[\"']?([^\"']*)/",$line,$matches);
	if(isset($matches[2])){ putenv($line); }
} 