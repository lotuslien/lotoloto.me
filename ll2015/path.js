
var path = new function(){}

path.init = function(){
	path.build()
	scrubber.init()

	// skip to a particular slide
	scrubber.step(0)

	map && map.hide()
	
	// environment.update = path.update
}

path.build = function(){
	scrubber = new MX.Scrubber(cam, [
		
		{ // NFNN
			"x": 147,
			"y": 1548,
			"z": -4053,
			"rotationX": 0.085,
			"rotationY": 0.025,
			"name": ""
		},
		
		
		{ // YOU ARE NOW A FISH
			"x": 100,
			"y": 1492,
			"z": -2000,
			"rotationX": 0.12,
			"rotationY": 0.092,
			"name": "youareafish"
		},
		
		{ // YOU ARE NOW A FISH
			"x": -81,
			"y": 1492,
			"z": -998,
			"rotationX": 0.22,
			"rotationY": 0.042,
			"name": "howdoesitfeel"
		},
		
		{ // PRE WHAT MODELS LOOK LIKE
			"x": -59,
			"y": -260,
			"z": 2055,
			"rotationX": -0.506,
			"rotationY": 0.068,
			"name": "whatmodelslooklike"
		},
		
		{ // WHAT MODELS LOOK LIKE
			"x": -59,
			"y": -0,
			"z": 2855,
			"rotationX": -0.506,
			"rotationY": 0.108,
			"name": "whatmodelslooklike"
		},
		
		{ // POST WHAT MODELS LOOK LIKE
			"x": -59,
			"y": 0,
			"z": 4000,
			"rotationX": -0.506,
			"rotationY": -0.308,
			"name": "whatmodelslooklike"
		},
		
			{ // POST WHAT MODELS LOOK LIKE
			"x": 59,
			"y": 0,
			"z": 4000,
			"rotationX": -0.506,
			"rotationY": -0.308,
			"name": "whatmodelslooklike"
		},
		
		{ // POST WHAT MODELS LOOK LIKE2
			"x": 105,
			"y": 156,
			"z": 4822,
			"rotationX": -0.578,
			"rotationY": 0.401,
			"name": "whatmodelslooklike"
		},
		
		{ // THIS IS YOUR HOME
			"x": 105,
			"y": 686,
			"z": 7922,
			"rotationX": -0.478,
			"rotationY": -0.051,
			"name": "thisisyourhome"
		},
		
		{ // THIS IS YOUR HOME2
			"x": 105,
			"y": -2456,
			"z": 10822,
			"rotationX": -0.878,
			"rotationY": 0.051,
			"name": "thisisyourhome"
		},
		
		{ // THESE ARE YOUR FRIENDS

			"x": -1043,
			"y": 2444,
			"z": 12968,
			"rotationX": 0.541,
			"rotationY": -1.199,

			"name": "theseareyourfriends",
			callback: function(){
				in_box = true
				box.water.el.classList.add("backface-hidden")
				box.water.rotationY = 0
				box.water2.rotationY = 0
				fish.dead = false
				fish2.dead = false
				fish3.dead = false

				box.water.bottom.rotationY = PI

				fish.fish.forEach(function(f){
					f.el.style.WebkitFilter = "none"
				})
				fish2.fish.forEach(function(f){
					f.el.style.WebkitFilter = "none"
				})
				fish3.fish.forEach(function(f){
					f.el.style.WebkitFilter = "none"
				})
			}
		},
		
		{ // THESE ARE YOUR FRIENDS

			"x": -156,
			"y": 2444,
			"z": 11938,
			"rotationX": 0.459,
			"rotationY": -0.026,

			"name": "theseareyourfriends",
			callback: function(){
				in_box = true
				box.water.el.classList.add("backface-hidden")
				box.water.rotationY = 0
				box.water2.rotationY = 0
				fish.dead = false
				fish2.dead = false
				fish3.dead = false

				box.water.bottom.rotationY = PI

				fish.fish.forEach(function(f){
					f.el.style.WebkitFilter = "none"
				})
				fish2.fish.forEach(function(f){
					f.el.style.WebkitFilter = "none"
				})
				fish3.fish.forEach(function(f){
					f.el.style.WebkitFilter = "none"
				})
			}
		},

		
		{ // BIG FISH ARE THREATENED

			"x": 1435,
			"y": 2444,
			"z": 13521,
			"rotationX": 0.459,
			"rotationY": 1.58,

			"name": "overfishing",
			callback: function(){
				in_box = true
				box.water.el.classList.add("backface-hidden")
				box.water.rotationY = 0
				box.water2.rotationY = 0
				fish.dead = true
				fish2.dead = false
				fish3.dead = false

				box.water.bottom.rotationY = 0

				fish.fish.forEach(function(f){
					f.el.style.WebkitFilter = "hue-rotate(-20deg) invert(100%)"
				})
				fish2.fish.forEach(function(f){
					f.el.style.WebkitFilter = "none"
				})
				fish3.fish.forEach(function(f){
					f.el.style.WebkitFilter = "none"
				})
			}
		},
		
		
		
		{ // BIG FISH ARE THREATENED

			"x": 32,
			"y": 2444,
			"z": 15084,
			"rotationX": 0.505,
			"rotationY": 3.084,

			"name": "overfishing",
			callback: function(){
				in_box = true
				box.water.el.classList.add("backface-hidden")
				box.water.rotationY = 0
				box.water2.rotationY = 0
				fish.dead = true
				fish2.dead = false
				fish3.dead = false
				
				box.water.bottom.rotationY = 0
				
				fish.fish.forEach(function(f){
					f.el.style.WebkitFilter = "hue-rotate(-20deg) invert(100%)"
				})
				fish2.fish.forEach(function(f){
					f.el.style.WebkitFilter = "none"
				})
				fish3.fish.forEach(function(f){
					f.el.style.WebkitFilter = "none"
				})
			}
		},


		{ // BIG FISH ARE THREATENED

			"x": -1503,
			"y": 2444,
			"z": 13469,
			"rotationX": 0.505,
			"rotationY": 4.686,

			"name": "nomorefish",
			callback: function(){
				in_box = true
				box.water.el.classList.add("backface-hidden")
				box.water.rotationY = 0
				box.water2.rotationY = 0
				fish.dead = true

				box.water.bottom.rotationY = PI
				fish2.dead = true
				fish3.dead = true
				fish2.fish.forEach(function(f){
					f.el.style.WebkitFilter = "hue-rotate(-20deg) invert(100%)"
				})
				fish3.fish.forEach(function(f){
					f.el.style.WebkitFilter = "hue-rotate(-20deg) invert(100%)"
				})
				environment.slogans.hide()
			}
		},
		
		
		{ // UNLESS WE ACT
			"x": 412,
			"y": 792,
			"z": 7627,
			"rotationX": 0.096,
			"rotationY": PI,
			"name": "unlessweact",

			callback: function(){
				in_box = false
				box.water.el.classList.remove("backface-hidden")
				environment.slogans.show()
			}
		},


		// SLOGANS
		{
			"x": 412,
			"y": 702,
			"z": 4627,
			"rotationX": -0.016,
			"rotationY": PI,
			callback: function(){
				environment.slogans.show()
			}
		},


		{ // VIDEO, SHARE
			"x": 412,
			"y": 592,
			"z": 1627,
			"rotationX": -0.106,
			"rotationY": PI,
			"name": "looks",
		},

	])
}

path.update = function (t){
	scrubber.update()
}



