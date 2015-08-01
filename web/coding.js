function decode (str){

	str = str.replace(/\|/g, "lastMove");

	str = str.replace(/\</g, "startingCoords");

	str = str.replace(/\>/g, "false");

	str = str.replace(/\?/g, "true");

	str = str.replace(/\~/g, "score");

	str = str.replace(/\`/g, "isAlive");

	str = str.replace(/\*/g, "momY");

	str = str.replace(/\;/g, "momX");

	str = str.replace(/\^/g, "dur");

	str = str.replace(/\%/g, "dir");

	str = str.replace(/\$/g, "speed");

	str = str.replace(/\@/g, "time");

	str = str.replace(/\!/g, "genes");

	obj = JSON.parse(str);

	return obj;

}


function getResponse (url, data, onFin){


    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            onFin(xmlhttp.responseText);
        }
    }
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    var urlVariables = "";


    objKeys = Object.keys(data);

    for (var i = 0; i < objKeys.length; i++){

    	index = objKeys[i];

    	urlVariables += index + "=" + data[index];

    	if (objKeys.length > i + 1){

    		urlVariables += "&";
    	}
    }

    console.log("URL Variables are " + urlVariables);

    xmlhttp.send(urlVariables);

}

function encode (obj){

	var str = JSON.stringify(obj);

	str = str.replace(/genes/g, "!");

	str = str.replace(/time/g, "@");

	str = str.replace(/speed/g, "$");

	str = str.replace(/dir/g, "%");

	str = str.replace(/dur/g, "^");

	str = str.replace(/momX/g, ";");

	str = str.replace(/momY/g, "*");

	str = str.replace(/isAlive/g, "`");

	str = str.replace(/score/g, "~");

	str = str.replace(/true/g, "?");

	str = str.replace(/false/g, ">");

	str = str.replace(/startingCoords/g, "<");

	str = str.replace(/lastMove/g, "|");

	return str;

}


function save () {

	toSave = {
		"asteroids" : encode(asteroids),
		"evolver": encode(evolvers[0]),
		"startingCoords": JSON.stringify(startingCoords)
	}

	getResponse("save.php", toSave, showOutput);

}

function enter () {
	var code = prompt("Enter the code:");

	if (code !== null && code !== ""){

		getResponse("retrieve.php", {"code": code}, function(data){

				try{

					obj = decode(data);

				}catch(e){

					ShowOutput("Invalid Code!");
					return;

				}

				setup();

				asteroids = obj.asteroids;
				evolvers[0] = obj.evolver;
				startingCoords = obj.starting_coords;

				simulate();

		});

	}

}