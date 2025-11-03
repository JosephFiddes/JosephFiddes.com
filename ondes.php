<?php
	include_once 'include/header.php';
?>

	<div class="page-description">
		<p>The ondes Martenot is a musical instrument invented by Maurice Martenot in 1928. It is one of the very early electronic synthesizers, and its sound will be familiar to those who have heard the theramin. </p>
		<p>One of the most fascinating aspects of the ondes Martenot is its method of control. The &#x201C;ribbon&#x201D; is a piece of wire with a ring in the middle where the performer places their finger. By moving the ring to the left and right, the performer can change the pitch of the generated sound.</p>
		<p>There are probably only a few hundred or thousand ondes Martenots in the world right now, and I'd like to rectify that.</p>
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

			$lookup_time_table = "ondes_prev_youtube_lookup_time";
			$vid_info_table = "ondes_youtube_video_info";
			$playlist = "Ondes Martenot";
			$include_description = false;

			include_once 'include/get_data.php';
		?>
	</div>

	<?php
		include_once 'include/footer.php';
	?>