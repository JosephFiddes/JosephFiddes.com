<?php
	include_once 'include/header.php';
?>
	<div class="page-description">
		Please use this form to contact me for inquiries you may have. Please fill out all fields so I can reply.
	</div>

	<div class="form">
		<form action="https://formsubmit.co/2c34a560b5f9ab812e80989b1772ba1b" method="POST">
			<!-- Name -->
			<div class="form-field">
				<label for="name">Name:</label>
				<input class="textbox small-textbox" type="text" id="name" name="name"><br>
			</div>

			<!-- Email -->
			<div class="form-field">
				<label for="email">Email:</label>
				<input class="textbox small-textbox" type="email" id="email" name="email" required><br>
			</div>

			<!-- Subject -->
			<div class="form-field">
				<label for="subject">Subject:</label>
				<input class="textbox small-textbox" type="text" id="subject" name="subject"><br>
			</div>

			<!-- Message -->
			<div class="form-field">
				<label for="message">Message:</label><br>
				<textarea class="textbox large-textbox" rows="20" cols="60" name="message" required></textarea><br>
			</div>

			<!-- Submit -->
			<div class="centre-div" style="text-align: center;">
				<input class="button" type="submit" id="submit" name="submit" value="SUBMIT"><br>
			</div>

			<input type="hidden" name="_next" value="https://josephfiddes.com/">
		</form>
	</div>
	<?php
		include_once 'include/footer.php';
	?>