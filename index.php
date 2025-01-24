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
					
					<p>Watch this space - I plan to put something fun here.</p>
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