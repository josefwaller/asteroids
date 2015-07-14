var canvas;
var ctx;

var curEvolver;

var lengthOfSim;

var timeIncrement;

var timeMultiplyer;

var timeSpeed;

var W;
var H;

var numOfAsteroids;
var comps;
var usableAsteroids;

var runSimulation;

var currentTime;

var numOfGenerations;

var genes;

var time;

var interval;

function setup () {

	//ADD CHECKING IF THE WINDOW IS TOO SMALL
	//DON'T FORGET

	setVariables();

	canvas.width = W;
	canvas.height = H;

	comps.startingCoords.x = Math.round(Math.random() * (W - 100 - 300)) + 150;
	comps.startingCoords.y = Math.round(Math.random() * (H - 100 - 300)) + 150;

	for (var i = 0; i < numOfAsteroids; i++){
		comps.asteroids[i] = {
			x : Math.round(Math.random()*W),
			y : Math.round(Math.random()*H),
			momX : Math.round(Math.random()*10 + 10),
			momY : Math.round(Math.random()*10 + 10),
			w : Math.round(Math.random()*15 + 15),
			h : Math.round(Math.random()*15 + 15),
		}

		if (comps.asteroids[i].x + comps.asteroids[i].w > comps.startingCoords.x){
			if (comps.asteroids[i].x < comps.startingCoords.x + 100){
				if (comps.asteroids[i].y + comps.asteroids[i].h > comps.startingCoords.y){
					if (comps.asteroids[i].y < comps.startingCoords.y + 100){
							
						//resets
						i--;

					}
				}
			}
		}
	}

	for(var i = 0; i < comps.asteroids.length; i++){

		var a = comps.asteroids[i];

	}
	

	numOfOrg = 20;
	//generates organisms

	for (var i = 0; i < numOfOrg; i++){

		comps.evolvers[i] = {};

		e = comps.evolvers[i];

		e.x = comps.startingCoords.x / 2 - 5;
		e.y = comps.startingCoords.y / 2 - 5;

		e.isAlive = true;

		e.genes = [];

		e.genes[0] = generateGene()

		e.genes[0].time = 10 * Math.round(Math.random());

	}

	time.lastTime = getNewTime();
	time.drawTime = getNewTime() - 20;

	ctx.fillStyle = "#000000";

	ctx.fillRect(0,0, W, H);


}

function enter () {
	newComps = prompt("Enter the code:");
	try
	{
		newComps = JSON.parse(newComps);
	}catch (err){

		alert("Invalid code!");
		return;

	}

	if (newComps !== null && newComps !== ""){

		comps = newComps;

	}

}

function setVariables () {

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	comps = {
		asteroids : [],
		evolvers : [],
		startingCoords : {}
	};

	curEvolver = 0;

	lengthOfSim = 1200000;

	timeIncrement = 100;

	timeMultiplyer = 5;

	timeSpeed = 1;

	numOfAsteroids = 30;
	asteroids = [];
	usableAsteroids = [];

	runSimulation = false;

	currentTime = 0;

	numOfGenerations = 0;

	genes = {
		dir : [
			"x",
			"y",
		],
		speed : [
			20,
			-20,
			40,
			-40,
		],
		dur : [
			1,
			2,
			4,
			6,
			10

		]
	};

	time = {
		deltaTime : 0,
		time : 0,
		startTime : 0,
		drawTime : 0
	}

	W = 900;
	H = 600;

	runSimulation = false;

}

function simulate () {

	for (var i = 0; i < comps.evolvers.length; i++){

		eve = comps.evolvers[i];

		eve.lastMove = getNewTime();

		eve.isAlive = true;

		eve.x = comps.startingCoords.x;
		eve.y = comps.startingCoords.y;
	}

	for (var i = 0; i < comps.asteroids.length; i++){

		usableAsteroids[i] = {};

		for (var value in comps.asteroids[i]){
			usableAsteroids[i][value] = comps.asteroids[i][value];
		}
	}
	
	time.startTime = getNewTime();

	clearTimeout(interval);

	interval = setTimeout(function () {update()},timeSpeed);

	runSimulation = true;

}

function evolve () {

	//sorts comps.evolvers based on score

	comps.evolvers = comps.evolvers.sort(function (a, b){ return a.score - b.score});

	//creates children
	for (var i = comps.evolvers.length - 2; i >= 0; i--){

		comps.evolvers[i].genes = [];

		for (var x = 0; x < comps.evolvers[comps.evolvers.length - 1].genes.length; x++){

			comps.evolvers[i].genes[x] = {};

			for (var value in comps.evolvers[comps.evolvers.length - 1].genes[x]){

				comps.evolvers[i].genes[x][value] = comps.evolvers[comps.evolvers.length - 1].genes[x][value];

			}
		}

		var timeRandom = Math.round(5 * Math.random());

		var random = Math.random();

		if (random < 0.8){
			//add a gene

			var newGeneIndex = comps.evolvers[i].genes.length
			
			var mostTime = 0;

			for (z = 0; z < comps.evolvers[i].genes.length; z++){

				g = comps.evolvers[i].genes[z];

				if (g.time + g.dur > mostTime){

					//checks if the gene ended before death
					//used to avoid ramming into walls

					if (g.time + g.dur < comps.evolvers[i].score){

						mostTime = g.time + g.dur;

					}else {

						mostTime = comps.evolvers[i].score - 5

					}

				}

			}

			comps.evolvers[i].genes[newGeneIndex] = generateGene();

			comps.evolvers[i].genes[newGeneIndex].time = mostTime - (timeRandom / 2) + timeRandom

		}else if (random < 0.99 && random >= 0.8){

			//replace a gene

			var toReplace = Math.round( Math.random() * (comps.evolvers[i].genes.length - 1));

			var prevTime = comps.evolvers[i].genes[toReplace].time;

			comps.evolvers[i].genes[toReplace] = generateGene();

			comps.evolvers[i].genes[toReplace].time = prevTime;

		}else if (random >= 0.99){

			//modify the latest gene's duration

			comps.evolvers[i].genes[comps.evolvers[i].genes.length - 1].dur = Math.random() * 10;
		}


	}

	numOfGenerations++;
	simulate();


}

function showOutput(){
	document.getElementById('output').innerHTML = 'Copy the code below: <br>' + (JSON.stringify(comps));
	document.getElementById("output-cont").style.display = "block";
}

function update () {

	var hesDeadJim;

	currentTime += 500;

	time.time = getNewTime();

	time.deltaTime = (time.time - time.lastTime)/1000;

	//cfalculates comps.asteroids

	for (var x = 0; x < usableAsteroids.length; x++){

		var a = usableAsteroids[x];

		a.x += a.momX * time.deltaTime;
		a.y += a.momY * time.deltaTime;

		if (a.x < 0 && a.momX < 0){
			a.momX *= -1;
		}
		if (a.x  + a.w > W && a.momX > 0){
			a.momX *= -1;
		}

		if (a.y < 0 && a.momY < 0){
			a.momY *= -1;
		}
		if (a.y  + a.h > H && a.momY > 0){
			a.momY *= -1;
		}
	}

	for (var x = 0; x < comps.evolvers.length; x++){

		var eve = comps.evolvers[x];

		if (eve.isAlive){

			//moves according to genes

			for (var i = 0; i < eve.genes.length; i++){

				var g = eve.genes[i];

				if (g.time * 1000 <= time.time - time.startTime){


					if (((g.time + g.dur) * 1000) > time.time - time.startTime){


						eve[g.dir] += g.speed * time.deltaTime;
						eve.lastMove = getNewTime();
					}

				}

			}


			//checks for collision

			for (var i = 0; i < usableAsteroids.length; i++){

				var a = usableAsteroids[i];

				//moves asteroid

				if (a.x + a.w > eve.x){

					if (a.x < eve.x + 10){

						if (a.y + a.h > eve.y){

							if (a.y < eve.y + 10){

								eve.isAlive = false;

							}

						}

					}

				}


			}

			//checks if eve went out of bounds

			if (eve.x + 10 > W || eve.x < 0){
				eve.isAlive = false;
			}
			if (eve.y + 10 > H || eve.y < 0){
				eve.isAlive = false;
			}


			time.lastTime = getNewTime();

			if (time.time - time.startTime > lengthOfSim * 1000){

				eve.isAlive = false;

			}

			//is eve died this round

			if (!eve.isAlive){

				eve.score = time.time - time.startTime;
			}

		//is Eve is dead
		}else{

			//checks if all eves are dead

			hesDeadJim = true;

			for (var y = 0; y < comps.evolvers.length; y++){

				if (comps.evolvers[y].isAlive){

					hesDeadJim = false;
					break;

				}

			}	

		}

		if (hesDeadJim){

			//if all eves are dead

			evolve();
			break;
		}

	}

	//draws

	if (time.time > time.drawTime + 20){

		draw();

	}

	if (!hesDeadJim){
		interval = setTimeout(function () {update()}, timeSpeed);
	}


}

function draw () {

	ctx.fillStyle = "#000000";

	ctx.fillRect(0,0,W,H);

	ctx.fillStyle = "#808080";

	for (var i = 0; i < usableAsteroids.length; i++){

		var a = usableAsteroids[i];

		ctx.fillRect(a.x, a.y, a.w, a.h);
	}

	for (var i = 0; i < comps.evolvers.length; i++){

		var eve = comps.evolvers[i];

		ctx.fillStyle = "white";

		ctx.font = "20px Arial";

		ctx.fillText(comps.evolvers.length - i, eve.x, eve.y);

		if (eve.isAlive){

			ctx.fillStyle = "red";

		}else{
			ctx.fillStyle = "#aa0000";
		}

		ctx.fillRect(eve.x, eve.y, 10, 10);
	}
}

function generateGene(){

	gene = {

		dir : genes.dir[Math.round(Math.random())],
		speed : Math.random() * 40 - 20,
		dur : Math.random()*10,
		time : null
	}

	return gene;

}

function getNewTime () {

	return currentTime;

}