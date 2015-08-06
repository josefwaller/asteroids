<!DOCTYPE html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="jquery.js"></script>
		<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
		<link rel="stylesheet" href="common-style.css" type="text/css">
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	</head>
	<body>
		<div class="container">

			<div id="header">
				<div id="header-title">
					Josefwaller.com
				</div>
				<div id="header-menu">
					<a href="index.php" class="header-button">Home</a>
					<div class="header-button" id="dropdown">
						<div class="dropdown-item" id="red">Stuff</div>
						<a class="dropdown-item" href="evolution.php" id="orange">Evolution</a>
					</div>
				</div>
			</div>
		</div>
		<div class="container">

			<div class="row">
				<div class="col-12-md">
					<h1>Who am I?</h1>
				</div>
			</div>
			<div class="row">
				<div class="col-12-md">
					<h4>I am Josef Waller, web developer and software engineer. This is my personal domain where i post cool stuff I make. Eveything can be found under the STUFF tab. If there is something cool that you think I should make, feel free to suggest it below</h4>
				</div>
			</div>

			<div class="row">
				<div class="col-12-md">
					<h1>Suggest an Idea</h1>
				</div>
			</div>
			<form role="form" type="POST" action="ideaSave.php">
				<div class="form-group">
					<label for="desc"><h3>Description</h3></label>
					<textarea class="form-control" id="desc" name="desc"></textarea>
				</div>
				<button type="submit" class="btn btn-default">Submit</button>
			</form>
		</div>
	</body>
</html>