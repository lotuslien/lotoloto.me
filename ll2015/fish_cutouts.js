
MX.Tableaux.FishCutouts = MX.Tableau.extend({

	init: function(opt){
		
		var base = this
		
		this.fish = []
		this.dead = false
		
		this.opt = opt = defaults(opt, {
			fishCount: 10,
			x: 0, y: 0, z: 0,
			xRange: 1000,
			yRange: 1000,
			zRange: 1000,
			rotationY: 0,
			rotationX: 0,
			speed: Math.PI / 200,
			dieSpeed: 1/60,
			rotationRangeY: Math.PI/3,
			rotationRangeX: Math.PI/5,
			patternSrc: "http://okfocus.s3.amazonaws.com/kenso/underwater/bwrepeat2.png"
		})
	
		var fish_base = 'http://okfocus.s3.amazonaws.com/kenso/underwater/'
		var fish_svgs = [
			'bwrepeat2.png',
			'bwrepeat2.png',
			'bwrepeat2.png',
			'bwrepeat2.png',
			'bwrepeat2.png',
			'bwrepeat2.png',
			'bwrepeat2.png',
			'bwrepeat2.png',
			'bwrepeat2.png',
			'bwrepeat2.png',
			'bwrepeat2.png',
			'bwrepeat2.png',
			'bwrepeat2.png'
		]
		opt.xRange /= 2
		opt.zRange /= 2

		var texture = new Image()
		texture.onload = function(){
		
			var pattern = new Image()
			pattern.onload = function(){

				for (var i = 0; i < opt.fishCount; i++) {
					var x = randrange(-opt.xRange, opt.xRange)
					var y = randrange(0, opt.yRange)
					var z = randrange(-opt.zRange, opt.zRange)
				
					var radius = dist(0, 0, x, z)
					var theta = angle(0, 0, x, z)
					
					var fish = new MX.Cutout({
						src: fish_base + choice(fish_svgs),
						pattern: pattern,
						texture: texture,
						x: x + opt.x,
						y: y + opt.y,
						z: z + opt.z,
						className: "backface-visible",
						rotationX: 0,
						rotationY: Math.PI/2 + theta
	//					rotationY: randrange(-opt.rotationRangeY, opt.rotationRangeY) + opt.rotationY,
	//					rotationX: randrange(-opt.rotationRangeX, opt.rotationRangeX) + opt.rotationX,
					})
				
					fish.radius = radius
					fish.theta = theta
					fish.yOffset = y
					fish.speed = opt.speed
					fish.dieTween = 1.0
				
					base.fish.push(fish)
					scene.add(fish)
				}

			}
			pattern.src = opt.patternSrc
		}
		texture.src = "http://i.imgur.com/tkRFIyu.gif"

	},
	
	animate: function(t){
		var dead = this.dead
		var opt = this.opt
		
		this.fish.forEach(function(fish){
			
			if (dead) {
				fish.dieTween = clamp(fish.dieTween - opt.dieSpeed, 0.0, 1.0)
			}
			
			else {
				fish.dieTween = clamp(fish.dieTween + opt.dieSpeed, 0.0, 1.0)
			}

			fish.theta = (fish.theta + fish.speed * fish.dieTween)
			fish.x = opt.x + cos(fish.theta) * fish.radius
			fish.y = opt.y + fish.yOffset * fish.dieTween + 50
			fish.z = opt.z + sin(fish.theta) * fish.radius
			fish.rotationX = Math.PI/2 * (1.0 - fish.dieTween)
			fish.rotationY = (Math.PI/2 + fish.theta) * (fish.dieTween)

		})
	}

});
