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


	var floor = new MX.Tableaux.Floor({
		width: 2500,
		depth: 6000,
		scale: 3,
		y: -1010,
		z: 2000,
		scale: 3,
		y: 150,
		z: 5000,
		rotationX: -PI/20,
		backgroundImage: "https://cloud.githubusercontent.com/assets/8115609/11370532/35120106-9292-11e5-9920-231a7f9ee1ae.png"
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
//fish pattern color overlay 
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
		patternSrc: "http://okfocus.s3.amazonaws.com/kenso/underwater/bwrepeat2.png",
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
		patternSrc: "http://okfocus.s3.amazonaws.com/kenso/underwater/bwrepeat2.png",
	})


	box = new MX.Tableaux.WaterBox({
		width: 400,
		height: 400,
		depth: 400,
		x: 0,
		y: 1000,
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



}


var in_box = false

environment.update = function(t){


	
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
