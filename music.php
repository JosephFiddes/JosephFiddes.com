<?php
	include_once 'include/header.php';
?>

	<div class="page-description">
		This page contains some of the music I've made.
	</div>

	<div class="video-page-list">
		<?php 
			// Get environment variables from .env, 
			// and put them on the environment variables list.
			// Credit: Kareem
			// https://stackoverflow.com/a/77305725
			$env = file_get_contents(__DIR__ . "/.env");
			$lines = explode("\n",$env);

			foreach($lines as $line){
				$line = trim($line);
				preg_match("/([^#]+)\=[\"']?([^\"']*)/",$line,$matches);
				if(isset($matches[2])){ putenv($line); }
			} 

			$lookup_time_table = "music_prev_youtube_lookup_time";
			$vid_info_table = "music_youtube_video_info";
			$playlist = "Original Music";
			$include_description = false;

			include_once 'include/get_data.php';
		?>
	</div>

	<?php
		include_once 'include/footer.php';
	?>