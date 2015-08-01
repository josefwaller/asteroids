function simulate () {

	for (var i = 0; i < evolvers.length; i++){

		eve = evolvers[i];

		eve.lastMove = getNewTime();

		eve.isAlive = true;

		eve.x = startingCoords.x;
		eve.y = startingCoords.y;
	}

	for (var i = 0; i < asteroids.length; i++){

		usableAsteroids[i] = {};

		for (var value in asteroids[i]){
			usableAsteroids[i][value] = asteroids[i][value];
		}
	}
	
	time.startTime = getNewTime();

	clearTimeout(interval);

	interval = setTimeout(function () {update()},timeSpeed);

	runSimulation = true;

}

function evolve () {

	//sorts evolvers based on score

	evolvers = evolvers.sort(function (a, b){ return a.score - b.score});

	//creates children
	for (var i = evolvers.length - 2; i >= 0; i--){

		evolvers[i].genes = [];

		for (var x = 0; x < evolvers[evolvers.length - 1].genes.length; x++){

			evolvers[i].genes[x] = {};

			for (var value in evolvers[evolvers.length - 1].genes[x]){

				evolvers[i].genes[x][value] = evolvers[evolvers.length - 1].genes[x][value];

			}
		}

		var random = Math.random();

		if (random < 0.8){
			//add a gene

			var newGeneIndex = evolvers[i].genes.length
			
			var mostTime = 0;

			for (z = 0; z < evolvers[i].genes.length; z++){

				g = evolvers[i].genes[z];

				if (g.time + g.dur > mostTime){

					//checks if the gene ended before death
					//used to avoid ramming into walls

					if (g.time + g.dur < evolvers[i].score){

						mostTime = g.time + g.dur;

					}else {

						mostTime = evolvers[i].score - 5

					}

				}

			}

			evolvers[i].genes[newGeneIndex] = generateGene();

			var timeRandom = Math.round(Math.random() * 10 * 100) / 100

			evolvers[i].genes[newGeneIndex].time = Math.round(mostTime - timeRandom / 2 + timeRandom);

		}else if (random < 0.99 && random >= 0.8){

			//replace a gene

			var toReplace = Math.round( Math.random() * (evolvers[i].genes.length - 1));

			var prevTime = evolvers[i].genes[toReplace].time;

			evolvers[i].genes[toReplace] = generateGene();

			evolvers[i].genes[toReplace].time = prevTime;

		}else if (random >= 0.99){

			//modify the latest gene's duration

			evolvers[i].genes[evolvers[i].genes.length - 1].dur = Math.round(Math.random() * 10 * 100) / 100;
		}


	}

	numOfGenerations++;
	simulate();


}

function update () {

	var hesDeadJim;

	currentTime += 500;

	time.time = getNewTime();

	time.deltaTime = (time.time - time.lastTime)/1000;

	//cfalculates asteroids

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

	for (var x = 0; x < evolvers.length; x++){

		var eve = evolvers[x];

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

			for (var y = 0; y < evolvers.length; y++){

				if (evolvers[y].isAlive){

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