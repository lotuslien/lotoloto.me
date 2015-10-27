var scrubber, fish, floor

viewHeight = 400

var environment = new function(){}
environment.init = function(){

	scene.camera.move({
		"x": 0,
		"y": 0,
		"z": 0,
		"rotationX": 0.085,
		"rotationY": 0.025
	})
	map && map.zoom(3.10) && map.recenter()

// 	scene.camera.move({
// 		"x": 147,
// 		"y": 1548,
// 		"z": -4053,
// 		"rotationX": 0.085,
// 		"rotationY": 0.025
// 	}, false)
// 
// 
// 	scene.camera.move({
// 		"x": -3187,
// 		"y": 708,
// 		"z": 707,
// 		"rotationX": 0.085,
// 		"rotationY": -0.776
// 	}, false)

	//
	// intro floor, models, etc

	var floor = new MX.Tableaux.Floor({
		width: 2500,
		depth: 6000,
		scale: 5,
		y: -1010,
		z: 2000,
		scale: 3,
		y: 150,
		z: 5000,
		rotationX: -PI/20,
		backgroundImage: "http://okfocus.s3.amazonaws.com/kenzo/img/PATTERNS/bg-4.jpg"
	})

	var intro = new MX.Tableaux.IntroText({
		x: 100,
		y: 700,
		z: -2100,
		rotationX: Math.PI/20
	})
	
	var models = new MX.Tableaux.Models({
		z: 2000,
		y: -250,
		spacingY: 63,
	})

	var waves = new MX.Tableaux.Waves({
		gap: 1000,
		z: 5000
	})

	this.fishCutouts = new MX.Tableaux.FishCutouts({
		fishCount: 10,
		x: 0,
		y: 500,
		z: 500,
		xRange: 2000,
		yRange: 1300,
		zRange: 1500,
		speed: -Math.PI / 600,
		className: "fish",
		patternSrc: "http://okfocus.s3.amazonaws.com/kenso/underwater/bwrepeat2.png",
	})

	this.fishCutouts2 = new MX.Tableaux.FishCutouts({
		fishCount: 10,
		x: 0,
		y: 250,
		z: 500,
		xRange: 3000,
		yRange: 700,
		zRange: 3000,
		speed: Math.PI / 400,
		className: "fish",
		patternSrc: "http://i.asdf.us/im/fc/gradient_white-MediumOrchid3_1332202989_bky.jpg",
	})

	this.fishCutouts3 = new MX.Tableaux.FishCutouts({
		fishCount: 10,
		x: 0,
		y: 1000,
		z: -200,
		xRange: 2000,
		yRange: 1000,
		zRange: 2000,
		speed: -Math.PI / 500,
		className: "fish",
		patternSrc: "http://i.asdf.us/im/0c/gradient_teal-purple_1330660041.png",
	})


	//
	// huge rotating box

	box = new MX.Tableaux.WaterBox({
		width: 400,
		height: 400,
		depth: 400,
		x: 0,
		y: 1000,
		z: 13500,
		padding: 30,
		scale: 10,
	})


	fish = new MX.Tableaux.Fish({
		fishCount: 10,
		x: 0,
		y: 345,
		z: 0,
		minScale: 1.0,
		maxScale: 1.0,
		centerRadius: 600,
		radius: 400,
		height: 500,
		speed: -PI / 1200,
	})

	fish2 = new MX.Tableaux.Fish({
		fishCount: 10,
		x: 0,
		y: 315,
		z: 0,
		minScale: 1.0,
		maxScale: 1.0,
		centerRadius: 500,
		radius: 400,
		height: 500,
		speed: PI / 1000,
	})

	fish3 = new MX.Tableaux.Fish({
		fishCount: 4,
		x: 0,
		y: 300,
		z: 0,
		minScale: 1.0,
		maxScale: 1.0,
		centerRadius: 200,
		radius: 400,
		height: 500,
		speed: -PI / 700,
	})

	this.slogans = new MX.Tableaux.Slogans({
		x: 350,
		y: 400,
		z: 3700,
		rotationY: PI,
	})

	// ok!
// 	scene.camera.move({
// 		"x": -20,
// 		"y": 3200,
// 		"z": 10060,
// 		"rotationX": 0.432,
// 		"rotationY": 3.16
// 	})

}


var in_box = false

environment.update = function(t){

	// add continuous animations and stuff here
	
	if (! in_box) {
		box.update(t)
	}
	fish.update(t)
	fish2.update(t)
	fish3.update(t)
	this.fishCutouts.animate(t)
	this.fishCutouts2.animate(t)
	this.fishCutouts3.animate(t)

	map && map.update()

}
