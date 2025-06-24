<?php
	include_once 'include/header.php';
?>

	<div id="CV">
		<!-- Use class 'dont-print' in order to make an element not appear on the PDF. -->
		<!-- Use class 'hide' in order to make an element not appear on the web (but still appear on the PDF). -->

		<h1>Joseph Fiddes - GradIEAust</h1>
		<p>Master of Mechatronics Engineering graduate from the University of Melbourne.</p>

		<!-- Education -->
		<h2>Tertiary Education </h2>

		<h3>Master of Mechatronics Engineering (The University of Melbourne) (2023-2024)</h3>
		<p>My Weighted Average Mark for this course was 74.368.</p>

		<p>Developed skills in many engineering disciplines, including (but not limited to) electrical, mechanical and software engineering, through the use of theoretical and practical projects. Skills include machine learning, controller design, automation, CAD, and use of microcontrollers.</p>

		<h4>Course Highlight: Control Systems and Advanced Control Systems</h4>

		<p>These two subjects were focused on the design of feedback controllers, with an emphasis on system and signal analysis. I developed plant models and designed controllers which enforced restrictions on the system's states within given design parameters. Controller strategies included PID and optimal control.</p>

		<h4>Course Highlight: Dynamics and Advanced Dynamics</h4>

		<p>These two subjects were focused on the behaviour of dynamic systems. Equations of motion were derived by applying forces and constraints to 3-dimensional mechanical systems, and applying Newton-Euler and the Lagrangian. These equations were then simulated numerically or solved algebraically.</p>

		<h3>Bachelor of Science (The University of Melbourne) (2019-2022)</h3>
		<p>My Weighted Average Mark for this course was 79.150</p>

		<p>Major in Mechatronics Engineering.</p>

		<h3>Diploma in Music (The University of Melbourne) (2019-2022)</h3>
		<p>My Weighted Average Mark for this course was 84.167</p>

		<!-- Engineering -->
		<h2>Engineering </h2>

		<h3>Software Engineering Intern at CSIRO (July-October 2023)</h3>
		<p> I was creating an inter-process visualisation program between CSIRO's Workspace and Epic Games' Unreal Engine 5, in order to facilitate high quality rendering of scientific data.</p>

		<!-- Skills -->
		<h2>Skills</h2>
		<p>In descending order of fluency, I can code in: </p>
		<ul>
			<li>Python</li>
			<li>MATLAB</li>
			<li>C/C++</li>
			<li>Java</li>
			<li>PHP</li>
		</ul>

		<h3>Programs I've created:</h3>
		<a href="https://diminished-9th.itch.io/mm-rr" class="text-link"> Maze Mayhem - Rocket Rumble: (click here to check it out)</a>

		<br class = "dont-print">

		<p>'Maze Mayhem - Rocket Rumble' is a video game based on the premise of controlling two separate games at once.</p>

		<p>I've also written a program that takes MIDI drumkit inputs and converts them to keypresses, allowing me to control my computer using an electric drumkit.</p>

		<p>I've also converted CT scans into a rough 3D model of my own brain.</p>

		<p>I am also skilled with Microsoft Excel, and have created spreadsheets with macros utilising VBA. For example, I created a program in excel which calculates the number of university credits I earned for groups of university subjects, ensuring I did not enrol in the incorrect amount of subjects within a particular category.</p>

		<p>I have some experience working with the game engines Unity and Unreal. I have also made frequent use of Git.</p>

		<p>I recently took a short course in PCB design with KiCad. Additionally, I am experienced with CAD software - SolidWorks in particular.</p>

		<!-- Website -->
		<h2>Website</h2>
		<p class = "dont-print">The website you are currently browsing was built from scratch, using HTML, CSS, JavaScript, PHP and SQL. Whenever the page is visited, it automatically sends an API request to YouTube in order to update the videos in the side panel to the most recent.</p>

		<p class = "hide">This document was generated on my website! The website was built from scratch, using HTML, CSS, JavaScript, PHP and SQL. Whenever the page is visited, it automatically sends an API request to YouTube in order to update the videos in the side panel to the most recent.</p>

		<!-- Music -->
		<h2>Music</h2>

		<h3>Pianist at Fairway Bayside Age Care (2019-2023)</h3>
		<p>I played piano once a fortnight at Fairway Bayside Age Care. This job required required the ability to learn new material quickly, as well as adapt on the fly to performance situations.</p>

		<h3>Percussionist with Melbourne Youth Orchestra (2019-2022)</h3>
		<p>I played percussion in the Melbourne Youth Orchestra. Percussion set-ups are often complex, and rehearsal time was limited. This role required quick-thinking and leadership skills.</p>

		<h3>Keyboard player with The Brewers (2021-current)</h3>
		<p>I play keys with ‘The Brewers’, a local blues band known for ‘full-bodied blues’.</p>

		<h3>Composition: </h3>

		<p> I've composed some music in various genres, including rock, disco, and classical. A few highlights are included below:</p>

		<a href="https://youtu.be/BEfijj0oqMM" class="text-link">Thursday Afternoon Meditations: (click here to listen) </a>

		<br class = "dont-print"><br class = "dont-print">

		<a href="https://youtu.be/9VNIhaLOq7E" class="text-link">Piece on the Theme of Struggle: (click here to listen)</a>

		<br class = "dont-print"><br class = "dont-print">

		<a href='https://youtube.com/playlist?list=PLERg3naGdTUlENi0HrMVSpsb_PSutjCQG' class="text-link"> More of my music can be found by clicking here! </a>

		<br class = "dont-print">
		<br class = "dont-print">
	</div>

	<div class="links">
		<button class="button centred" href="" target="_blank" id="print-cv-button">
			<table>
				<tr>
					<td>PRINT CV</td>
				</tr>
			</table>
		</button>
	</div>


	<!--<script type="module" src="scripts/pdf-lib.js"></script>-->
	<script type="module" src="scripts/printCV.js"></script>

	<?php
		include_once 'include/footer.php';
	?>