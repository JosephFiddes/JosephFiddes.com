<?php

/**
* Logs an item to the console
*/
function console_log($item) {
	echo "<script>console.log('" . $item . "');</script>"; 
}

/**
* Echos an item to html, showing it as an error.
*/
function echo_error($item) {
	echo "<span class='error'>" . $item . "</span>";
}