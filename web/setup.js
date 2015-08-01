function setup () {

	//ADD CHECKING IF THE WINDOW IS TOO SMALL
	//DON'T FORGET

	setVariables();

	canvas.width = W;
	canvas.height = H;

	startingCoords.x = Math.round(Math.random() * (W - 100 - 300)) + 150;
	startingCoords.y = Math.round(Math.random() * (H - 100 - 300)) + 150;

	for (var i = 0; i < numOfAsteroids; i++){
		asteroids[i] = {
			x : Math.round(Math.random()*W),
			y : Math.round(Math.random()*H),
			momX : Math.round(Math.random()*10 + 10),
			momY : Math.round(Math.random()*10 + 10),
			w : Math.round(Math.random()*15 + 15),
			h : Math.round(Math.random()*15 + 15),
		}

		if (asteroids[i].x + asteroids[i].w > startingCoords.x){
			if (asteroids[i].x < startingCoords.x + 100){
				if (asteroids[i].y + asteroids[i].h > startingCoords.y){
					if (asteroids[i].y < startingCoords.y + 100){
							
						//resets
						i--;

					}
				}
			}
		}
	}

	for(var i = 0; i < asteroids.length; i++){

		var a = asteroids[i];

	}
	

	numOfOrg = 20;
	//generates organisms

	for (var i = 0; i < numOfOrg; i++){

		evolvers[i] = {};

		e = evolvers[i];

		e.x = startingCoords.x / 2 - 5;
		e.y = startingCoords.y / 2 - 5;

		e.isAlive = true;

		e.genes = [];

		e.genes[0] = generateGene()

		e.genes[0].time = Math.round(Math.random() * 10 * 100) / 100;

	}

	time.lastTime = getNewTime();
	time.drawTime = getNewTime() - 20;

	ctx.fillStyle = "#000000";

	ctx.fillRect(0,0, W, H);


}