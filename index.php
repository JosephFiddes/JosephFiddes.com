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
					
					<h2>Twitch Stream</h2>

					<p>A live stream of completely improvised music. There are no rehearsals, no plans, no sheets, and nothing pre-recorded.</p>

					<p>Will it transcend all previous music? Or will it be an unlistenable trainwreck? There is only one way to find out.</p>

					<!-- Value of parent dynamic to webpage (whether at josephfiddes.com or at localhost -->
					<?php
					    echo '	
					    <div>
							<iframe
							    src="https://player.twitch.tv/?channel=joseph_fiddes&parent=' .  
							    	$_SERVER['HTTP_HOST'] . '" 
							    width="100%"
							    onload="resizeIframe(this)"
							    allowfullscreen>
							</iframe>
						</div>';
					?>

					<h2>Tutoring</h2>

					<p>Are you looking for a piano tutor?</p>
					
					<p>I am available to tutor beginner and intermediate piano players in the Bayside area. I have some experience tutoring from back in 2017, and since I'm finished with my university studies I'm looking to get back into it.</p>

					<p>I completed AMEB grade 8 in 2017. I have a Diploma in Music from the University of Melbourne, as well as a Bachelor of Science and a Master of Mechatronics Engineering. I've played in various bands and ensembles of vast genres including blues, jazz, and classical. </p>


					<p>In addition to piano technique, I intend to teach a vast array of skills, including sight-reading, improvisation, theory, and composition. I believe rote learning of repertoire is but a component of a full-featured music education.</p>

					<p>I'm available most weekdays all times, although 5-7PM is preferred. I can travel to yours, or you can come to mine. I have a valid working with children check. </p>

					<p><a href="mailto:fiddj13@live.com.au?subject=Sent%20from%20website%3A" class="text-link" target="_blank" rel="noopener noreferrer">
						Click here to contact me!</a></p>

					<p><a href="https://www.youtube.com/playlist?list=PLERg3naGdTUkNyvPJBwy6eJhYJx38RQNo" class="text-link" target="_blank" rel="noopener noreferrer">
						Click here to check out some of my piano work!</a></p>

					<h3>Rates</h3>
					<ul>
						<li>$40 for a half-hour lesson.</li>
						<li>$60 for an hour lesson.</li>
					</ul>

					<p>First lesson will be free.</p>

				</div>

				<div class="videos">
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