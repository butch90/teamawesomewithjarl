var express = require('express');
var app = express();
var five = require('johnny-five');
var board = new five.Board();
var rgb;
var lastColor = "ff0000";
var intensity;
var power;
function setPower(power) {

	if(power === 'off') {
		rgb[power]();
	}
	else if (power === 'intensity'){
		rgb.intensity(intensity);
	}
	else {
		
		rgb[power]();
	}
}
function server() {
	app.use('/', express.static('www'));

	app.get('/power/:status', (req, res) => {
		 var power = req.params.status;
		if(req.params.status === 'on') {
			res.json('on');
			power = 'on';
			setPower(power);
		}
		else {
			res.json('off');
			power = 'off';
			setPower(power);

		}
	})
	
	app.get('/color/:id?', (req, res) => {
		var data = req.params.id;
		if(data.length > 3) {
			fromOneColorToAnother(lastColor,data);
	  	lastColor = data;
	  	res.json({ok:true});
	  	return;
		} else {

			intensity = data;
			if(power === 'on') {
				setPower('intensity');
			}
	  		res.json({status:true});
	  	return;
		}
	})
	app.get('*', (req, res) => {
	  res.sendFile('/index.html');
	})

	app.listen(3000, () => {
	  console.log('Server started at port: 3000');
	});

}

board.on("ready", function() {
	rgb = new five.Led.RGB({
		pins: {
			red: 5,
			green: 6,
			blue: 3	
		},
		isAnode: true,


	});
	
	rgb.on();
	rgb.color(lastColor);

	server();
});

function fromOneColorToAnother(hex1,hex2){

	var col1 = hexToRgb("#" + hex1);
	var col2 = hexToRgb("#" + hex2);
	var rDiff = col2.r - col1.r;
	var gDiff = col2.g - col1.g;
	var bDiff = col2.b - col1.b;
	var r = col1.r, g = col1.g, b =col1.b;
	var arr = [];
	for(var i = 0; i < 29; i++){
		r += rDiff/30;
		g += gDiff/30;
		b += bDiff/30;
		arr.push(rgbToHex(r,g,b).substring(1));
	}
	arr.push(hex2);
	var theInterval = setInterval(function(){
		rgb.color(arr.shift());
		if(arr.length === 0){
			clearInterval(theInterval);
		}
	},50);
}

function rgbToHex(r, g, b) {
	  r = Math.floor(r);
	  g = Math.floor(g);
	  b = Math.floor(b);
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}