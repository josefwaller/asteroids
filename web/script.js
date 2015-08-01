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


function setVariables () {

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	evolvers = [];
	curEvolver = 0;

	startingCoords = {};

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
			40,
			-40,
			80,
			-80
		],
		dur : [
			15,
			20,
			25,
			30,
			40

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

function showOutput (output){
	document.getElementById('output').innerHTML = output;
	document.getElementById("output-cont").style.display = "block";
}



function draw () {

	ctx.fillStyle = "#000000";

	ctx.fillRect(0,0,W,H);

	ctx.fillStyle = "#808080";

	for (var i = 0; i < usableAsteroids.length; i++){

		var a = usableAsteroids[i];

		ctx.fillRect(a.x, a.y, a.w, a.h);
	}

	for (var i = 0; i < evolvers.length; i++){

		var eve = evolvers[i];

		ctx.fillStyle = "white";

		ctx.font = "20px Arial";

		ctx.fillText(evolvers.length - i, eve.x, eve.y);

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
		speed : Math.round((Math.random() * 40 * 100) / 100) - 20,
		dur : Math.round(Math.random() * 10 * 100)/100,
		time : null
	}

	return gene;

}

function getNewTime () {

	return currentTime;

}