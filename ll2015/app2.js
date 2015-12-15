var scrubber, fish, floor

viewHeight = 400

var environment = new function(){}
environment.init = function(){

	scene.camera.move({
		"x": 0,
		"y": 0,
		"z": 0,
		"rotationX": 0.085,
		"rotationY": 0.020
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
		width: 5000,
		depth: 5000,
		scale: 3,
		y: -1010,
		z: 2000,
		scale: 3,
		y: 250,
		z: 5000,
		rotationX: -PI/10,
		backgroundImage: "http://www.transparenttextures.com/patterns/concrete-wall-2.png"
	})

	var intro = new MX.Tableaux.IntroText({
		x: 100,
		y: 100,
		z: -2100,
		rotationX: Math.PI/20
	})
	
		var models = new MX.Tableaux.Models({
		gap: 1000,
		z: 2000,
	
		z: 900,
 		y: -250,
 		spacingY: 1000,
	})

	var waves = new MX.Tableaux.Waves({
		gap: 1000,
		z: 5000
	})
//fish pattern color overlay 
	this.fishCutouts = new MX.Tableaux.FishCutouts({
		fishCount: 6,
		x: 0,
		y: 500,
		z: 500,
		xRange: 2000,
		yRange: 1300,
		zRange: 1500,
		speed: -Math.PI / 600,
		className: "fish",
		patternSrc: "http://www.transparenttextures.com/patterns/concrete-wall-2.png",
	})
//fish pattern color overlay 
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
		patternSrc: "http://www.transparenttextures.com/patterns/concrete-wall-2.png",
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
		patternSrc: "http://www.transparenttextures.com/patterns/concrete-wall-2.png",
	})


	//
	// huge rotating box

	box = new MX.Tableaux.WaterBox({
		width: 400,
		height: 400,
		depth: 400,
		x: 0,
		y: 1200,
		z: 13500,
		padding: 50,
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
		radius: 300,
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
