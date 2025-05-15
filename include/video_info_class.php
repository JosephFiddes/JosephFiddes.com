<?php

// Class that holds video info, for entry into database.
class Video_Info {
	public $id;
	public $title;
	public $description;

	// Construct the video_info object.
	private function __construct() {
	}

	static function new_from_API($id, $snippet) {
		$new_vid = new Video_Info();

		$new_vid->id = $id;
		$new_vid->title = $snippet->title;
		$new_vid->description = str_replace("\n", "<br>", $snippet->description);

		return $new_vid;
	}

	static function new_from_database($id, $title, $description) {
		$new_vid = new Video_Info();

		$new_vid->id = $id;
		$new_vid->title = $title;
		$new_vid->description = $description;

		return $new_vid;		
	}

	// Add this video_info to the database.
	// $conn is the database connection.
	function add_to_database($conn, $table_name) {
		$table_name = "`" . $table_name . "`";

		// Convert vid data to json - change some characters along the way.
		$str_this = str_replace("'", "''", json_encode($this));
		$str_this = str_replace('\\', '\\\\', $str_this);

		$sql_query = "INSERT INTO " . $table_name . " (video) " . 
					 "VALUES ('" . $str_this . "');";

		if (mysqli_query($conn, $sql_query)) {
		} else {
			echo "<h4>" . $conn->error . "<br><br></h4>";
		}
	}

	// embed this video into html doc.
	function embed($include_description) {
		$embed_str = '<div class="youtube-vid">';
		$embed_str .= $this->get_youtube_vid_html();

		$embed_str .= '<div class="youtube-description">';
		// Add title and description.
		$embed_str .= "<h2 class='no-margin'>" . $this->title . "</h2>";

		if ($include_description) {
			$embed_str .= "<p>" . $this->description . "</p>";
			$embed_str .= "<div class='gradient-back'></div>";
		}

		$embed_str .= "</div></div>";

		echo $embed_str;
	}

	function get_youtube_vid_html() {
		$width=560; // default: 560
		$height=315; // default: 315

		// Youtube video boiler plate stuff.
		return '<div class="iframe-wrapper"><div class="iframe-container youtube-embed"><iframe src="https://www.youtube.com/embed/' . $this->id . '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div>';
	}	

	// Grabs the youtube info from the database, and returns it
	// as an array of 'Video_Info's.
	static function get_vid_info_from_database($conn, $table_name) {
		$table_name = "`" . $table_name . "`";

		$videos = array();
		$query = mysqli_query($conn, "SELECT video FROM " . $table_name . ";");
		
		while ($vid = mysqli_fetch_assoc($query)) {
			$vid = $vid['video'];
			$vid = str_replace('\\\\', '\\', $vid);
			$vid = str_replace("''", "'", $vid);

			$vid = json_decode($vid);

			$vid = Video_Info::new_from_database($vid->id, $vid->title, $vid->description);

			array_push($videos, $vid);
		}

		return $videos;
	}

	// Gets the youtube info from the youtube API, and returns it
	// as an array of 'Video_Info's.
	static function get_vid_info_from_youtube_api($conn, $table_name, $playlist) {
		// Contact youtube API to get youtube data.
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

		$video_ids = get_vid_ids($curl, $playlist);
		$video_infos = get_vid_info($video_ids, $curl);

		curl_close($curl);	

		return $video_infos;
	}
}