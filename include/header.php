<!--
TODO:

 - Put something bottom left of screen.
 - Make YouTube video titles clickable.
 - Decrease size of logos (should be 64x64 at most).
 - Refactor get_data so that global variables and env don't need to be populated in advance.
   (see index.php lines 37-53 for an example of the sort of thing that should be removed.)
-->

<!DOCTYPE html>
<html lang="en">
<head>

	<!-- Font: Roboto -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap" rel="stylesheet">

	<!-- Boilerplate -->
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<!-- Vanity shit -->
	<meta name="description" content="Joseph Fiddes is a musician, engineer, programmer, and general nuisance.
">
	<meta name="author" content="Joseph Fiddes">
	<title>Joseph Fiddes: Music, Electronics, and the Combination Thereof</title>
	<link rel="icon" href="./favicon.ico" type="image/x-icon">

	<link rel="stylesheet" type="text/css" href="main.css">

	<!-- Allows iframes to be resized such that their height matches their width -->
	<script>
	  function resizeIframe(obj) {
	    obj.style.height = obj.parentElement.scrollWidth * (1080 / 1720) + 'px';
	  }
	</script>

</head>

<!-- Welcome, my fellow hackers ;) -->
<body>
	<a name="top">
	<div id="header">
		<a href="./">
			<table id="headerImages">
				<tr>
					<td id="hsp"><img id="headshot" src="./img/headshot/large.jpg"></td>
					<td id="hnp">
						<img id="headname" src="./img/name/thinner.png">
					</td>
				</tr>
			</table>
		</a>

		<!-- Social media links -->
		<div class="links desktop-only">
			<!-- <a class="button" href="redirect/twitter.php" target="_blank">
				<table>
					<tr>
						<td><img class="ext-logo" src="./img/logos/twitter_logo.png"></td>
						<td>twitter</td>
					</tr>
				</table>
			</a> -->
			<a class="button" href="redirect/twitch.php" target="_blank">
				<table>
					<tr>
						<td><img class="ext-logo" src="./img/logos/twitch_logo.png"></td>
						<td>twitch</td>
					</tr>
				</table>
			</a>
			<a class="button" href="redirect/github.php" target="_blank">
				<table>
					<tr>
						<td><img class="ext-logo" src="./img/logos/github_logo.png"></td>
						<td>github</td>
					</tr>
				</table>
			</a>
			<a class="button" href="redirect/linkedin.php" target="_blank">
				<table>
					<tr>
						<td><img class="ext-logo" src="./img/logos/linkedin_logo.png"></td>
						<td>linkedin</td>
					</tr>
				</table>
			</a>
			<a class="button" href="redirect/youtube.php" target="_blank">
				<table>
					<tr>
						<td><img class="ext-logo" src="./img/logos/yt_logo.png"></td>
						<td>youtube</td>
					</tr>
				</table>
			</a>
		</div>

		<!-- Social media links on mobile.
			(Only show logos to optimise space) -->
		<div class="foot-ext-links mobile-only">
				<div class="centre-div">
					<table>
						<tr>
							<!-- <td><a href="redirect/twitter.php" target="_blank">
								<img class="ext-logo" src="./img/logos/twitter_logo.png">
								</a></td> -->
							<td><a href="redirect/twitch.php" target="_blank">
								<img class="ext-logo" src="./img/logos/twitch_logo.png">
								</a></td>
							<td><a href="redirect/github.php" target="_blank">
								<img class="ext-logo" src="./img/logos/github_logo.png">
								</a></td>
							<td><a href="redirect/linkedin.php" target="_blank">
								<img class="ext-logo" src="./img/logos/linkedin_logo.png">
								</a></td>
							<td><a href="redirect/youtube.php" target="_blank">
								<img class="ext-logo" src="./img/logos/yt_logo.png">
								</a></td>
						</tr>
					</table>
				</div>
			</div>

		<!-- Website links -->
		<div class="links">
			<a class="button internal" href="./">
				<table><tr><td>HOME</td></tr></table>
			</a>
			<a class="button internal" href="music.php">
				<table><tr><td>MUSIC</td></tr></table>
			</a>
			<!-- <a class="button internal wide-text" href="ondes.php">
				<table><tr><td>ONDES MARTENOT</td></tr></table>
			</a> -->
			<a class="button internal" href="CV.php">
				<table><tr><td>CV</td></tr></table>
			</a>
			<a class="button internal" href="mailto:fiddj13@live.com.au
         ?subject=Sent%20from%20website%3A">
				<table><tr><td>CONTACT</td></tr></table>
			</a>
		</div>
	</div>

	<script src="./scripts/header_social_media_buttons.js"></script>