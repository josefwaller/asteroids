<!DOCTYPE html>
	<head>
		<title>Evolution</title>
		<script src="script.js"></script>
		<script src="setup.js"></script>
		<script src="simFuncs.js"></script>
		<script src="coding.js"></script>
		<script src="jquery.js"></script>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="jquery.js"></script>
		<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
		<link rel="stylesheet" href="index-style.css" type="text/css">
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
		<link href="style.css" type="text/css" rel="stylesheet">
	</head>
	<body onload="setup();">

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
		<div id="sub-header">Evolution</div>

		<div id="button-cont">
			<button class="top-button" name="start-button" onclick="
				setup();
				simulate(); 
				document.getElementsByName('start-button')[0].innerHTML = 'Reset';
			">Start</button>
			<button class="top-button" onclick="timeSpeed = 1">Fast</button>
			<button class="top-button" onclick="timeSpeed = 50">Slow</button>
		</div>

		<canvas id="canvas"></canvas>

		<div id="button-cont">
			<button class="bot-button" onclick="save();">Save</button>
			<button class="bot-button" onclick="enter();">Load</button>
		</div>
		<div id="output-cont">
			<div id="output">
			</div>
			<button onclick="document.getElementById('output-cont').style.display = 'none';">Close</button>
		</div>

	</body>
</html>