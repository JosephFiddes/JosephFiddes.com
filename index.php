<?php
	include_once 'include/header.php';
?>
	<div class="bulk_text">
		<div class="main_body">

			<div>
				<div class="blog">
					<img src="img/hero.png">

					<h1>Welcome!</h1>
					<p>You have arrived at my website. My name is Joseph Fiddes, and I am using this website as a hub for my various creative projects.</p>
					<p>My most important project at the time of writing is my ondes Martenot construction, but if old-fashioned synthesizers aren't your thing, I have also made music, video games, and various other things for your perusal.</p>
					<p>Feel free to check out my various social medias and such. Perhaps even subscribe to my YouTube channel, but most importantly: have fun!</p>
				</div>

				<div class="videos">
					<?php 
						$lookup_time_table = "prev_youtube_lookup_time";
						$vid_info_table = "youtube_video_info";
						$playlist = null;
						$include_description = true;

						include_once 'include/get_data.php';
					?>
				</div>
			</div>
		</div>
	</div>

	<?php
		include_once 'include/footer.php';
	?>