<?php

/**
This code is a mess.

Known problems:
If a playlist contains more than 50 items, 
the website will only "see" the first 50 items.
*/

/* Required inputs

$lookup_time_table: 
The SQL table that contains the previous lookup time
for this particular page's data

$vid_info_table:
The SQL table that contains the info for the videos
in this particular page.

$playlist:
The playlist to source the videos from.

$include_description:
Whether or not to include a description with each video.

*/

include_once 'include/video_info_class.php';
include_once "include/dbh.inc.php";
include_once "include/helper.php";

define("API_RETRIEVE_TIME", 60*60); // 1 hour

/**
* Adds a parameter $key=$value to a $url.
* Changes the url inplace.
*/
function addParam(&$url, $key, $value) {
	// str_contains only exists in PHP v8, whereas webserver
	// runs php v7.
	// based on original work from the PHP Laravel framework
	if (!function_exists('str_contains')) {
	    function str_contains($haystack, $needle) {
	        return $needle !== '' && mb_strpos($haystack, $needle) !== false;
	    }
	}

	// Add ? if there aren't any parameters.
	if (!str_contains($url, "?")) {
		$url .= "?";
	} else {
		// Remove previous value of this parameter (if it exists).
		// Find the parts of the string to remove.
		$pos1 = strpos($url, $key, strpos($url, "?"));
		if ($pos1 !== false) {
			$pos2 = strpos($url, "&", $pos1);
			if ($pos2 === false) {
				$pos2 = strlen($url);
			}

			$url = substr_replace($url, "", $pos1, $pos2-$pos1 + 1);
		}

		if ($url[strlen($url)-1] != "&") {
			$url .= "&";
		}
	}

	// Add the parameter.
	$url .= $key . "=" . $value;	
}

/**
* Returns an array of video ids for vids on my channel.
*/
function get_vid_ids($curl, $playlist_title=null) {
	// Setup youtube API request.
	$youtube_api_key = getenv("YOUTUBE_API_KEY");
	$my_channel_id = 'UCBnl9RREvCWnDPLUCcwi52Q';

	$video_ids = array();

	if ($playlist_title!=null) {
		// Grab my playlists
		$video_search_url = 'https://www.googleapis.com/youtube/v3/playlists';

		addParam($video_search_url, "key", $youtube_api_key);
		addParam($video_search_url, "channelId", $my_channel_id);
		addParam($video_search_url, "maxResults", "20");
		addParam($video_search_url, "part", "snippet");

		curl_setopt($curl, CURLOPT_URL, $video_search_url);
		$response = curl_exec($curl);

		if ($e = curl_error($curl)) {
			echo $e;
		} else {
			$res = json_decode($response);
		}

		// Find the relevant playlist's ID.
		$playlist_id = "";
		foreach ($res->items as $item) {
			if ($item->snippet->title == $playlist_title) {
				$playlist_id = $item->id;
				break;
			}
		}

		$video_search_url = 'https://www.googleapis.com/youtube/v3/playlistItems';
		addParam($video_search_url, "key", $youtube_api_key);
		addParam($video_search_url, "channelId", $my_channel_id);
		addParam($video_search_url, "part", "snippet");
		addParam($video_search_url, "maxResults", "50");
		addParam($video_search_url, "playlistId", $playlist_id);

		curl_setopt($curl, CURLOPT_URL, $video_search_url);
		$response = curl_exec($curl);

		if ($e = curl_error($curl)) {
			echo $e;
		} else {
			$res = json_decode($response);
		}

		//console_log($response);

		if (property_exists($res, "error")) {
			echo_error($res->error->message);
			array_push($video_ids, "dQw4w9WgXcQ");
			return $video_ids;
		}

		$items = $res->items;

		// Get the videos in REVERSE chronological order.
		$vid_counter = 0;
		for ($i=count($items)-1; $i>=0; $i--) {
			if ($items[$i]->snippet->resourceId->kind === "youtube#video") {
				$videoId = $items[$i]->snippet->resourceId->videoId;
				array_push($video_ids, $videoId);
				$vid_counter++;

				if ($vid_counter >= 8) {
					break;
				}
			}
		}

	} else {
		// Just search for any of my videos.
		$video_search_url = 'https://www.googleapis.com/youtube/v3/search';

		addParam($video_search_url, "key", $youtube_api_key);
		addParam($video_search_url, "channelId", $my_channel_id);

		addParam($video_search_url, "order", "date");
		addParam($video_search_url, "maxResults", "5");

		// Get video IDs for videos on my channel.
		$i = 0;	

		curl_setopt($curl, CURLOPT_URL, $video_search_url);

		$response = curl_exec($curl);

		if ($e = curl_error($curl)) {
			echo $e;
		} else {
			$res = json_decode($response);
		}

		if (property_exists($res, "error")) {
			echo_error($res->error->message);
			throw new Exception($res->error->message);
			array_push($video_ids, "dQw4w9WgXcQ");
			return $video_ids;
		}

		$items = $res->items;

		foreach ($items as $item) {
			if ($item->id->kind === "youtube#video") {
				$videoId = $item->id->videoId;
				array_push($video_ids, $videoId);
				//echo $videoId . "\n";
			}
		}
	}

	return $video_ids;
}

/**
* Returns an array of video information for each video in my channel.
* Takes the ids of the videos necessary to retrieve as input.
*/
function get_vid_info($video_ids, $curl) {
	$youtube_api_key = getenv("YOUTUBE_API_KEY");

	$video_infos = array();

	// Get the youtube videos for each video ID.
	$video_get_url = 'https://www.googleapis.com/youtube/v3/videos';
	addParam($video_get_url, "key", $youtube_api_key);
	addParam($video_get_url, "part", "snippet");

	// Add each video information to 'video_infos'.
	foreach ($video_ids as $v_id) {
		addParam($video_get_url, "id", $v_id);
		curl_setopt($curl, CURLOPT_URL, $video_get_url);

		$response = curl_exec($curl);
		$res = json_decode($response);

		array_push($video_infos, Video_Info::new_from_API($v_id, $res->items[0]->snippet));
	}

	return $video_infos;
}

function get_prev_youtube_lookup_time($conn, $table_name) {
	$value = mysqli_fetch_assoc(mysqli_query($conn, "SELECT value FROM " . $table_name . ";"))['value'];

	return $value;
}

function set_prev_youtube_lookup_time($conn, $value, $table_name) {
	mysqli_query($conn, "DELETE FROM " . $table_name);
	mysqli_query($conn, "INSERT INTO " . $table_name . " (value) " . 
					 "VALUES ('" . $value . "');");
}

function refresh_database($conn, $video_infos, $table_name, $lookup_time_table_name) {
	mysqli_query($conn, "DELETE FROM " . $table_name);

	foreach ($video_infos as $v) {
		$v->add_to_database($conn, $table_name);
	}

	set_prev_youtube_lookup_time($conn, time(), $lookup_time_table_name);
}

////////////////////////////////// MAIN //////////////////////////////////////////


// If it's been more than an hour since last API lookup:
if (time() > get_prev_youtube_lookup_time($conn, $lookup_time_table) + API_RETRIEVE_TIME) {
	$api_retrieval_success = true;
	try {
		$video_infos = Video_Info::get_vid_info_from_youtube_api($conn, $vid_info_table, $playlist);
	} catch (Exception $e) {
		$api_retrieval_success = false;
	}

	if ($api_retrieval_success) {
		// Replace the video info in the database.
		refresh_database($conn, $video_infos, $vid_info_table, $lookup_time_table);

		console_log("Videos collected from YouTube API");
	} else {
		// API calls unsuccessful. Grab from database instead.
		$video_infos = Video_Info::get_vid_info_from_database($conn, $vid_info_table);

		console_log("Videos collected from server database after unsuccessful attempt at collecting from the youtube API.");
	}
} else {
	// Grab youtube data from database.
	$video_infos = Video_Info::get_vid_info_from_database($conn, $vid_info_table);

	console_log("Videos collected from server database");
}

// Display information for each video.
foreach ($video_infos as $v) {
	$v->embed($include_description);
}