<!DOCTYPE html>
	<head>
		<title>Evolution</title>
		<script src="script.js"></script>
		<link href="style.css" type="text/css" rel="stylesheet">
	</head>
	<body onload="setup();">
		<div id="header">Evolution</div>

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
			<button class="bot-button" onclick="showOutput();">Save</button>
			<button class="bot-button" onclick="enter();">Load</button>
		</div>
		<div id="output-cont">
			<div id="output">
			</div>
			<button onclick="document.getElementById('output-cont').style.display = 'none';">Close</button>
		</div>

	</body>
</html>